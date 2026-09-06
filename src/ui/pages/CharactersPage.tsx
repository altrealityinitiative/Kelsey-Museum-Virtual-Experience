import React from "react";

interface Props {
  onMenuToggle: () => void;
  onContinue: () => void;
  onSelectCharacter: (id: string) => void;
}

export const CharactersPage = ({
  onMenuToggle,
  onContinue,
  onSelectCharacter,
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
              stroke="#78350f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="characters-content">
        <h1 className="characters-title">Choose Your Character</h1>
        <p className="characters-subtitle">
          Select a character to begin your journey through Ancient Rome
        </p>

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
            <button
              className="char-select-btn"
              onClick={() => onSelectCharacter("callityche")}
            >
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
            <button
              className="char-select-btn"
              onClick={() => onSelectCharacter("lucius")}
            >
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
            <button
              className="char-select-btn"
              onClick={() => onSelectCharacter("marcus")}
            >
              Select Character →
            </button>
          </div>
        </div>

        <div className="characters-footer-box">
          Each character has a unique story and three artifacts to discover.
          Scan all three artifacts to unlock their complete life story!
        </div>
      </div>
    </div>
  );
};
