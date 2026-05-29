import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog/loader";
import { SITE } from "@/lib/site-config";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Yashveer Labs Blog";
  const category = post?.category ?? "Yashveer Labs";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0F0A12",
          backgroundImage:
            "radial-gradient(120% 90% at 20% 10%, rgba(176,138,82,0.22), transparent 60%), radial-gradient(80% 60% at 90% 90%, rgba(122,91,87,0.18), transparent 60%)",
          color: "#ECE7E1",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#B08A52",
            letterSpacing: "0.22em",
            fontSize: "20px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "1px",
              backgroundColor: "#B08A52",
            }}
          />
          <span>{category}</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            lineHeight: 1.08,
            color: "#ECE7E1",
            maxWidth: "1000px",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(236,231,225,0.55)",
            fontSize: "22px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>{SITE.brand}</span>
          <span>yashveerlabs.vercel.app</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, immutable, no-transform, max-age=31536000",
      },
    }
  );
}
