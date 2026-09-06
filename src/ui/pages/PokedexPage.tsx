import React from "react";
import { ARTIFACTS } from "../../content/museum";

interface Props {
  onBack: () => void;
  unlockedIds: string[];
  onViewArtifact: (id: string) => void;
  onMenuToggle: () => void;
}

export const PokedexPage = ({
  onBack,
  unlockedIds,
  onViewArtifact,
  onMenuToggle,
}: Props) => {
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
            <h1 className="main-title">My Collection</h1>
            <p className="sub-title">
              Artifacts Discovered: {unlockedIds.length} /{" "}
              {Object.keys(ARTIFACTS).length}
            </p>
          </div>
          <button className="back-btn" onClick={onBack}>
            ✕
          </button>
        </div>
      </div>

      <div className="pokedex-grid">
        {Object.entries(ARTIFACTS).map(([id, data]) => {
          const isUnlocked = unlockedIds.includes(id);
          return (
            <div
              key={id}
              className={`pokedex-item ${isUnlocked ? "unlocked" : "locked"}`}
              onClick={() => isUnlocked && onViewArtifact(id)}
            >
              {isUnlocked && data.thumbnail ? (
                <img
                  src={data.thumbnail}
                  alt={data.name}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div style={{ fontSize: "48px" }}>
                  {isUnlocked ? data.image : "❓"}
                </div>
              )}
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {isUnlocked ? data.name : "Undiscovered"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
