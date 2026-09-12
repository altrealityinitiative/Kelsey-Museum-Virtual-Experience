import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useNavigation} from "./navigation";
import type {Destination} from "./navigation";
import {discover, loadProgress, scannedArtifact, STORAGE_KEY, toggleFavorite} from "./progress";
import type {ArtifactKey, CharacterKey} from "./progress";
import {ARTIFACTS} from "../content/museum";
import {EXPERIENCES} from "../content/experiences";
import {About, Characters, CharacterDetail, Collection, emptyFilters, Favorites, Tutorial} from "../ui/pages/VisitorPages";
import {ArtifactPage} from "../ui/pages/ArtifactPage";
import {ScanPage} from "../ui/pages/ScanPage";
import {Dialog} from "../ui/components/Dialog";
import {Quiz} from "../ui/components/Quiz";

const menu: {label: string; destination: Destination}[] = [
  {label: "Characters", destination: {page: "characters"}}, {label: "Scan Artifact", destination: {page: "camera"}},
  {label: "Kelsey Dex", destination: {page: "collection"}}, {label: "My Favorites", destination: {page: "favorites"}},
  {label: "About Museum", destination: {page: "about"}}, {label: "Tutorial", destination: {page: "tutorial"}},
];
export const App = () => {
  const [progress, setProgress] = useState(loadProgress);
  const [storageWarning, setStorageWarning] = useState(false);
  const [filters, setFilters] = useState(emptyFilters);
  const {visit, navigate, back, open} = useNavigation();
  const {destination, overlay} = visit;
  const main = useRef<HTMLElement>(null);
  const scroll = useRef<Record<string, number>>({});
  const routeKey = JSON.stringify(destination);
  useEffect(() => {
    try {localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); setStorageWarning(false);} catch {setStorageWarning(true);}
  }, [progress]);
  useEffect(() => {
    const handleClick = (event: CustomEvent<{targetScene: string}>) => {
      if (destination.page !== "camera" || overlay) return;
      const id = scannedArtifact(event.detail?.targetScene);
      if (!id) return;
      setProgress(previous => discover(previous, id));
      navigate({page: "artifact", id});
    };
    window.addEventListener("AR_MODEL_CLICKED", handleClick);
    return () => window.removeEventListener("AR_MODEL_CLICKED", handleClick);
  }, [destination, overlay]);
  useLayoutEffect(() => {
    const node = main.current;
    node.scrollTop = scroll.current[routeKey] || 0;
    node.focus({preventScroll: true});
    return () => {scroll.current[routeKey] = node.scrollTop;};
  }, [routeKey]);
  useEffect(() => {
    if (overlay !== "viewer") return;
    const viewer = main.current.querySelector(".artifact-viewer");
    const inert: HTMLElement[] = [];
    let node: Element = viewer;
    while (node && node !== main.current) {
      Array.from(node.parentElement.children).forEach(sibling => {if (sibling !== node && sibling instanceof HTMLElement) {sibling.inert = true; inert.push(sibling);}});
      node = node.parentElement;
    }
    return () => inert.forEach(element => {element.inert = false;});
  }, [overlay]);
  const select = (id: CharacterKey) => {setProgress(previous => ({...previous, character: id})); navigate({page: "character", id});};
  const favorite = (id: ArtifactKey) => setProgress(previous => toggleFavorite(previous, id));
  const scan = () => navigate({page: "camera"});
  const artifact = (id: ArtifactKey) => progress.discovered.includes(id) ? navigate({page: "artifact", id}) : open("locked");
  const detailId = destination.page === "artifact" ? destination.id : null;
  return <div className={`visitor-app ${progress.largeText ? "large-text" : ""} ${progress.highContrast ? "high-contrast" : ""} ${destination.page === "camera" ? "scanning" : ""}`}>
    <header className="visitor-header"><button aria-label="Open navigation menu" onClick={() => open("menu")}>☰</button><span className="brand">Kelsey Museum</span><div className="accessibility-controls"><button aria-label="Enlarge text" aria-pressed={progress.largeText} onClick={() => setProgress(previous => ({...previous, largeText: !previous.largeText}))}>Aa</button><button aria-label="Toggle high contrast" aria-pressed={progress.highContrast} onClick={() => setProgress(previous => ({...previous, highContrast: !previous.highContrast}))}>◐</button></div>{visit.depth > 0 && <button aria-label="Back" onClick={back}>←</button>}</header>
    <main ref={main} tabIndex={-1} className="visitor-main" aria-label="Museum guide"><div className="visitor-content">
      {storageWarning && <p role="status" className="tip-box">This browser cannot save your progress. It will remain available until this page closes.</p>}
      {destination.page === "characters" && <Characters progress={progress} onSelect={select}/>}
      {destination.page === "character" && <CharacterDetail id={destination.id} progress={progress} onOpen={artifact} onScan={scan}/>}
      {destination.page === "collection" && <Collection {...{progress, filters, setFilters}} onOpen={artifact} onScan={scan} onFavorite={favorite}/>}
      {destination.page === "favorites" && <Favorites {...{progress, navigate}} onOpen={artifact} onFavorite={favorite}/>}
      {destination.page === "about" && <About/>}
      {destination.page === "tutorial" && <Tutorial navigate={navigate}/>}
      {destination.page === "camera" && <ScanPage onHelp={() => navigate({page: "tutorial"})} onBack={() => navigate({page: "characters"})}/>}
      {detailId && (progress.discovered.includes(detailId) ? <ArtifactPage key={detailId} id={detailId} {...{progress, overlay, open, back}} onFavorite={favorite} onOpen={artifact} onScan={scan}/> : <div className="empty-state"><h1>Artifact not yet discovered</h1><p>Scan its supported target and tap the model to unlock its details.</p><button onClick={scan}>Scan Artifact</button></div>)}
    </div></main>
    {overlay === "menu" && <Dialog title="Kelsey Museum" className="navigation-dialog" onClose={back}><nav aria-label="Main navigation">{menu.map(item => <button key={item.label} aria-current={destination.page === item.destination.page ? "page" : undefined} onClick={() => navigate(item.destination)}>{item.label}<span aria-hidden="true">→</span></button>)}</nav><p>Scan a supported target and tap its model to learn more.</p></Dialog>}
    {overlay === "locked" && <Dialog title="Discover this artifact" onClose={back}><p>Scan its supported target, then tap the model to unlock its details.</p><button onClick={scan}>Scan Artifact</button></Dialog>}
    {overlay === "quiz" && detailId && progress.discovered.includes(detailId) && <Dialog title={`Quiz: ${ARTIFACTS[detailId].name}`} onClose={back}><Quiz questions={EXPERIENCES[detailId].questions}/></Dialog>}
    {overlay === "map" && detailId && progress.discovered.includes(detailId) && <Dialog title={`Region of Origin: ${ARTIFACTS[detailId].region}`} onClose={back}><img className="region-map" src={EXPERIENCES[detailId].map} alt={`Schematic regional guide to ${ARTIFACTS[detailId].region}, around ${ARTIFACTS[detailId].region === "Ancient Rome" ? "Italy and the Mediterranean" : "Egypt and the Nile"}`}/><p>This schematic highlights the catalog's broad region. It is not to scale and does not identify an excavation site or historical boundaries.</p></Dialog>}
  </div>;
};
