import { gallery } from "@/content/site";
import { imageExists } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryRail } from "./GalleryRail";

export function Gallery() {
  const images = gallery.images.map((img) => ({ ...img, exists: imageExists(img.src) }));

  return (
    <section id="galerija" aria-labelledby="gallery-title" className="bg-charcoal text-paper">
      <GalleryRail
        images={images}
        heading={
          <div className="container-site flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="gallery-title"
              eyebrow={gallery.eyebrow}
              title={gallery.title}
              className="[&_.eyebrow]:!text-paper/60"
            />
            <p className="text-sm text-paper/60">Kliknite na fotografiju za uvećanje</p>
          </div>
        }
      />
    </section>
  );
}
