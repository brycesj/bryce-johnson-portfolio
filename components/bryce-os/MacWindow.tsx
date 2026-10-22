"use client";

import { useEffect, useRef, useState } from "react";

export type WindowGeometry = { x: number; y: number; width: number; height: number };

type MacWindowProps = {
  id: string;
  title: string;
  active: boolean;
  zIndex: number;
  geometry: WindowGeometry;
  onClose: () => void;
  onFocus: () => void;
  onGeometryChange: (geometry: WindowGeometry) => void;
  children: React.ReactNode;
};

const MENU_HEIGHT = 32;

export function MacWindow({
  id,
  title,
  active,
  zIndex,
  geometry,
  onClose,
  onFocus,
  onGeometryChange,
  children
}: MacWindowProps) {
  const [maximized, setMaximized] = useState(false);
  const restoreGeometry = useRef(geometry);
  const drag = useRef<{ mode: "move" | "resize"; startX: number; startY: number; start: WindowGeometry } | null>(null);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (!drag.current || window.innerWidth <= 720) return;
      const { mode, startX, startY, start } = drag.current;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (mode === "move") {
        const maxX = Math.max(0, window.innerWidth - start.width);
        const maxY = Math.max(MENU_HEIGHT, window.innerHeight - 96);
        onGeometryChange({
          ...start,
          x: Math.min(Math.max(0, start.x + dx), maxX),
          y: Math.min(Math.max(MENU_HEIGHT, start.y + dy), maxY)
        });
      } else {
        onGeometryChange({
          ...start,
          width: Math.min(Math.max(330, start.width + dx), window.innerWidth - start.x),
          height: Math.min(Math.max(220, start.height + dy), window.innerHeight - start.y)
        });
      }
    };

    const handleUp = () => {
      drag.current = null;
      document.body.classList.remove("window-dragging");
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [onGeometryChange]);

  const toggleMaximize = () => {
    onFocus();
    if (maximized) {
      onGeometryChange(restoreGeometry.current);
    } else {
      restoreGeometry.current = geometry;
      onGeometryChange({ x: 8, y: 40, width: window.innerWidth - 16, height: window.innerHeight - 48 });
    }
    setMaximized((value) => !value);
  };

  return (
    <section
      className={`mac-window ${active ? "is-active" : "is-inactive"}`}
      aria-label={`${title} window`}
      style={{
        left: geometry.x,
        top: geometry.y,
        width: geometry.width,
        height: geometry.height,
        zIndex
      }}
      onPointerDown={onFocus}
      data-window={id}
    >
      <header
        className="mac-window__titlebar"
        onDoubleClick={toggleMaximize}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("button")) return;
          onFocus();
          drag.current = { mode: "move", startX: event.clientX, startY: event.clientY, start: geometry };
          document.body.classList.add("window-dragging");
        }}
      >
        <button type="button" className="mac-window__close" aria-label={`Close ${title}`} onClick={onClose} />
        <span className="mac-window__stripes" />
        <h2>{title}</h2>
        <span className="mac-window__stripes" />
        <button type="button" className="mac-window__zoom" aria-label={`Maximize ${title}`} onClick={toggleMaximize} />
      </header>
      <div className="mac-window__content">{children}</div>
      <button
        type="button"
        className="mac-window__resize"
        aria-label={`Resize ${title}`}
        onPointerDown={(event) => {
          event.stopPropagation();
          onFocus();
          drag.current = { mode: "resize", startX: event.clientX, startY: event.clientY, start: geometry };
          document.body.classList.add("window-dragging");
        }}
      />
    </section>
  );
}
