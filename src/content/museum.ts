import type { Artifact, Character } from "./types";

import callitycheImg from "../assets/ui_images/Callityche/Callityche.jpg";
import callitycheComic from "../assets/ui_images/Callityche/Callityche_comic_strip.jpg";
import luciusImg from "../assets/ui_images/Lucius_Calpurnius_Rufus/Lucius_Calpurnius_Rufus.jpg";
import luciusComic from "../assets/ui_images/Lucius_Calpurnius_Rufus/Rufus_comic_strip.jpg";
import marcusImg from "../assets/ui_images/Marcus_Valerius_Laos_(Africanus)/Marcus_Valerius_Laos_(Africanus).jpg";
import marcusComic from "../assets/ui_images/Marcus_Valerius_Laos_(Africanus)/Laos_comic_strip.jpg";

import augustusThumb from "../assets/ui_images/artifacts/Augustus_target_thumbnail.png";
import coinThumb from "../assets/ui_images/artifacts/Coin_target_thumbnail.png";
import inscriptionThumb from "../assets/ui_images/artifacts/Inscription_target_thumbnail.png";
import jackalThumb from "../assets/ui_images/artifacts/Jackal_target_thumbnail.png";

// Relational Data Structure
export const CHARACTERS: Record<string, Character> = {
  callityche: {
    id: "callityche",
    name: "Callityche",
    pronunciation: "(KA-LIH-TEE-KAY)",
    desc: "A freed slave who lived in Rome during the 1st century CE. Once enslaved in a wealthy household, Callityche gained her freedom and became a successful textile merchant. She navigated Roman society with grace and intelligence, building a life of independence.",
    artifacts: ["Augustus", "Coin"],
    image: callitycheImg,
    comic: callitycheComic,
  },
  lucius: {
    id: "lucius",
    name: "Lucius Calpurnius Rufus",
    pronunciation: "(LOO-SHUS)",
    desc: "A wealthy merchant who traded goods across the Mediterranean. He used his vast network to acquire rare artifacts and exotic goods from the far reaches of the empire.",
    artifacts: ["Inscription"],
    image: luciusImg,
    comic: luciusComic,
  },
  marcus: {
    id: "marcus",
    name: "Marcus Valerius Laos",
    pronunciation: "(MAR-KUS)",
    desc: "A distinguished Roman soldier who served in the legions. He collected mementos from his campaigns, holding onto objects that reminded him of the diverse cultures he encountered.",
    artifacts: ["Jackal"],
    image: marcusImg,
    comic: marcusComic,
  },
};

export const ARTIFACTS: Record<string, Artifact> = {
  Augustus: {
    id: "ARF-203",
    characterId: "callityche",
    name: "Head of Augustus",
    material: "Marble",
    era: "Roman Empire",
    region: "Ancient Rome",
    image: "🏛️",
    thumbnail: augustusThumb,
    desc: "A practical and decorative marble portrait head of Augustus, the first Roman emperor. These were mass-produced and distributed.",
    didYouKnow:
      "Augustan portraiture always depicted him as a youthful, idealized figure regardless of his actual age.",
    history:
      "The Augustan Age (27 BCE - 14 CE) marked the beginning of the Pax Romana, a long period of peace and stability.",
  },
  Coin: {
    id: "ARF-174",
    characterId: "callityche",
    name: "Denarius Silver Coin",
    material: "Silver",
    era: "Republican Period",
    region: "Ancient Rome",
    image: "🪙",
    thumbnail: coinThumb,
    desc: "An ancient silver coin featuring intricate profiles, used for trade across the vast Roman territory.",
    didYouKnow:
      "The denarius was the standard silver coin of the Roman economy for over 400 years.",
    history:
      "Minting coins was a primary way for Roman leaders to spread their image and propaganda across the empire.",
  },
  Inscription: {
    id: "ARF-251",
    characterId: "lucius",
    name: "Latin Inscription",
    material: "Stone",
    era: "Roman Empire",
    region: "Ancient Rome",
    image: "📜",
    thumbnail: inscriptionThumb,
    desc: "A carved stone tablet containing official Roman records, giving us vital clues about their laws and daily administration.",
    didYouKnow:
      "Roman inscriptions often used abbreviations for common words, similar to modern texting acronyms.",
    history:
      "Epigraphy provides some of our most direct and unedited sources of information about Roman daily life.",
  },
  Jackal: {
    id: "ARF-156",
    characterId: "marcus",
    name: "Anubis Jackal",
    material: "Wood",
    era: "New Kingdom",
    region: "Ancient Egypt",
    image: "🐕",
    thumbnail: jackalThumb,
    desc: "A wooden funerary figure of a jackal representing Anubis, the Egyptian god of mummification and the afterlife.",
    didYouKnow:
      "Anubis was depicted as black because it represented the color of the fertile soil of the Nile and rebirth.",
    history:
      "During the New Kingdom, funerary practices became more elaborate and widely accessible.",
  },
};
