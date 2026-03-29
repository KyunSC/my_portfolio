import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sunny Chen — Software Developer in Montreal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Green accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #22c55e, #4ade80)",
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <span style={{ color: "#a1a1aa", fontSize: "18px", fontFamily: "monospace" }}>
            available for work
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#fafafa",
            margin: "0 0 16px 0",
            letterSpacing: "-2px",
          }}
        >
          Sunny Chen
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: "32px",
            color: "#a1a1aa",
            margin: "0 0 40px 0",
          }}
        >
          Software Developer
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["React", "Next.js", "TypeScript", "Python", "Java", "C#"].map((tech) => (
            <span
              key={tech}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #27272a",
                color: "#d4d4d8",
                fontSize: "16px",
                backgroundColor: "rgba(39, 39, 42, 0.5)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Domain */}
        <p
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "20px",
            color: "#4ade80",
            fontFamily: "monospace",
          }}
        >
          chensunny.com
        </p>
      </div>
    ),
    { ...size }
  );
}
