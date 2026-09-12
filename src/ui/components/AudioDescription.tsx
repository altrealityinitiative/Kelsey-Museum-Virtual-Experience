import React, {useEffect, useRef, useState} from "react";
export function AudioDescription({text, stop}: {text: string; stop: boolean}) {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [error, setError] = useState("");
  const generation = useRef(0);
  const cancel = () => {++generation.current; if (supported) speechSynthesis.cancel(); setPlaying(false); setPosition(null);};
  useEffect(() => {if (stop) cancel();}, [stop]);
  useEffect(() => () => {++generation.current; if (supported) speechSynthesis.cancel();}, [text]);
  const play = () => {
    if (playing) return cancel();
    const token = ++generation.current;
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "en-US";
    utterance.onboundary = e => {if (generation.current === token && e.name === "word") setPosition(e.charIndex);};
    utterance.onend = () => {if (generation.current === token) {setPlaying(false); setPosition(null);}};
    utterance.onerror = () => {if (generation.current === token) {setError("Audio is unavailable. You can read the description below."); setPlaying(false);}};
    setError(""); setPosition(null); setPlaying(true);
    speechSynthesis.cancel(); speechSynthesis.speak(utterance);
  };
  let offset = 0;
  return <section><div className="section-heading"><h2>Artifact Description</h2><button disabled={!supported} aria-pressed={playing} onClick={play}>{playing ? "Stop audio" : "Listen"}</button></div>
    {(!supported || error) && <p role="status">{error || "Audio descriptions are unavailable in this browser."}</p>}
    <p className={`description-box ${playing && position === null ? "speaking-paragraph" : ""}`}>{text.split(/(\s+)/).map((word, index) => {const start = offset; offset += word.length; return <span key={index} className={playing && position !== null && position >= start && position < offset ? "spoken-word" : undefined}>{word}</span>;})}</p>
  </section>;
}
