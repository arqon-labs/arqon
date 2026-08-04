import { ImageResponse } from "next/og";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";

export const alt = "ARQON — разработка веб-продуктов";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(79,125,255,0.20) 0%, rgba(8,8,10,0) 70%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.35em",
              color: "#a1a1aa",
              display: "flex",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 48,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {ru.hero.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #232329",
            paddingTop: 32,
            fontSize: 26,
            color: "#a1a1aa",
          }}
        >
          <div style={{ display: "flex" }}>{ru.footer.description}</div>
          <div style={{ display: "flex", color: "#4f7dff" }}>{site.domain}</div>
        </div>
      </div>
    ),
    size,
  );
}
