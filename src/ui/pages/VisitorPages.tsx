import React from "react";
import {ARTIFACTS, CHARACTERS} from "../../content/museum";
import {artifactKeys, characterKeys, collectionProgress} from "../../app/progress";
import type {ArtifactKey, CharacterKey, Progress} from "../../app/progress";
import type {Destination} from "../../app/navigation";

export function ArtifactCard({id, progress, onOpen, onScan, onFavorite}: {id: ArtifactKey; progress: Progress; onOpen: (id: ArtifactKey) => void; onScan: () => void; onFavorite?: (id: ArtifactKey) => void}) {
  const artifact = ARTIFACTS[id];
  const unlocked = progress.discovered.includes(id);
  return <article className={`museum-card artifact-card ${unlocked ? "" : "is-locked"}`}>
    {unlocked ? <><button className="card-link" onClick={() => onOpen(id)}><img src={artifact.thumbnail} alt=""/><span className="catalog-id">{artifact.id}</span><h3>{artifact.name}</h3><p>{artifact.region} · {artifact.era}</p><p>{artifact.material}</p></button>
      {onFavorite && <button className="favorite-button" aria-label={`${progress.favorites.includes(id) ? "Remove" : "Add"} ${artifact.name} ${progress.favorites.includes(id) ? "from" : "to"} favorites`} aria-pressed={progress.favorites.includes(id)} onClick={() => onFavorite(id)}>{progress.favorites.includes(id) ? "♥ Saved" : "♡ Save"}</button>}
    </> : <><div className="locked-symbol" aria-hidden="true">◇</div><h3>Undiscovered artifact</h3><p>Scan a supported target and tap its model to unlock this entry.</p><button onClick={onScan}>Scan Artifact</button></>}
  </article>;
}

const roles: Record<CharacterKey, string> = {callityche: "The Freed Slave", lucius: "The Wealthy Merchant", marcus: "The Roman Soldier"};
export function Characters({progress, onSelect}: {progress: Progress; onSelect: (id: CharacterKey) => void}) {
  return <><div className="page-intro"><span className="eyebrow">KELSEY MUSEUM · ANCIENT STORIES</span><h1>Choose Your Character</h1><p>Select a character to begin your journey through Ancient Rome.</p></div>
    {progress.character && <section className="continue-banner"><div><span>Continue your journey as</span><h2>{CHARACTERS[progress.character].name}</h2></div><button onClick={() => onSelect(progress.character)}>Continue →</button></section>}
    <div className="museum-grid character-grid">{characterKeys.map(id => <article className="museum-card character-card" key={id}><img src={CHARACTERS[id].image} alt={CHARACTERS[id].name}/><h2>{CHARACTERS[id].name}</h2><p>{roles[id]}</p><button onClick={() => onSelect(id)}>Select Character →</button></article>)}</div>
    <p className="tip-box">Each character has a unique collection. Discover all the artifacts in their collection to unlock their complete life story.</p></>;
}

export function CharacterDetail({id, progress, onOpen, onScan}: {id: CharacterKey; progress: Progress; onOpen: (id: ArtifactKey) => void; onScan: () => void}) {
  const character = CHARACTERS[id];
  const completion = collectionProgress(character.artifacts, progress.discovered);
  return <><div className="page-intro"><h1>{character.name}</h1><p>{character.pronunciation}</p></div>
    <section className="museum-card character-biography"><img src={character.image} alt={character.name}/><div><h2>{roles[id]}</h2><p>{character.desc}</p><button onClick={onScan}>Discover artifacts →</button></div></section>
    <section><div className="section-heading"><h2>Artifact Collection</h2><span>{completion.count} / {completion.total} unlocked</span></div><progress aria-label="Collection progress" max={completion.total} value={completion.count}/><div className="museum-grid">{character.artifacts.map(key => <ArtifactCard key={key} id={key as ArtifactKey} progress={progress} onOpen={onOpen} onScan={onScan}/>)}</div></section>
    <section className="museum-card story-card"><h2>{completion.complete ? "Life Story Unlocked!" : "Your next discovery awaits"}</h2>{completion.complete ? <img className="comic" src={character.comic} alt={`${character.name}'s illustrated life story`}/> : <p>Discover {completion.total - completion.count} more {completion.total - completion.count === 1 ? "artifact" : "artifacts"} in this collection to unlock the life story.</p>}</section></>;
}

export interface Filters {region: string; era: string; material: string;}
export const emptyFilters = (): Filters => ({region: "", era: "", material: ""});
export function Collection({progress, filters, setFilters, onOpen, onScan, onFavorite}: {progress: Progress; filters: Filters; setFilters: (filters: Filters) => void; onOpen: (id: ArtifactKey) => void; onScan: () => void; onFavorite: (id: ArtifactKey) => void}) {
  const keys = artifactKeys.filter(id => Object.entries(filters).every(([field, value]) => !value || ARTIFACTS[id][field] === value));
  return <><div className="page-intro"><h1>Kelsey Dex</h1><p>Artifacts discovered: {progress.discovered.length} / {artifactKeys.length}</p></div>
    <div className="filter-bar">{(["region", "era", "material"] as const).map(field => <label key={field}>{field[0].toUpperCase() + field.slice(1)}<select value={filters[field]} onChange={e => setFilters({...filters, [field]: e.target.value})}><option value="">All {field === "material" ? "materials" : field === "era" ? "eras" : "regions"}</option>{[...new Set(artifactKeys.map(id => ARTIFACTS[id][field]))].sort().map(value => <option key={value}>{value}</option>)}</select></label>)}<button onClick={() => setFilters(emptyFilters())}>Clear filters</button></div>
    <p role="status">{keys.length} matching {keys.length === 1 ? "artifact" : "artifacts"}</p><div className="museum-grid">{keys.map(id => <ArtifactCard key={id} {...{id, progress, onOpen, onScan, onFavorite}}/>)}</div>{!keys.length && <div className="empty-state"><h2>No matching artifacts</h2><p>Try another combination of filters.</p><button onClick={() => setFilters(emptyFilters())}>Show all artifacts</button></div>}</>;
}

