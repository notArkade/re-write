"use client";

import React from "react";

const CyberPixelText = ({ text }) => {
  return (
    <svg
      viewBox="0 0 1200 300"
      className="w-full max-w-[90vw] md:max-w-7xl mx-auto bg-[#0a0a0a]"
    >
      <defs>
        {/* 1. Stepped Gradient to simulate the distinct color bands from top to bottom */}
        <linearGradient id="purpleBlocks" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="33%" stopColor="#a855f7" />
          <stop offset="33.1%" stopColor="#c084fc" />
          <stop offset="66%" stopColor="#c084fc" />
          <stop offset="66.1%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#e9d5ff" />
        </linearGradient>

        {/* 2. Black grid pattern to overlay on the text to create the "separate blocks" illusion */}
        <pattern
          id="blockGrid"
          width="12"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="12" height="100" fill="none" />
          <line x1="12" y1="0" x2="12" y2="100" stroke="#0a0a0a" strokeWidth="3" />
          <line x1="0" y1="33" x2="12" y2="33" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="66" x2="12" y2="66" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
        </pattern>
      </defs>

      <style>
        {`
          .pixel-font {
            /* For the exact look, you MUST load a blocky web font like 'VT323' or 'Press Start 2P' */
            font-family: 'Press Start 2P', 'Courier New', monospace;
            font-size: 140px;
            font-weight: bold;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
        `}
      </style>

      <g
        className="pixel-font select-none"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {/* Layer 1: Outer Cyan Circuit Trace (Offset Down & Right) */}
        <text
          x="50.6%"
          y="52.5%"
          fill="none"
          stroke="#06b6d4" // Darker cyan
          strokeWidth="6"
          strokeLinejoin="miter"
        >
          {text}
        </text>

        {/* Layer 2: Inner Cyan Circuit Trace (Offset slightly less) */}
        <text
          x="50.3%"
          y="51.2%"
          fill="none"
          stroke="#22d3ee" // Lighter cyan
          strokeWidth="2"
          strokeLinejoin="miter"
        >
          {text}
        </text>

        {/* Layer 3: Main Purple Text Body */}
        <text x="50%" y="50%" fill="url(#purpleBlocks)">
          {text}
        </text>

        {/* Layer 4: Grid Overlay (Cuts the solid text into blocks) */}
        <text x="50%" y="50%" fill="url(#blockGrid)">
          {text}
        </text>
      </g>
    </svg>
  );
};

export default CyberPixelText;