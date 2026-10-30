import { ImageResponse } from "next/og";

import { brand } from "@/lib/brand";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: a pink rounded square with an "F". */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.pink,
          borderRadius: 16,
          color: brand.fg,
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        F
      </div>
    ),
    size,
  );
}
