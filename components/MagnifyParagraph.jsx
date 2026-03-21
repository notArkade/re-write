"use client";
import { useState } from "react";

export default function MagnifyParagraph({ text }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative max-w-6xl mb-10 cursor-none"
      onMouseMove={handleMove}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* BASE TEXT (with hole when hovering) */}
      <p
        className="text-lg md:text-xl tracking-[0.6em] text-neutral-400 space-mono leading-relaxed whitespace-normal break-words"
        style={{
          WebkitMaskImage: show
            ? `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, transparent 100%, white 100%)`
            : "none",
          maskImage: show
            ? `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, transparent 100%, white 100%)`
            : "none",
        }}
      >
        {text}
      </p>

      {/* NORMAL TEXT (only inside lens) */}
      {show && (
        <p
          className="absolute inset-0 text-lg md:text-xl tracking-normal text-white space-mono leading-relaxed whitespace-normal break-words pointer-events-none"
          style={{
            WebkitMaskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, white 100%, transparent 100%)`,
            maskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, white 100%, transparent 100%)`,
          }}
        >
          {text}
        </p>
      )}

      {/* Lens UI */}
      {show && (
        <div
          className="pointer-events-none absolute w-60 h-60 rounded-full border border-white/30"
          style={{
            left: pos.x - 120,
            top: pos.y - 120,
          }}
        />
      )}
    </div>
  );
}