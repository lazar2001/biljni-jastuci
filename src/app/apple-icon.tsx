import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#EDE8E0" }}>
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none" stroke="#4F6B5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 56c0-18 1.3-31 10.6-48" />
          <path d="M33.6 41.2c-7.4-.8-12.9-5.3-14.8-12.9 7.4.3 12.9 4.5 14.8 12.9Z" />
          <path d="M36.2 27.7c6.3-1.6 12.1.5 15.8 6.3-6.3 1.6-12.1-.5-15.8-6.3Z" />
          <path d="M39.4 16.9c-5.8-1.6-9.5-5.5-10.3-11.3 5.8 1.3 9.5 5.3 10.3 11.3Z" />
        </svg>
      </div>
    ),
    size,
  );
}
