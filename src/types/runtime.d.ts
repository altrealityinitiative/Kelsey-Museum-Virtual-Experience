interface Window {
  XR8: typeof XR8;
  load8thWallSpace?: (spaceName: string) => void;
  initializeMuseumScene?: () => Promise<void>;
}

declare const XR8: {
  pause: () => void;
  resume: () => void;
  isPaused: () => boolean;
  run: (options: {canvas: HTMLCanvasElement}) => Promise<void>;
  addCameraPipelineModule: (module: {name: string; onStart?: () => void; onCameraStatusChange?: (event: {status: string}) => void; onException?: (error: unknown) => void}) => void;
  XrController: {
    configure: (options: { imageTargetData: unknown[] }) => void;
  };
};

interface WindowEventMap {
  AR_MODEL_CLICKED: CustomEvent<{ targetScene: string }>;
}
