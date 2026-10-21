import { Fragment, type CSSProperties, type ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Words (by index) rendered in an accent colour class. */
  accent?: Record<number, string>;
  /** Animate on load (CSS only) instead of on scroll into view. */
  immediate?: boolean;
};

/** Headline that rises in word by word from behind a mask. */
export function RevealText({ text, as: Tag = "h2", className, delay = 0, accent = {}, immediate = false }: Props) {
  const words = text.split(" ");
  const trigger = immediate ? { "data-reveal-now": "text" } : { "data-reveal": "text" };
  return (
    <Tag className={className} aria-label={text} {...trigger} style={{ "--d": `${delay}s` } as CSSProperties}>
      <span aria-hidden className="inline">
        {words.map((w, i) => (
          // The space must sit between the inline-block masks; inside one it would be trimmed.
          <Fragment key={i}>
            <span className="rt-w">
              <span className={`rt-i ${accent[i] ?? ""}`} style={{ "--i": i } as CSSProperties}>
                {w}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
