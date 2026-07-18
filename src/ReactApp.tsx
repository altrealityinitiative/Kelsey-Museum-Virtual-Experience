import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Artifact Data Mock
const ARTIFACTS = {
  'Augustus': { name: 'Head of Augustus', type: 'Sculpture', period: 'Roman Empire', image: '🏛️', desc: 'A marble portrait head of Augustus, the first Roman emperor. It demonstrates the idealized classicizing style of Augustan portraiture.' },
  'Coin': { name: 'Philip Coin', type: 'Currency', period: 'Roman Empire', image: '🪙', desc: 'An ancient silver coin featuring the profile of Emperor Philip the Arab, used for trade across the vast Roman territory.' },
  'Inscription': { name: 'Latin Inscription', type: 'Epigraphy', period: 'Roman Empire', image: '📜', desc: 'A carved stone tablet containing official Roman records, giving us vital clues about their laws and daily administration.' },
  'Jackal': { name: 'Anubis Jackal', type: 'Statue', period: 'Ancient Egypt', image: '🐕', desc: 'A wooden funerary figure of a jackal representing Anubis, the Egyptian god of mummification and the afterlife.' }
};

const ArtifactDetailPage = ({ modelId, onBack, onCollection }) => {
  const data = ARTIFACTS[modelId] || { name: modelId, type: 'Artifact', period: 'Unknown', image: '🏺', desc: 'An ancient artifact recovered from the excavation site.' };
  
  return (
    <div className="page-container fade-in">
      <nav className="navbar">
        <button className="icon-btn" onClick={onBack}>← Camera</button>
        <span className="nav-title">Artifact Details</span>
        <button className="icon-btn" onClick={onCollection}>Collection</button>
      </nav>
      
      <div className="hero-section">
        <div className="hero-icon">{data.image}</div>
      </div>
      
      <div className="content-section">
        <div className="tags">
          <span className="tag">{data.type}</span>
          <span className="tag">{data.period}</span>
        </div>
        <h1 className="title">{data.name}</h1>
        <p className="description">{data.desc}</p>
        
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Condition</span>
            <span className="stat-value">Excellent</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Rarity</span>
            <span className="stat-value">Epic</span>
          </div>
        </div>
        
        <button className="action-btn" onClick={onBack}>Return to Scanning</button>
      </div>
    </div>
  );
};

const PokedexPage = ({ onBack }) => {
  return (
    <div className="page-container fade-in">
      <nav className="navbar">
        <button className="icon-btn" onClick={onBack}>← Camera</button>
        <span className="nav-title">My Collection</span>
        <div style={{width: '70px'}}></div>
      </nav>
      
      <div className="collection-content">
        <p className="collection-subtitle">Artifacts Discovered: 1 / {Object.keys(ARTIFACTS).length}</p>
        <div className="grid">
          {Object.entries(ARTIFACTS).map(([id, data]) => (
            <div key={id} className={`grid-item ${id === 'Augustus' ? 'unlocked' : 'locked'}`}>
              <div className="item-icon">{id === 'Augustus' ? data.image : '❓'}</div>
              <span className="item-name">{id === 'Augustus' ? data.name : 'Unknown'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // 'camera', 'detail', 'collection'
  const [currentView, setCurrentView] = useState('camera');
  const [activeModel, setActiveModel] = useState(null);

  useEffect(() => {
    const handleModelClick = (e: any) => {
      let sceneName = e.detail.targetScene;
      if (!sceneName) return;
      
      // Clean up the scene name to match our keys
      if(sceneName.includes('Augustus')) sceneName = 'Augustus';
      if(sceneName.includes('Coin')) sceneName = 'Coin';
      if(sceneName.includes('Inscription')) sceneName = 'Inscription';
      if(sceneName.includes('Jackal')) sceneName = 'Jackal';

      setActiveModel(sceneName);
      setCurrentView('detail');
    };

    window.addEventListener('AR_MODEL_CLICKED', handleModelClick);
    return () => window.removeEventListener('AR_MODEL_CLICKED', handleModelClick);
  }, []);

  return (
    <>
      {currentView === 'camera' && (
        <button className="floating-collection-btn" onClick={() => setCurrentView('collection')}>
          🎒 Collection
        </button>
      )}
      
      {currentView === 'detail' && (
        <ArtifactDetailPage 
          modelId={activeModel} 
          onBack={() => setCurrentView('camera')} 
          onCollection={() => setCurrentView('collection')}
        />
      )}
      
      {currentView === 'collection' && (
        <PokedexPage onBack={() => setCurrentView('camera')} />
      )}
    </>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('react-root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  }
});
