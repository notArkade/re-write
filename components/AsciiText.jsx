import { RawReferenceImage } from "@google/genai";

const AsciiText = ({
    text,
    color = "#9b5de5",
    fontSize = 16,
    lineHeight = 20
}) => {
    const lines = text.split("\n");

    return (
        <svg
            viewBox={`0 0 900 ${lines.length * lineHeight + 40}`}
            className="w-full max-w-[90vw] md:max-w-4xl mx-auto"
        >
            <text
                x="20"
                y="40"
                fill={color}
                fontFamily="monospace"
                fontSize={fontSize}
            >
                {lines.map((line, i) => (
                    <tspan key={i} x="20" dy={i === 0 ? 0 : lineHeight}>
                        {line}
                    </tspan>
                ))}
            </text>
        </svg>
    );
};

export default AsciiText;