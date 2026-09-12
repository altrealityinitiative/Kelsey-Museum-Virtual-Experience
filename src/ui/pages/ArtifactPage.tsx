import React from "react";
import type {ArtifactKey, Progress} from "../../app/progress";
import {artifactKeys} from "../../app/progress";
import type {Overlay} from "../../app/navigation";
import {ARTIFACTS, CHARACTERS} from "../../content/museum";
import {ArtifactViewer} from "../components/ArtifactViewer";
import {AudioDescription} from "../components/AudioDescription";
import {ArtifactCard} from "./VisitorPages";
export function ArtifactPage({id, progress, overlay, open, back, onFavorite, onOpen, onScan}: {id: ArtifactKey; progress: Progress; overlay?: Overlay; open: (overlay: Overlay) => void; back: () => void; onFavorite: (id: ArtifactKey) => void; onOpen: (id: ArtifactKey) => void; onScan: () => void}) {
  const artifact = ARTIFACTS[id];
  const related = artifactKeys.filter(key => key !== id && ARTIFACTS[key].characterId === artifact.characterId);
  return <><div className="page-intro"><span className="eyebrow">MUSEUM ARTIFACT DATABASE</span><h1>{artifact.name}</h1><p>{CHARACTERS[artifact.characterId].name}'s Collection</p></div><article className="museum-card artifact-detail"><div className="section-heading"><span className="catalog-id">{artifact.id}</span><button className="favorite-button" aria-pressed={progress.favorites.includes(id)} aria-label={`${progress.favorites.includes(id) ? "Remove from" : "Add to"} favorites`} onClick={() => onFavorite(id)}>{progress.favorites.includes(id) ? "♥ Saved" : "♡ Save artifact"}</button></div><dl className="artifact-properties"><div><dt>Material</dt><dd>{artifact.material}</dd></div><div><dt>Era</dt><dd>{artifact.era}</dd></div><div><dt>Region</dt><dd>{artifact.region}</dd></div></dl>
    <ArtifactViewer id={id} expanded={overlay === "viewer"} onExpand={() => open("viewer")} onClose={back}/>
    <AudioDescription key={id} text={artifact.desc} stop={Boolean(overlay)}/><div className="button-row"><button onClick={() => open("map")}>View Origin Map</button><button onClick={() => open("quiz")}>Take Quiz</button></div><section className="fact-card"><h2>Did You Know?</h2><p>{artifact.didYouKnow}</p></section><section className="fact-card history-card"><h2>Historical Context</h2><p>{artifact.history}</p></section></article>
    {related.length > 0 && <section><h2>More from {CHARACTERS[artifact.characterId].name}'s Collection</h2><div className="museum-grid">{related.map(key => <ArtifactCard key={key} id={key} {...{progress, onOpen, onScan, onFavorite}}/>)}</div></section>}</>;
}
