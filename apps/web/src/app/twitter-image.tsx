import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function GET() {
  const azeret = await fetch(new URL("../fonts/AzeretMono-Bold.otf", import.meta.url)).then((res) => res.arrayBuffer());
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          width: "50%",
        }}
      >
        <span
          style={{
            fontSize: "3.5rem",
            paddingBottom: "2rem",
            letterSpacing: -2,
          }}
        >
          sideprojectAI
        </span>
        <span
          style={{
            fontFamily: "Inter",
            fontSize: "3rem",
            lineHeight: "3rem",
            backgroundImage: "linear-gradient(90deg, rgb(6 182 212 / 0.9), #3b82f6)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.05em",
          }}
        >
          AI generated resume sections for your sideprojects
        </span>
        <div
          style={{
            marginTop: "auto",
            height: "4rem",
            width: "auto",
            paddingRight: "2rem",
            paddingLeft: "2rem",
            justifyContent: "center",
            color: "white",
            alignItems: "center",
            fontSize: "1.5rem",
            fontFamily: "Inter",
            borderRadius: "0.675rem",
            backgroundImage: "linear-gradient(to bottom, #06b6d4, #3b82f6)",
          }}
        >
          Try for Free!
        </div>
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          transform: "rotate(-10deg) translateX(30px)",
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                padding: "10px",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
                height: "100px",
                width: "100%",
                borderWidth: "2px",
                borderColor: "#0284c7",
                backgroundColor: "#e2e8f0",
                borderRadius: "10px",
                translate: "40px",
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      borderRadius: "10px",
                      height: "8px",
                      width: "100%",
                      backgroundColor: "#9ca3af",
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Azeret Mono VF",
          data: azeret,
          weight: 100,
        },
        {
          name: "Inter",
          weight: 400,
          data: await fetch(new URL("../fonts/Inter-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer()),
        },
      ],
    },
  );
}
