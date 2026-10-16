/** Props every illustration takes. */
export interface IllustrationProps {
  /** The server's repo name, used to keep SVG gradient ids unique on the page. */
  id: string;
  /** The server's gradient: start, middle, end. */
  colors: [string, string, string];
  /**
   * "spot" (default): the card banner, a whole <svg>.
   * "glyph": a small white mark drawn in a 64×64 box, as a <g> for the hub diagram's tile.
   */
  variant?: "spot" | "glyph";
}
