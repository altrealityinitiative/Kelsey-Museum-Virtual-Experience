import React from "react";
import { ARTIFACTS, CHARACTERS } from "../../content/museum";

interface Props {
  modelId: string | null;
  onBack: () => void;
  onMenuToggle: () => void;
  onViewExhibit: () => void;
}

export const ArtifactDetailPage = ({
  modelId,
  onBack,
  onMenuToggle,
  onViewExhibit,
}: Props) => {
  const data = ARTIFACTS[modelId] || ARTIFACTS["Augustus"];
  const character = CHARACTERS[data.characterId];

  return (
    <div className="page-container fade-in">
      <div className="app-header">
        <div className="header-top">
          <button className="menu-btn" onClick={onMenuToggle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
        <p className="collection-name">
          {character ? `${character.name}'s Collection` : "Unknown Collection"}
        </p>

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
          <div
            className="image-container"
            onClick={onViewExhibit}
            style={{ cursor: "pointer" }}
          >
            {data.thumbnail ? (
              <img
                src={data.thumbnail}
                alt={data.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "16px",
                }}
              />
            ) : (
              <div
                style={{
                  fontSize: "120px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {data.image}
              </div>
            )}
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
          <h3 className="section-title">
            More from {character ? character.name : "this"} Collection
          </h3>
          <div className="horizontal-scroll">
            {Object.entries(ARTIFACTS)
              .filter(
                ([id, item]) =>
                  id !== modelId && item.characterId === data.characterId,
              )
              .map(([id, item]) => (
                <div key={id} className="collection-card">
                  <div
                    className="collection-card-img"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "50px",
                    }}
                  >
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
