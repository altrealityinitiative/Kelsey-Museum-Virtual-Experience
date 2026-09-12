import React, {useEffect, useRef} from "react";

export function Dialog({title, onClose, children, className = ""}: {title: string; onClose: () => void; children: React.ReactNode; className?: string}) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose); close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const dialog = ref.current;
    dialog.showModal();
    return () => {dialog.close(); if (previous?.isConnected) previous.focus();};
  }, []);
  return <dialog ref={ref} className={`visitor-dialog ${className}`} aria-label={title}
    onCancel={e => {e.preventDefault(); close.current();}}
    onClick={e => {if (e.target === ref.current) {const r = ref.current.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close.current();}}}>
    <header className="dialog-heading"><h2>{title}</h2><button aria-label="Close" onClick={onClose}>✕</button></header>
    {children}
  </dialog>;
}
