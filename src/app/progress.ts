export const artifactKeys = ["Augustus", "Coin", "Inscription", "Jackal"] as const;
export type ArtifactKey = typeof artifactKeys[number];
export const characterKeys = ["callityche", "lucius", "marcus"] as const;
export type CharacterKey = typeof characterKeys[number];
export const STORAGE_KEY = "kelsey-visitor-v1";
export interface Progress {
  version: 1;
  discovered: ArtifactKey[];
  favorites: ArtifactKey[];
  character: CharacterKey | null;
  largeText: boolean;
  highContrast: boolean;
}
export const freshProgress = (): Progress => ({version: 1, discovered: [], favorites: [], character: null, largeText: false, highContrast: false});
export const isArtifact = (value: unknown): value is ArtifactKey => artifactKeys.includes(value as ArtifactKey);
export function parseProgress(raw: string | null): Progress {
  try {
    const value = JSON.parse(raw || "null");
    if (!value || value.version !== 1) return freshProgress();
    const discovered = [...new Set<ArtifactKey>(Array.isArray(value.discovered) ? value.discovered.filter(isArtifact) : [])];
    return {
      version: 1, discovered,
      favorites: [...new Set<ArtifactKey>(Array.isArray(value.favorites) ? value.favorites.filter((id: unknown) => isArtifact(id) && discovered.includes(id)) : [])],
      character: characterKeys.includes(value.character) ? value.character : null,
      largeText: value.largeText === true, highContrast: value.highContrast === true,
    };
  } catch { return freshProgress(); }
}
export function loadProgress(): Progress {
  try { return parseProgress(localStorage.getItem(STORAGE_KEY)); } catch { return freshProgress(); }
}
export function toggleFavorite(progress: Progress, id: ArtifactKey): Progress {
  if (!progress.discovered.includes(id)) return progress;
  return {...progress, favorites: progress.favorites.includes(id) ? progress.favorites.filter(key => key !== id) : [id, ...progress.favorites]};
}
export function discover(progress: Progress, id: ArtifactKey): Progress {
  return progress.discovered.includes(id) ? progress : {...progress, discovered: [...progress.discovered, id]};
}
export function collectionProgress(ids: readonly string[], discovered: readonly string[]) {
  const count = ids.filter(id => discovered.includes(id)).length;
  return {count, total: ids.length, complete: ids.length > 0 && count === ids.length};
}
const scanTargets: Record<string, ArtifactKey> = {
  "Exhibit-Augustus": "Augustus", "Exhibit-Philip": "Coin",
  "Exhibit-Inscription": "Inscription", "Exhibit-Jackal": "Jackal",
};
export const scannedArtifact = (scene: string): ArtifactKey | undefined => Object.prototype.hasOwnProperty.call(scanTargets, scene) ? scanTargets[scene] : undefined;
