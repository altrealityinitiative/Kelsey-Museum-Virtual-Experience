import React, {useEffect, useRef, useState} from "react";
import type {ModelViewerElement} from "@google/model-viewer";
import type {ArtifactKey} from "../../app/progress";
import {ARTIFACTS} from "../../content/museum";
import {EXPERIENCES} from "../../content/experiences";

export function ArtifactViewer({id, expanded, onExpand, onClose}: {id: ArtifactKey; expanded: boolean; onExpand: () => void; onClose: () => void}) {
  const ref = useRef<ModelViewerElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [registered, setRegistered] = useState(false);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  const artifact = ARTIFACTS[id]; const experience = EXPERIENCES[id];
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    import("@google/model-viewer").then(() => {if (!cancelled) setRegistered(true);}).catch(() => {if (!cancelled) setStatus("error");});
    return () => {cancelled = true;};
  }, [attempt]);
  useEffect(() => {
    const viewer = ref.current; if (!viewer) return;
    const loaded = () => {clearTimeout(timer); setStatus("ready");};
    const failed = () => {clearTimeout(timer); setStatus("error");};
    viewer.addEventListener("load", loaded); viewer.addEventListener("error", failed);
    const timer = setTimeout(failed, 45000);
    if (viewer.loaded) loaded();
    return () => {clearTimeout(timer); viewer.removeEventListener("load", loaded); viewer.removeEventListener("error", failed);};
  }, [registered, attempt, id]);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.activeElement as HTMLElement;
    const shell = document.querySelector(".visitor-header") as HTMLElement;
    if (shell) shell.inert = true;
    const controls = () => {
      const elements = Array.from(container.current.querySelectorAll<HTMLElement>("button:not(:disabled), [tabindex='0']"));
      // The interactive model surface lives inside the custom element's shadow root.
      const modelInput = ref.current?.shadowRoot?.querySelector<HTMLElement>(".userInput[tabindex='0']");
      if (modelInput) elements.splice(expanded ? 1 : 0, 0, modelInput);
      return elements;
    };
    controls()[0]?.focus();
    const keys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {e.preventDefault(); onClose();}
      if (e.key === "Tab") {
        // Contain focus explicitly, including the model-viewer's shadow-root controls.
        const list = controls();
        const active = ref.current?.shadowRoot?.activeElement || document.activeElement;
        const index = list.indexOf(active as HTMLElement);
        const next = index < 0 ? (e.shiftKey ? list.length - 1 : 0) : (index + (e.shiftKey ? -1 : 1) + list.length) % list.length;
        e.preventDefault(); list[next]?.focus();
      }
    };
    container.current.addEventListener("keydown", keys);
    const node = container.current;
    return () => {node.removeEventListener("keydown", keys); if (shell) shell.inert = false; if (previous?.isConnected) previous.focus();};
  }, [expanded]);
  const orbit = (delta: number) => {const viewer = ref.current; if (!viewer) return; const camera = viewer.getCameraOrbit(); viewer.cameraOrbit = `${camera.theta + delta}rad ${camera.phi}rad ${camera.radius}m`;};
  const zoom = (inward: boolean) => {
    const viewer = ref.current; if (!viewer) return;
    const camera = viewer.getCameraOrbit();
    // Update camera distance directly; zoom() synthesizes wheel input.
    const radius = inward ? camera.radius * .85 : camera.radius / .85;
    viewer.cameraOrbit = `${camera.theta}rad ${camera.phi}rad ${radius}m`;
  };
  return <div ref={container} className={`artifact-viewer ${expanded ? "viewer-expanded" : ""}`} role={expanded ? "dialog" : "group"} aria-modal={expanded || undefined} aria-label={`${artifact.name} 3D viewer`}>
    {expanded && <button className="collapse-viewer" onClick={onClose}>Close expanded view</button>}
    <div className="model-frame">
      {registered && status !== "error" ? React.createElement("model-viewer", {
        key: `${id}-${attempt}`, ref, src: experience.model, poster: artifact.thumbnail, alt: `Interactive 3D model of ${artifact.name}`,
        "camera-controls": true, "touch-action": "pan-y", "camera-orbit": experience.orbit, orientation: experience.orientation,
        "min-camera-orbit": "auto 5deg 40%", "max-camera-orbit": "auto 175deg 250%", "shadow-intensity": "1", "interaction-prompt": "none",
      }) : <img src={artifact.thumbnail} alt={artifact.name}/>}
    </div>
    <div className="viewer-status" role="status">{status === "loading" ? "Loading 3D model…" : status === "error" ? <>3D view could not load. The artifact image is still available. <button onClick={() => {setStatus("loading"); setAttempt(value => value + 1);}}>Retry 3D model</button></> : "Drag to rotate · Pinch or use buttons to zoom"}</div>
    <div className="button-row viewer-buttons"><button disabled={status !== "ready"} aria-label="Zoom out" onClick={() => zoom(false)}>−</button><button disabled={status !== "ready"} aria-label="Rotate left" onClick={() => orbit(-Math.PI / 6)}>↶</button><button disabled={status !== "ready"} onClick={() => {ref.current.cameraOrbit = experience.orbit; ref.current.cameraTarget = "auto auto auto"; ref.current.fieldOfView = "auto";}}>Reset</button><button disabled={status !== "ready"} aria-label="Rotate right" onClick={() => orbit(Math.PI / 6)}>↷</button><button disabled={status !== "ready"} aria-label="Zoom in" onClick={() => zoom(true)}>+</button>{!expanded && <button onClick={onExpand}>Expand</button>}</div>
  </div>;
}
