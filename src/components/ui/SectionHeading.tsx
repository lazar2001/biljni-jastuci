import clsx from "clsx";
import { Reveal } from "./Reveal";
import { Text } from "./Text";

export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={clsx("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden="true" className="h-px w-6 bg-accent transition-colors duration-1000 ease-calm" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: string;
  id?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className={clsx("mt-5 text-h2", titleClassName)}>
        <Text>{title}</Text>
      </h2>
    </Reveal>
  );
}
