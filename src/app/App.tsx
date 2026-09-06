import React, { useState, useEffect } from "react";
import { SidebarMenu } from "../ui/components/SidebarMenu";
import { ArtifactDetailPage } from "../ui/pages/ArtifactDetailPage";
import { PokedexPage } from "../ui/pages/PokedexPage";
import { CharacterDetailPage } from "../ui/pages/CharacterDetailPage";
import { CharactersPage } from "../ui/pages/CharactersPage";
import { ExhibitPage } from "../ui/pages/ExhibitPage";

export const App = () => {
  // 'camera', 'detail', 'collection', 'characters', 'character_detail'
  const [currentView, setCurrentView] = useState("camera");
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<string | null>(null);
  const [unlockedArtifacts, setUnlockedArtifacts] = useState<string[]>([
    "Augustus",
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleModelClick = (e: CustomEvent<{ targetScene: string }>) => {
      let sceneName = e.detail.targetScene;
      if (!sceneName) return;

      if (sceneName.includes("Augustus")) sceneName = "Augustus";
      if (sceneName.includes("Coin")) sceneName = "Coin";
      if (sceneName.includes("Inscription")) sceneName = "Inscription";
      if (sceneName.includes("Jackal")) sceneName = "Jackal";

      if (["Augustus", "Coin", "Inscription", "Jackal"].includes(sceneName)) {
        setUnlockedArtifacts((prev) =>
          prev.includes(sceneName) ? prev : [...prev, sceneName],
        );
      }

      setActiveModel(sceneName);
      setCurrentView("detail");
    };

    window.addEventListener("AR_MODEL_CLICKED", handleModelClick);
    return () =>
      window.removeEventListener("AR_MODEL_CLICKED", handleModelClick);
  }, []);

  return (
    <>
      {currentView === "camera" && (
        <>
          <button
            className="menu-btn camera-menu-btn"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg
              width="28"
              height="28"
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
        </>
      )}

      {currentView === "detail" && (
        <ArtifactDetailPage
          modelId={activeModel}
          onBack={() => setCurrentView("camera")}
          onMenuToggle={() => setIsMenuOpen(true)}
          onViewExhibit={() => setCurrentView("exhibit")}
        />
      )}

      {currentView === "exhibit" && (
        <ExhibitPage
          modelId={activeModel}
          onBack={() => setCurrentView("detail")}
          onMenuToggle={() => setIsMenuOpen(true)}
        />
      )}

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
            setActiveCharacter("callityche");
            setCurrentView("character_detail");
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
