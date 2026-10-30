import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { brand } from "@/lib/brand";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card shown when the site's link is shared (LinkedIn, Slack, messages). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: brand.pinkSoft,
          color: brand.fg,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {[brand.paper, brand.pinkStrong, brand.fg].map((colour) => (
            <div
              key={colour}
              style={{ width: 56, height: 56, borderRadius: 16, background: colour }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -4 }}>
            {`Hi, I'm ${site.firstName}.`}
          </div>
          <div style={{ fontSize: 48, color: brand.fg, opacity: 0.72, letterSpacing: -1.5 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ fontSize: 28, color: brand.fg, opacity: 0.6 }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
