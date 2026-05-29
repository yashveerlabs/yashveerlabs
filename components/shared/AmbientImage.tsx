import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
};

/**
 * Atmospheric backdrop image. Sits behind hero content.
 *
 * Layering:
 *  - .ambient-image-root  position: absolute, fills the backdrop slot
 *  - <Image>              z-0, object-cover fills the layer
 *  - gradient overlay      z-10, vertical dark scrim
 *  - caller content        z-20+, set by PageShell <main>
 *
 * The gradient is light at the top (0.55) so the image reads at the hero
 * fold, then deepens to 0.95 at the bottom so body copy stays readable as
 * it scrolls over the image.
 */
export function AmbientImage({ src, alt = "" }: Props) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="relative z-0 object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,10,18,0.55) 0%, rgba(15,10,18,0.70) 50%, rgba(15,10,18,0.95) 100%)",
        }}
      />
    </div>
  );
}
