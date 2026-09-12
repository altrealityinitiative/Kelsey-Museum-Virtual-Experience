import type {ArtifactKey} from "../app/progress";
export interface QuizQuestion {prompt: string; choices: string[]; answer: number; explanation: string;}
export interface ArtifactExperience {model: string; orbit: string; orientation: string; map: string; questions: QuizQuestion[];}
const q = (prompt: string, choices: string[], answer: number, explanation: string): QuizQuestion => ({prompt, choices, answer, explanation});
export const EXPERIENCES: Record<ArtifactKey, ArtifactExperience> = {
  Augustus: {model: "assets/Augustus_Head.glb", orbit: "0deg 75deg 105%", orientation: "0deg 0deg 0deg", map: "assets/maps/rome.svg", questions: [
    q("What material is this portrait made from?", ["Wood", "Marble", "Silver", "Terracotta"], 1, "The artifact's material is marble."),
    q("Who was Augustus?", ["A merchant", "An Egyptian god", "The first Roman emperor", "A scribe"], 2, "The description identifies Augustus as the first Roman emperor."),
    q("How did Augustan portraits depict his age?", ["Always youthful", "Always elderly", "With no face", "Different each year"], 0, "Portraits presented an idealized, youthful image regardless of his age."),
    q("What began in the Augustan Age?", ["The New Kingdom", "The Bronze Age", "The Roman Republic", "The Pax Romana"], 3, "The historical context identifies the beginning of the Pax Romana, a long period of peace and stability."),
    q("How were these portrait heads circulated?", ["Never distributed", "Mass-produced and distributed", "Only painted on coins", "Carved only in wood"], 1, "The description explains that these portrait heads were mass-produced and distributed."),
  ]},
  Coin: {model: "assets/Philip_Coin.glb", orbit: "0deg 75deg 105%", orientation: "0deg 0deg 0deg", map: "assets/maps/rome.svg", questions: [
    q("What was the denarius made from?", ["Gold", "Silver", "Wood", "Stone"], 1, "The catalog lists silver as its material."),
    q("What was one use of this coin?", ["Building walls", "Writing laws", "Trade", "Mummification"], 2, "The description says the coins were used for trade across Roman territory."),
    q("For how long was the denarius a standard coin?", ["Over 400 years", "One year", "Ten years", "One month"], 0, "The Did You Know section describes over 400 years of use."),
    q("Why did leaders mint coins bearing their images?", ["To replace roads", "To hide their identity", "To make textiles", "To spread their image and propaganda"], 3, "Coins were a way to spread leaders' images and propaganda across the empire."),
    q("Which region does this catalog associate with the coin?", ["Ancient Egypt", "Ancient Rome", "Ancient China", "Ancient India"], 1, "The catalog's broad region is Ancient Rome."),
  ]},
  Inscription: {model: "assets/Inscription.glb", orbit: "0deg 75deg 105%", orientation: "0deg 0deg 0deg", map: "assets/maps/rome.svg", questions: [
    q("What material carries the inscription?", ["Wood", "Silver", "Stone", "Glass"], 2, "The artifact is a carved stone tablet."),
    q("What does the tablet contain?", ["Official Roman records", "Modern recipes", "Printed newspapers", "A painted portrait"], 0, "The description identifies official Roman records."),
    q("What can these records help us understand?", ["Space travel", "Modern banking", "Ocean currents", "Roman laws and administration"], 3, "The tablet gives clues about Roman laws and daily administration."),
    q("What writing shortcut did Roman inscriptions often use?", ["Emoji", "Abbreviations", "Invisible ink", "Blank spaces only"], 1, "The Did You Know section compares their abbreviations to modern texting."),
    q("What field provides direct evidence from inscriptions?", ["Astronomy", "Botany", "Epigraphy", "Meteorology"], 2, "The historical context names epigraphy as a direct source of information about Roman life."),
  ]},
  Jackal: {model: "assets/Jackal.glb", orbit: "0deg 75deg 105%", orientation: "0deg 0deg 0deg", map: "assets/maps/egypt.svg", questions: [
    q("What material is this jackal figure made from?", ["Marble", "Wood", "Silver", "Glass"], 1, "The description identifies a wooden funerary figure."),
    q("Which deity does the jackal represent?", ["Augustus", "Jupiter", "Anubis", "Venus"], 2, "The figure represents Anubis."),
    q("What was Anubis associated with?", ["Mummification and the afterlife", "Coin minting", "Textile trading", "Road building"], 0, "Anubis was the Egyptian god of mummification and the afterlife."),
    q("What did Anubis's black color symbolize?", ["Silver", "The sea", "Roman law", "Fertile Nile soil and rebirth"], 3, "Black represented fertile Nile soil and rebirth."),
    q("How did funerary practices change in the New Kingdom?", ["They disappeared", "They became more elaborate and accessible", "They used coins only", "They stopped using figures"], 1, "The historical context describes more elaborate and widely accessible practices."),
  ]},
};
