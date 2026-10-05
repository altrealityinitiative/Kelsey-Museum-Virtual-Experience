export type CameraStatus = "loading" | "ready" | "denied" | "unavailable";
let wanted = false;
let running = false;
let installed = false;
let started = false;
let starting = false;
let initialization: Promise<void> | undefined;
let runConfig: Record<string, unknown> | undefined;
let attempt = 0;
let timer: ReturnType<typeof setTimeout>;
let notify: (status: CameraStatus) => void = () => {};
function failed(error: unknown) {
  clearTimeout(timer);
  pause();
  starting = false;
  running = false;
  const message = String((error as Error)?.message || error);
  notify(/deny_camera|denied|notallowed/i.test(message) ? "denied" : "unavailable");
}
function pause() {
  if (running && window.XR8 && !XR8.isPaused()) {
    try {XR8.pause();} catch { /* An in-flight start is paused by onStart. */ }
  }
}
function ready() {
  starting = false;
  running = true;
  clearTimeout(timer);
  if (!wanted || document.hidden) pause();
  else notify("ready");
}
async function start(token: number) {
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) return failed("Camera unavailable");
  if (!window.XR8) {
    await new Promise<void>((resolve, reject) => {
      const loaded = () => {clearTimeout(timeout); resolve();};
      const timeout = setTimeout(() => {window.removeEventListener("xrloaded", loaded); reject(new Error("Camera runtime unavailable"));}, 15000);
      window.addEventListener("xrloaded", loaded, {once: true});
    });
  }
  if (!wanted || token !== attempt || document.hidden) return;
  if (!installed) {
    XR8.addCameraPipelineModule({name: "kelsey-camera-status", onStart: ready, onResume: ready,
      onRunConfigure: ({config}) => {runConfig = config; starting = true;},
      onCameraStatusChange: ({status, reason}) => {
        if (status === "failed") failed(reason || "Camera unavailable");
      }, onException: failed});
    installed = true;
  }
  if (!window.initializeMuseumScene) throw new Error("Scene unavailable");
  if (!started) {
    starting = true;
    // Returning to Scan while the scene is loading shares the existing startup.
    if (!initialization) initialization = window.initializeMuseumScene().catch(error => {
      initialization = undefined; starting = false; throw error;
    });
    await initialization;
    started = true;
    // Scene initialization launches XR8 asynchronously; onStart confirms readiness.
    // A stale caller must not pause a newer visit that still wants the camera.
    if (!wanted || document.hidden) pause();
    return;
  } else if (starting) {
    return;
  } else if (!running) {
    const canvas = document.querySelector("canvas");
    if (!canvas || !runConfig) throw new Error("Camera configuration unavailable");
    starting = true;
    // Preserve the ECS run loop, device restrictions, and session configuration.
    await XR8.run({...runConfig, canvas});
  } else if (XR8.isPaused()) {
    starting = true;
    XR8.resume();
  } else ready();
  if (!wanted || document.hidden) pause();
}
function loading(token: number) {
  notify("loading");
  clearTimeout(timer);
  timer = setTimeout(() => {if (token === attempt) failed("Camera startup timed out");}, 30000);
}
export function activateCamera(listener: (status: CameraStatus) => void) {
  wanted = true; notify = listener;
  const token = ++attempt;
  loading(token);
  void start(token).catch(error => {if (token === attempt) failed(error);});
  const visibility = () => {
    if (document.hidden) pause();
    else if (wanted) {
      const token = attempt;
      loading(token);
      void start(token).catch(error => {if (token === attempt) failed(error);});
    }
  };
  document.addEventListener("visibilitychange", visibility);
  return () => {wanted = false; ++attempt; clearTimeout(timer); notify = () => {}; pause(); document.removeEventListener("visibilitychange", visibility);};
}
