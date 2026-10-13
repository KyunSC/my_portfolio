import { useId } from "react";

// Brand icons not available (or not in official colours) in react-icons/si.
// Sized at 1em like react-icons so they line up with the Simple Icons glyphs.

// Simple Icons dropped the C# logo; hexagon geometry from Devicon "csharp-original", flat #512BD4.
export function CSharpIcon() {
  return (
    <svg viewBox="0 0 128 128" width="1em" height="1em" aria-hidden="true">
      <path
        fill="#512BD4"
        d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7zM10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"
      />
      <path
        fill="#fff"
        d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"
      />
    </svg>
  );
}

// 2023 Angular logo (Simple Icons "angular" path) with the official red-to-purple gradient.
export function AngularIcon() {
  // Unique per instance so repeated icons never reference each other's gradient.
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#E40035" />
          <stop offset="0.24" stopColor="#F60A48" />
          <stop offset="0.49" stopColor="#DC087D" />
          <stop offset="0.74" stopColor="#9717E7" />
          <stop offset="1" stopColor="#6C00F5" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M16.712 17.711H7.288l-1.204 2.916L12 24l5.916-3.373-1.204-2.916ZM14.692 0l7.832 16.855.814-12.856L14.692 0ZM9.308 0 .662 3.999l.814 12.856L9.308 0Zm-.405 13.93h6.198L12 6.396 8.903 13.93Z"
      />
    </svg>
  );
}
