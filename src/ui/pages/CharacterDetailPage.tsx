import React from "react";
import { ARTIFACTS, CHARACTERS } from "../../content/museum";

interface Props {
  characterId: string | null;
  onBack: () => void;
  onMenuToggle: () => void;
  onViewArtifact: (id: string) => void;
}

export const CharacterDetailPage = ({
  characterId,
  onBack,
  onMenuToggle,
  onViewArtifact,
}: Props) => {
  const data = CHARACTERS[characterId] || CHARACTERS["callityche"];

  // Keep the dictionary key so we can pass it to the artifact page
  const charArtifacts = data.artifacts.map((id: string) => ({
    artifactKey: id,
    ...ARTIFACTS[id],
  }));

  return (
    <div
      className="page-container fade-in"
      style={{ backgroundColor: "#fcf7ee" }}
    >
      <div className="char-detail-header">
        <div className="char-detail-top">
          <button
            className="menu-btn"
            onClick={onMenuToggle}
            style={{ color: "white" }}
          >
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
            <img
              src={data.image}
              alt={data.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
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
            {charArtifacts.map((art) => (
              <div
                key={art.artifactKey}
                className="artifact-coll-item"
                onClick={() => onViewArtifact(art.artifactKey)}
              >
                <div className="artifact-coll-img">
                  <div className="unlock-badge">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  {art.thumbnail ? (
                    <img
                      src={art.thumbnail}
                      alt={art.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "40px" }}>{art.image}</div>
                  )}
                </div>
                <div className="artifact-coll-name">{art.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="char-detail-card"
          style={{ borderColor: "#fde68a", backgroundColor: "#fffbeb" }}
        >
          <h2 className="life-story-title">
            <span className="life-story-icon">🔓</span> Life Story Unlocked!
          </h2>
          <div className="life-story-comic">
            <img
              src={data.comic}
              alt="Life Story Comic"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
