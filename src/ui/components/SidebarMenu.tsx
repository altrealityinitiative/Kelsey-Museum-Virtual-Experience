import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const SidebarMenu = ({ isOpen, onClose, onNavigate }: Props) => {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`sidebar-menu ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Kelsey Museum</h2>
          <button className="sidebar-close-btn" onClick={onClose}>
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="sidebar-nav">
          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("characters")}
          >
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            Characters
          </button>
          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("camera")}
          >
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 7V4h3"></path>
                <path d="M20 7V4h-3"></path>
                <path d="M4 17v3h3"></path>
                <path d="M20 17v3h-3"></path>
              </svg>
            </span>
            Scan Artifact
          </button>
          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("collection")}
          >
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </span>
            Kelsey Dex
          </button>
          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("favorites")}
          >
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </span>
            My Favorites
          </button>
          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("about")}
          >
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </span>
            About Museum
          </button>
          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("tutorial")}
          >
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </span>
            Tutorial
          </button>
        </div>

        <div className="sidebar-footer">
          <p>
            Point your camera at any artifact in the museum to learn more and
            view in AR.
          </p>
        </div>
      </div>
    </>
  );
};
