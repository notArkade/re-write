"use client";
import { useEffect, useRef } from "react";

const useHoverTextEffect = () => {
  const ref = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const parent = element.closest("a,button,div");

    const handleHover = () => {
      let iterations = 0;
      const originalText = element.dataset.value;

      const interval = setInterval(() => {
        element.innerText = originalText
          .split("")
          .map((letter, index) =>
            index < iterations
              ? originalText[index]
              : letters[Math.floor(Math.random() * letters.length)]
          )
          .join("");

        if (iterations >= originalText.length) clearInterval(interval);

        iterations += 1 / 5;
      }, 20);
    };

    parent?.addEventListener("mouseenter", handleHover);

    return () => {
      parent?.removeEventListener("mouseenter", handleHover);
    };
  }, []);

  return ref;
};

export default useHoverTextEffect;