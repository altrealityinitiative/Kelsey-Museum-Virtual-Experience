import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import callitycheImg from './assets/ui_images/Callityche/Callityche.jpg';
import callitycheComic from './assets/ui_images/Callityche/Callityche_comic_strip.jpg';
import luciusImg from './assets/ui_images/Lucius_Calpurnius_Rufus/Lucius_Calpurnius_Rufus.jpg';
import luciusComic from './assets/ui_images/Lucius_Calpurnius_Rufus/Rufus_comic_strip.jpg';
import marcusImg from './assets/ui_images/Marcus_Valerius_Laos_(Africanus)/Marcus_Valerius_Laos_(Africanus).jpg';
import marcusComic from './assets/ui_images/Marcus_Valerius_Laos_(Africanus)/Laos_comic_strip.jpg';

import augustusThumb from './assets/ui_images/artifacts/Augustus_target_thumbnail.png';
import coinThumb from './assets/ui_images/artifacts/Coin_target_thumbnail.png';
import inscriptionThumb from './assets/ui_images/artifacts/Inscription_target_thumbnail.png';
import jackalThumb from './assets/ui_images/artifacts/Jackal_target_thumbnail.png';

// Relational Data Structure
const CHARACTERS: any = {
  callityche: {
    id: "callityche",
    name: "Callityche",
    pronunciation: "(KA-LIH-TEE-KAY)",
    desc: "A freed slave who lived in Rome during the 1st century CE. Once enslaved in a wealthy household, Callityche gained her freedom and became a successful textile merchant. She navigated Roman society with grace and intelligence, building a life of independence.",
    artifacts: ["Augustus", "Coin"],
    image: callitycheImg,
    comic: callitycheComic
  },
  lucius: {
    id: "lucius",
    name: "Lucius Calpurnius Rufus",
    pronunciation: "(LOO-SHUS)",
    desc: "A wealthy merchant who traded goods across the Mediterranean. He used his vast network to acquire rare artifacts and exotic goods from the far reaches of the empire.",
    artifacts: ["Inscription"],
    image: luciusImg,
    comic: luciusComic
  },
  marcus: {
    id: "marcus",
    name: "Marcus Valerius Laos",
    pronunciation: "(MAR-KUS)",
    desc: "A distinguished Roman soldier who served in the legions. He collected mementos from his campaigns, holding onto objects that reminded him of the diverse cultures he encountered.",
    artifacts: ["Jackal"],
    image: marcusImg,
    comic: marcusComic
  },
};

const ARTIFACTS: any = {
  Augustus: {
    id: "ARF-203",
    characterId: "callityche",
    name: "Head of Augustus",
    material: "Marble",
    era: "Roman Empire",
    region: "Ancient Rome",
    image: "🏛️",
    thumbnail: augustusThumb,
    desc: "A practical and decorative marble portrait head of Augustus, the first Roman emperor. These were mass-produced and distributed.",
    didYouKnow: "Augustan portraiture always depicted him as a youthful, idealized figure regardless of his actual age.",
    history: "The Augustan Age (27 BCE - 14 CE) marked the beginning of the Pax Romana, a long period of peace and stability.",
  },
  Coin: {
    id: "ARF-174",
    characterId: "callityche",
    name: "Denarius Silver Coin",
    material: "Silver",
    era: "Republican Period",
    region: "Ancient Rome",
    image: "🪙",
    thumbnail: coinThumb,
    desc: "An ancient silver coin featuring intricate profiles, used for trade across the vast Roman territory.",
    didYouKnow: "The denarius was the standard silver coin of the Roman economy for over 400 years.",
    history: "Minting coins was a primary way for Roman leaders to spread their image and propaganda across the empire.",
  },
  Inscription: {
    id: "ARF-251",
    characterId: "lucius",
    name: "Latin Inscription",
    material: "Stone",
    era: "Roman Empire",
    region: "Ancient Rome",
    image: "📜",
    thumbnail: inscriptionThumb,
    desc: "A carved stone tablet containing official Roman records, giving us vital clues about their laws and daily administration.",
    didYouKnow: "Roman inscriptions often used abbreviations for common words, similar to modern texting acronyms.",
    history: "Epigraphy provides some of our most direct and unedited sources of information about Roman daily life.",
  },
  Jackal: {
    id: "ARF-156",
    characterId: "marcus",
    name: "Anubis Jackal",
    material: "Wood",
    era: "New Kingdom",
    region: "Ancient Egypt",
    image: "🐕",
    thumbnail: jackalThumb,
    desc: "A wooden funerary figure of a jackal representing Anubis, the Egyptian god of mummification and the afterlife.",
    didYouKnow: "Anubis was depicted as black because it represented the color of the fertile soil of the Nile and rebirth.",
    history: "During the New Kingdom, funerary practices became more elaborate and widely accessible.",
  },
};

