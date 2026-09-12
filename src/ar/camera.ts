export type CameraStatus = "loading" | "ready" | "denied" | "unavailable";
let wanted = false;
let running = false;
let installed = false;
let started = false;
let attempt = 0;
let timer: ReturnType<typeof setTimeout>;
let notify: (status: CameraStatus) => void = () => {};
function failed(error: unknown) {
  clearTimeout(timer);
  const message = String((error as Error)?.message || error);
  notify(/permission|denied|notallowed/i.test(message) ? "denied" : "unavailable");
}
function pause() {
  if (running && window.XR8 && !XR8.isPaused()) {
    try {XR8.pause();} catch { /* An in-flight start is paused by onStart. */ }
  }
}
function ready() {
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
  if (!wanted || token !== attempt) return;
  if (!installed) {
    XR8.addCameraPipelineModule({name: "kelsey-camera-status", onStart: ready,
      onCameraStatusChange: ({status}) => {
        if (status === "hasVideo") ready();
        else if (status === "failed") failed("Camera permission denied or camera unavailable. Check browser permissions.");
      }, onException: failed});
    installed = true;
  }
  if (!window.initializeMuseumScene) throw new Error("Scene unavailable");
  if (!started) {
    await window.initializeMuseumScene();
    started = true;
  } else if (XR8.isPaused()) {
    XR8.resume();
    if (wanted) notify("ready");
  } else if (!running) {
    const canvas = document.querySelector("canvas");
    if (!canvas) throw new Error("Camera canvas unavailable");
    await XR8.run({canvas});
  } else ready();
  if (!wanted || token !== attempt) pause();
}
export function activateCamera(listener: (status: CameraStatus) => void) {
  wanted = true; notify = listener; notify("loading");
  const token = ++attempt;
  timer = setTimeout(() => {if (token === attempt) failed("Camera startup timed out");}, 30000);
  void start(token).catch(error => {if (token === attempt) failed(error);});
  const visibility = () => {
    if (document.hidden) pause();
    else if (wanted) void start(attempt).catch(failed);
  };
  document.addEventListener("visibilitychange", visibility);
  return () => {wanted = false; ++attempt; clearTimeout(timer); notify = () => {}; pause(); document.removeEventListener("visibilitychange", visibility);};
}
