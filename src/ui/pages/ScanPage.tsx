import React, {useEffect, useState} from "react";
import {activateCamera} from "../../ar/camera";
import type {CameraStatus} from "../../ar/camera";
export function ScanPage({onHelp, onBack}: {onHelp: () => void; onBack: () => void}) {
  const [status, setStatus] = useState<CameraStatus>("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => activateCamera(setStatus), [attempt]);
  const failed = status === "denied" || status === "unavailable";
  return <div className="scanner-ui">
    <button className="scan-help" aria-label="Scanning help" onClick={onHelp}>?</button>
    <section className="scan-guide" aria-label="Artifact scanning" aria-live="polite">
      {failed ? <div className="scan-error">
        <h1>{status === "denied" ? "Check camera permissions" : "Camera unavailable"}</h1>
        <p>Allow camera access in your browser settings and use HTTPS on a supported device. You can still browse saved discoveries.</p>
        <div className="button-row"><button onClick={() => setAttempt(value => value + 1)}>Retry camera</button><button onClick={onBack}>Return to characters</button></div>
      </div> : <>
        <h1 className="scan-caption">Scan an image, then tap the artifact to unlock it.</h1>
        <div className="scan-frame" aria-hidden="true">
          <span className="scan-corner top-left"/><span className="scan-corner top-right"/>
          <span className="scan-corner bottom-left"/><span className="scan-corner bottom-right"/>
        </div>
        {status === "loading" && <p className="scan-status">Starting camera… Allow camera access if asked.</p>}
      </>}
    </section>
  </div>;
}