const SidebarMenu = ({ isOpen, onClose, onNavigate }: any) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <div className={`sidebar-menu ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Kelsey Museum</h2>
          <button className="sidebar-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="sidebar-nav">
          <button className="sidebar-nav-item" onClick={() => onNavigate("characters")}>
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            Characters
          </button>
          <button className="sidebar-nav-item" onClick={() => onNavigate("camera")}>
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7V4h3"></path>
                <path d="M20 7V4h-3"></path>
                <path d="M4 17v3h3"></path>
                <path d="M20 17v3h-3"></path>
              </svg>
            </span>
            Scan Artifact
          </button>
          <button className="sidebar-nav-item" onClick={() => onNavigate("collection")}>
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </span>
            Kelsey Dex
          </button>
          <button className="sidebar-nav-item" onClick={() => onNavigate("favorites")}>
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </span>
            My Favorites
          </button>
          <button className="sidebar-nav-item" onClick={() => onNavigate("about")}>
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </span>
            About Museum
          </button>
          <button className="sidebar-nav-item" onClick={() => onNavigate("tutorial")}>
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </span>
            Tutorial
          </button>
        </div>

        <div className="sidebar-footer">
          <p>Point your camera at any artifact in the museum to learn more and view in AR.</p>
        </div>
      </div>
    </>
  );
};

const ArtifactDetailPage = ({ modelId, onBack, onMenuToggle }: any) => {
  const data = (ARTIFACTS as any)[modelId] || ARTIFACTS["Augustus"];
  const character = CHARACTERS[data.characterId];

  return (
    <div className="page-container fade-in">
      <div className="app-header">
        <div className="header-top">
          <button className="menu-btn" onClick={onMenuToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="header-titles">
            <h1 className="main-title">Museum Artifact Database</h1>
            <p className="sub-title">Archaeological Collection Entry</p>
          </div>
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
        </div>
        <div className="header-actions">
          <button className="action-icon-btn">T</button>
          <button className="action-icon-btn">🎨</button>
          <button className="action-icon-btn">🔊</button>
        </div>
      </div>

      <div className="content-card">
        <div className="meta-row">
          <div className="meta-left">
            <span className="arf-tag">{data.id}</span>
            <span className="spqr-tag">SPQR</span>
          </div>
          <button className="heart-btn">♡</button>
        </div>

        <h2 className="artifact-title">{data.name}</h2>
        <p className="collection-name">{character ? `${character.name}'s Collection` : "Unknown Collection"}</p>

        <div className="properties-grid">
          <div className="prop-item">
            <span className="prop-label">Material</span>
            <span className="prop-value">{data.material}</span>
          </div>
          <div className="prop-item">
            <span className="prop-label">Era</span>
            <span className="prop-value">{data.era}</span>
          </div>
          <div className="prop-item">
            <span className="prop-label">Region</span>
            <span className="prop-value">{data.region}</span>
          </div>
        </div>

        <div className="viewer-section">
          <div className="image-container">
            {data.thumbnail ? 
              <img src={data.thumbnail} alt={data.name} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "16px" }} /> :
              <div style={{ fontSize: "120px", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>{data.image}</div>
            }
          </div>
          <div className="viewer-controls">
            <button className="control-btn">🔍-</button>
            <button className="control-btn">↻</button>
            <button className="control-btn">⤢</button>
            <button className="control-btn">🔍+</button>
          </div>
        </div>

        <h3 className="section-title">Artifact Description</h3>
        <div className="description-box">{data.desc}</div>

        <div className="action-buttons-row">
          <button className="action-btn">🗺️ View Origin Map</button>
          <button className="action-btn">📖 Take Quiz</button>
        </div>

        <div className="info-card yellow">
          <div className="info-card-header">📚 Did You Know?</div>
          <div className="info-card-text">{data.didYouKnow}</div>
        </div>

        <div className="info-card green">
          <div className="info-card-header">🏛️ Historical Context</div>
          <div className="info-card-text">{data.history}</div>
        </div>

        <div className="more-collection">
          <h3 className="section-title">More from {character ? character.name : "this"} Collection</h3>
          <div className="horizontal-scroll">
            {Object.entries(ARTIFACTS)
              .filter(([id, item]: any) => id !== modelId && item.characterId === data.characterId)
              .map(([id, item]: any) => (
                <div key={id} className="collection-card">
                  <div className="collection-card-img" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px" }}>
                    {item.image}
                  </div>
                  <div className="collection-card-tag">{item.id}</div>
                  <h4 className="collection-card-title">{item.name}</h4>
                  <p className="collection-card-subtitle">
                    {item.region} • {item.era}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PokedexPage = ({ onBack, unlockedIds, onViewArtifact, onMenuToggle }: any) => {
  return (
    <div className="page-container fade-in">
      <div className="app-header">
        <div className="header-top">
          <button className="menu-btn" onClick={onMenuToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="header-titles">
            <h1 className="main-title">My Collection</h1>
            <p className="sub-title">
              Artifacts Discovered: {unlockedIds.length} / {Object.keys(ARTIFACTS).length}
            </p>
          </div>
          <button className="back-btn" onClick={onBack}>
            ✕
          </button>
        </div>
      </div>

      <div className="pokedex-grid">
        {Object.entries(ARTIFACTS).map(([id, data]: any) => {
          const isUnlocked = unlockedIds.includes(id);
          return (
            <div key={id} className={`pokedex-item ${isUnlocked ? "unlocked" : "locked"}`} onClick={() => isUnlocked && onViewArtifact(id)}>
              {isUnlocked && data.thumbnail ? (
                <img src={data.thumbnail} alt={data.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px' }} />
              ) : (
                <div style={{ fontSize: "48px" }}>{isUnlocked ? data.image : "❓"}</div>
              )}
              <span style={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}>{isUnlocked ? data.name : "Undiscovered"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CharacterDetailPage = ({ characterId, onBack, onMenuToggle, onViewArtifact }: any) => {
  const data = CHARACTERS[characterId] || CHARACTERS["callityche"];

  // Keep the dictionary key so we can pass it to the artifact page
  const charArtifacts = data.artifacts.map((id: string) => ({ artifactKey: id, ...ARTIFACTS[id] }));

  return (
    <div className="page-container fade-in" style={{ backgroundColor: "#fcf7ee" }}>
      <div className="char-detail-header">
        <div className="char-detail-top">
          <button className="menu-btn" onClick={onMenuToggle} style={{ color: "white" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <button className="char-detail-back" onClick={onBack}>
            ← Back to Characters
          </button>
        </div>
        <h1 className="char-detail-title">{data.name}</h1>
        <p className="char-detail-sub">{data.pronunciation}</p>
      </div>

      <div className="char-detail-content">
        <div className="char-detail-card">
          <div className="char-illustration">
            <img src={data.image} alt={data.name} style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px'}} />
          </div>
          <p className="char-desc-text">{data.desc}</p>
        </div>

        <div className="char-detail-card">
          <div className="artifact-coll-header">
            <h2 className="artifact-coll-title">Artifact Collection</h2>
            <span className="artifact-coll-progress">
              {charArtifacts.length} / {charArtifacts.length} Unlocked
            </span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>
          <div className="artifact-coll-grid">
            {charArtifacts.map((art: any) => (
              <div key={art.artifactKey} className="artifact-coll-item" onClick={() => onViewArtifact(art.artifactKey)}>
                <div className="artifact-coll-img">
                  <div className="unlock-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  {art.thumbnail ? 
                    <img src={art.thumbnail} alt={art.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> :
                    <div style={{ fontSize: '40px' }}>{art.image}</div>
                  }
                </div>
                <div className="artifact-coll-name">{art.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="char-detail-card" style={{ borderColor: "#fde68a", backgroundColor: "#fffbeb" }}>
          <h2 className="life-story-title">
            <span className="life-story-icon">🔓</span> Life Story Unlocked!
          </h2>
          <div className="life-story-comic">
            <img src={data.comic} alt="Life Story Comic" style={{width: '100%', display: 'block'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CharactersPage = ({ onMenuToggle, onContinue, onSelectCharacter }: any) => {
  return (
    <div className="page-container fade-in">
      <div className="app-header">
        <div className="header-top">
          <button className="menu-btn" onClick={onMenuToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="characters-content">
        <h1 className="characters-title">Choose Your Character</h1>
        <p className="characters-subtitle">Select a character to begin your journey through Ancient Rome</p>

        <div className="character-banner">
          <div className="banner-text">
            <span className="banner-sub">Continue your journey as</span>
            <span className="banner-name">Callityche</span>
          </div>
          <button className="banner-btn" onClick={onContinue}>
            Continue →
          </button>
        </div>

        <div className="character-cards">
          {/* Card 1 */}
          <div className="char-card">
            <div className="char-avatar-container">
              <div className="char-avatar">
                <svg viewBox="0 0 24 24" fill="#fcf7ee" width="56" height="56">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <h2 className="char-name">Callityche</h2>
            <p className="char-role">The Freed Slave</p>
            <button className="char-select-btn" onClick={() => onSelectCharacter("callityche")}>
              Select Character →
            </button>
          </div>

          {/* Card 2 */}
          <div className="char-card">
            <div className="char-avatar-container">
              <div className="char-avatar">
                <svg viewBox="0 0 24 24" fill="#fcf7ee" width="56" height="56">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <h2 className="char-name" style={{ fontSize: "22px" }}>
              Lucius Calpurnius
              <br />
              Rufus
            </h2>
            <p className="char-role">The Wealthy Merchant</p>
            <button className="char-select-btn" onClick={() => onSelectCharacter("lucius")}>
              Select Character →
            </button>
          </div>

          {/* Card 3 */}
          <div className="char-card">
            <div className="char-avatar-container">
              <div className="char-avatar">
                <svg viewBox="0 0 24 24" fill="#fcf7ee" width="56" height="56">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <h2 className="char-name" style={{ fontSize: "22px" }}>
              Marcus Valerius
              <br />
              Laos
            </h2>
            <p className="char-role">The Roman Soldier</p>
            <button className="char-select-btn" onClick={() => onSelectCharacter("marcus")}>
              Select Character →
            </button>
          </div>
        </div>

        <div className="characters-footer-box">
          Each character has a unique story and three artifacts to discover. Scan all three artifacts to unlock their complete life story!
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // 'camera', 'detail', 'collection', 'characters', 'character_detail'
  const [currentView, setCurrentView] = useState("camera");
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<string | null>(null);
  const [unlockedArtifacts, setUnlockedArtifacts] = useState<string[]>(["Augustus"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleModelClick = (e: any) => {
      let sceneName = e.detail.targetScene;
      if (!sceneName) return;

      if (sceneName.includes("Augustus")) sceneName = "Augustus";
      if (sceneName.includes("Coin")) sceneName = "Coin";
      if (sceneName.includes("Inscription")) sceneName = "Inscription";
      if (sceneName.includes("Jackal")) sceneName = "Jackal";

      if (["Augustus", "Coin", "Inscription", "Jackal"].includes(sceneName)) {
        setUnlockedArtifacts((prev) => (prev.includes(sceneName) ? prev : [...prev, sceneName]));
      }

      setActiveModel(sceneName);
      setCurrentView("detail");
    };

    window.addEventListener("AR_MODEL_CLICKED", handleModelClick);
    return () => window.removeEventListener("AR_MODEL_CLICKED", handleModelClick);
  }, []);

  return (
    <>
      {currentView === "camera" && (
        <>
          <button className="menu-btn camera-menu-btn" onClick={() => setIsMenuOpen(true)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </>
      )}

      {currentView === "detail" && <ArtifactDetailPage modelId={activeModel} onBack={() => setCurrentView("camera")} onMenuToggle={() => setIsMenuOpen(true)} />}

      {currentView === "collection" && (
        <PokedexPage
          onBack={() => setCurrentView("camera")}
          unlockedIds={unlockedArtifacts}
          onMenuToggle={() => setIsMenuOpen(true)}
          onViewArtifact={(id: string) => {
            setActiveModel(id);
            setCurrentView("detail");
          }}
        />
      )}

      {currentView === "characters" && (
        <CharactersPage
          onMenuToggle={() => setIsMenuOpen(true)}
          onContinue={() => {
            setActiveCharacter('callityche');
            setCurrentView('character_detail');
          }}
          onSelectCharacter={(id: string) => {
            setActiveCharacter(id);
            setCurrentView("character_detail");
          }}
        />
      )}

      {currentView === "character_detail" && (
        <CharacterDetailPage
          characterId={activeCharacter}
          onMenuToggle={() => setIsMenuOpen(true)}
          onBack={() => setCurrentView("characters")}
          onViewArtifact={(id: string) => {
            setActiveModel(id);
            setCurrentView("detail");
          }}
        />
      )}

      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(page: string) => {
          setIsMenuOpen(false);
          if (["camera", "collection", "characters"].includes(page)) {
            setCurrentView(page);
          }
        }}
      />
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("react-root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  }
});
