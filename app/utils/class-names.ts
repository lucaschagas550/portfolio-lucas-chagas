// Junta as classes CSS que valem, ignorando as condicionais falsas:
// classNames("tech-chips", size && `tech-chips--${size}`, className).
export function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
