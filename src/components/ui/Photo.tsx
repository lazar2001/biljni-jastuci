import Image from "next/image";
import clsx from "clsx";
import { imageExists } from "@/lib/images";
import { Placeholder } from "./Placeholder";

/**
 * Server component: renders a next/image filling its parent when the file
 * exists in /public, otherwise a palette placeholder. Parent must be positioned
 * and sized (e.g. relative + aspect ratio).
 */
export function Photo({
  src,
  alt,
  sizes,
  priority,
  tone,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  tone?: string;
  className?: string;
  imgClassName?: string;
}) {
  if (!imageExists(src)) {
    return <Placeholder alt={alt} tone={tone} file={src} className={clsx("absolute inset-0", className)} />;
  }
  return (
    <div className={clsx("absolute inset-0", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={clsx("object-cover", imgClassName)}
      />
    </div>
  );
}
