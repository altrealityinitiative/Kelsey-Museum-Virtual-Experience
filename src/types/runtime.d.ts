interface Window {
  XR8: typeof XR8;
  load8thWallSpace?: (spaceName: string) => void;
}

declare const XR8: {
  XrController: {
    configure: (options: { imageTargetData: unknown[] }) => void;
  };
};

interface WindowEventMap {
  AR_MODEL_CLICKED: CustomEvent<{ targetScene: string }>;
}
