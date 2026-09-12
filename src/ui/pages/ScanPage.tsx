import React, {useEffect, useState} from "react";
import {activateCamera} from "../../ar/camera";
import type {CameraStatus} from "../../ar/camera";
export function ScanPage({onHelp, onBack}: {onHelp: () => void; onBack: () => void}) {
  const [status, setStatus] = useState<CameraStatus>("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => activateCamera(setStatus), [attempt]);
  return <div className="scanner-ui"><section className="scan-instructions" aria-live="polite"><h1>Scan an Artifact</h1>{status === "ready" ? <p>Point at a supported image target, then tap the model that appears to unlock it.</p> : status === "loading" ? <p>Starting the camera… Allow camera access when your browser asks.</p> : <><h2>{status === "denied" ? "Check camera permissions" : "Camera unavailable"}</h2><p>Allow camera access in your browser settings and use HTTPS on a supported device. You can still browse saved discoveries.</p><button onClick={() => setAttempt(value => value + 1)}>Retry camera</button><button onClick={onBack}>Return to characters</button></>}<p>Supported targets: Augustus · Coin · Inscription · Jackal</p><button onClick={onHelp}>Scanning help</button></section></div>;
}
