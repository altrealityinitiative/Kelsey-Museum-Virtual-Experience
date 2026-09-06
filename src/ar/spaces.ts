export const getExhibitSpaceName = (modelId: string) => {
  if (modelId === "Augustus") return "Exhibit-Augustus";
  if (modelId === "Jackal") return "Exhibit-Jackal";
  if (modelId === "Inscription") return "Exhibit-Inscription";
  if (modelId === "Coin") return "Exhibit-0869Inscription";
  return "Exhibit-Augustus";
};