export function Favorites({progress, navigate, onOpen, onFavorite}: {progress: Progress; navigate: (destination: Destination) => void; onOpen: (id: ArtifactKey) => void; onFavorite: (id: ArtifactKey) => void}) {
  return <><div className="page-intro"><h1>My Favorites</h1><p>{progress.favorites.length} {progress.favorites.length === 1 ? "artifact" : "artifacts"} saved · Most recent first</p></div>{progress.favorites.length ? <div className="museum-grid">{progress.favorites.map(id => <ArtifactCard key={id} {...{id, progress, onOpen, onFavorite}} onScan={() => navigate({page: "camera"})}/>)}</div> : <div className="empty-state"><span className="empty-heart" aria-hidden="true">♡</span><h2>Your personal collection starts here</h2><p>Discover an artifact, then tap its heart to save it for later.</p><button onClick={() => navigate({page: "collection"})}>Explore Kelsey Dex →</button></div>}</>;
}

export function About() {
  return <><div className="page-intro"><span className="eyebrow">ANN ARBOR · UNIVERSITY OF MICHIGAN</span><h1>About Kelsey Museum</h1></div><section className="museum-card"><h2>Welcome to the Kelsey Museum</h2><p>Explore the ancient Mediterranean world at the University of Michigan's Kelsey Museum of Archaeology. The museum brings archaeology to life through its collections, research, teaching, and public programs.</p><p>This guide connects artifacts with stories and interactive models as you explore.</p></section><div className="museum-grid about-grid"><section className="museum-card"><h2>Hours of Operation</h2><dl><dt>Tuesday–Friday</dt><dd>10:00 AM–4:00 PM</dd><dt>Saturday–Sunday</dt><dd>11:00 AM–4:00 PM</dd><dt>Mondays & university holidays</dt><dd>Closed</dd></dl><p>Open until 7:30 PM on the third Thursday of each month. Check the official website for changes.</p></section><section className="museum-card"><h2>Location</h2><p>434 South State Street<br/>Ann Arbor, MI 48109-1390</p><p>University of Michigan Central Campus</p><a href="https://lsa.umich.edu/kelsey/visit.html" target="_blank" rel="noreferrer">Plan your visit ↗</a></section><section className="museum-card"><h2>Contact Information</h2><p><a href="tel:+17347649304">(734) 764-9304</a></p><p><a href="mailto:kelseymuse@umich.edu">kelseymuse@umich.edu</a></p><a href="https://lsa.umich.edu/kelsey/" target="_blank" rel="noreferrer">Museum website ↗</a></section><section className="museum-card"><h2>Admission</h2><p>Free and open to all.</p><p>No tickets or admission fee are required.</p></section></div><p className="source-note">Visitor information checked September 12, 2026 against the official museum website.</p></>;
}

const steps = [
  ["Choose your character", "Choose a character to explore their collection. You can switch characters without losing discoveries, and Continue returns to your saved character."],
  ["Scan a supported target", "Choose Scan Artifact and allow camera access. Point at a supported museum image target in good lighting: Augustus, Coin, Inscription, or Jackal. Tap the recognized 3D model to discover it. The camera does not recognize every object in the museum."],
  ["Build your collection", "Find discovered artifacts in Kelsey Dex. Filter by region, era, or material. Discover every artifact in a character's collection to unlock their life-story comic."],
  ["Save your favorites", "Tap a heart on a discovered artifact to save it. My Favorites shows your most recently saved artifacts first. Your discoveries and favorites stay in this browser; clearing browser data removes them."],
  ["Explore 3D models", "Drag inside the viewer to rotate. Pinch or use the zoom buttons to see details. Reset returns to the starting view; Expand gives you more room. These models work without camera access."],
  ["Learn more", "Open a regional map or take a five-question quiz. Quizzes explain each answer and can be retried. Closing a quiz starts a fresh attempt next time."],
  ["Make it comfortable", "Use the text-size and contrast controls on any screen. On artifact pages, Listen reads the description aloud and highlights the text. Headphones are helpful; voice availability depends on your browser."],
];
export function Tutorial({navigate}: {navigate: (destination: Destination) => void}) {
  return <><div className="page-intro"><h1>How to Use Kelsey Dex</h1><p>A few simple steps to discover the stories behind the objects.</p></div><div className="tutorial-steps">{steps.map(([title, text], index) => <section className="museum-card tutorial-step" key={title}><span className="step-number">{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div></section>)}</div><div className="button-row"><button onClick={() => navigate({page: "camera"})}>Scan an artifact →</button><button onClick={() => navigate({page: "collection"})}>Browse Kelsey Dex</button></div></>;
}
