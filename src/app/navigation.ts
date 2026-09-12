import {useEffect, useState} from "react";
import type {ArtifactKey, CharacterKey} from "./progress";

export type Destination = {page: "characters" | "camera" | "collection" | "favorites" | "about" | "tutorial"} | {page: "character"; id: CharacterKey} | {page: "artifact"; id: ArtifactKey};
export type Overlay = "menu" | "quiz" | "map" | "viewer" | "locked";
export interface Visit {destination: Destination; overlay?: Overlay; key: number; depth: number; session: string;}
export function nextVisit(current: Visit, destination: Destination, overlay?: Overlay): Visit {
  return {destination, overlay, key: current.key + 1, depth: current.depth + 1, session: current.session};
}
export function useNavigation() {
  const [visit, setVisit] = useState<Visit>(() => ({destination: {page: "characters"}, key: 0, depth: 0, session: String(Date.now())}));
  useEffect(() => {
    history.replaceState({kelsey: visit}, "");
    const onPop = (event: PopStateEvent) => {
      const next = event.state?.kelsey as Visit | undefined;
      if (next?.session === visit.session) setVisit(next);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (destination: Destination, overlay?: Overlay) => {
    // Replacing an open menu prevents Back from reopening that menu.
    const next = nextVisit(visit, destination, overlay);
    if (visit.overlay) {
      next.depth = visit.depth;
      history.replaceState({kelsey: next}, "");
    } else history.pushState({kelsey: next}, "");
    setVisit(next);
  };
  const back = () => {
    if (visit.depth) history.back();
    else navigate({page: "characters"});
  };
  return {visit, navigate, back, open: (overlay: Overlay) => navigate(visit.destination, overlay)};
}
