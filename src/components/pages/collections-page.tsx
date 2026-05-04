"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";

export function CollectionsPage() {
  const { content, dictionary, locale } = useSiteContent();

  return (
    <section className="section page-intro">
      <ViewportReveal className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{dictionary.nav.collections}</p>
            <h1>{dictionary.collections.title}</h1>
          </div>
          <p className="lead-text catalog-lead">{dictionary.collections.subtitle}</p>
        </div>

        <div className="collection-grid">
          {content.collections.map((item, index) => {
            const video = getPlayableVideo(item.videoUrl);

            return (
              <ViewportReveal className="collection-card" key={item.id} delay={index * 90}>
                <div className="collection-video-frame">
                  {video.kind === "embed" ? (
                    <iframe
                      title={item.title[locale]}
                      src={video.src}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : video.kind === "file" ? (
                    <video
                      controls
                      preload="metadata"
                      poster={item.cover}
                      src={video.src}
                    />
                  ) : (
                    <Image
                      src={item.cover}
                      alt={item.title[locale]}
                      fill
                      className="art-image"
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="collection-copy">
                  <span className="news-date">{item.date}</span>
                  <h2>{item.title[locale]}</h2>
                  <p>{item.description[locale]}</p>
                  {video.kind === "link" ? (
                    <a
                      className="inline-link"
                      href={video.src}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {dictionary.collections.watch}
                    </a>
                  ) : null}
                </div>
              </ViewportReveal>
            );
          })}
        </div>
      </ViewportReveal>
    </section>
  );
}

function getPlayableVideo(url: string):
  | { kind: "embed"; src: string }
  | { kind: "file"; src: string }
  | { kind: "link"; src: string } {
  if (!url) {
    return { kind: "link", src: "#" };
  }

  if (url.startsWith("/") || /\.(mp4|webm|ogg)$/i.test(url)) {
    return { kind: "file", src: url };
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" && parsed.pathname.startsWith("/embed/")) {
      return { kind: "embed", src: parsed.toString() };
    }

    if (host === "youtube.com" && parsed.pathname === "/watch") {
      const id = parsed.searchParams.get("v");

      if (id) {
        return { kind: "embed", src: `https://www.youtube.com/embed/${id}` };
      }
    }

    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "");

      if (id) {
        return { kind: "embed", src: `https://www.youtube.com/embed/${id}` };
      }
    }

    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];

      if (id) {
        return { kind: "embed", src: `https://player.vimeo.com/video/${id}` };
      }
    }
  } catch {
    return { kind: "link", src: url };
  }

  return { kind: "link", src: url };
}
