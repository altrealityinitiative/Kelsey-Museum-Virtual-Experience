import React, { useEffect } from "react";
import { getExhibitSpaceName } from "../../ar/spaces";

interface Props {
  modelId: string | null;
  onBack: () => void;
  onMenuToggle: () => void;
}

export const ExhibitPage = ({ modelId, onBack, onMenuToggle }: Props) => {
  useEffect(() => {
    const spaceName = getExhibitSpaceName(modelId);
    if (window.load8thWallSpace) {
      window.load8thWallSpace(spaceName);
    }

    return () => {
      // Return to camera space when leaving exhibit
      if (window.load8thWallSpace) {
        window.load8thWallSpace("AR Camera Page");
      }
    };
  }, [modelId]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <button
        className="menu-btn exhibit-menu-btn"
        onClick={onMenuToggle}
        style={{
          position: "absolute",
          top: "24px",
          left: "20px",
          background: "white",
          padding: "8px",
          borderRadius: "12px",
          pointerEvents: "auto",
          border: "none",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
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

      <button
        className="exhibit-back-btn"
        onClick={onBack}
        style={{
          position: "absolute",
          top: "24px",
          right: "20px",
          background: "white",
          padding: "10px 16px",
          borderRadius: "24px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          pointerEvents: "auto",
          color: "#78350f",
        }}
      >
        ← Back
      </button>
    </div>
  );
};
