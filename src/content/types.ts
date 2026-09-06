export interface Character {
  id: string;
  name: string;
  pronunciation: string;
  desc: string;
  artifacts: string[];
  image: string;
  comic: string;
}

export interface Artifact {
  id: string;
  characterId: string;
  name: string;
  material: string;
  era: string;
  region: string;
  image: string;
  thumbnail: string;
  desc: string;
  didYouKnow: string;
  history: string;
}
