"use client";

import useHoverTextEffect from "../hooks/text-animation";

export default function HoverText({ children }) {
  const ref = useHoverTextEffect();

  return (
    <span ref={ref} data-value={children}>
      {children}
    </span>
  );
}