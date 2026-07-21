import * as ecs from "@8thwall/ecs"; // This is how you access the ecs library.

function parseUiWidthToPx(widthStr: string): number | null {
  const n = Number(widthStr);
  if (!Number.isNaN(n)) return n;

  if (widthStr.endsWith("%")) {
    const pct = Number(widthStr.slice(0, -1));
    if (Number.isNaN(pct)) return null;
    return window.innerWidth * (pct / 100); // <-- FIX
  }

  return null;
}

async function measureWithDOM(opts: {
  text: string;
  maxWidthPx?: number;
  fontFamily: string;
  fontSizePx: number;
  lineHeightPx?: number; // optional but recommended
  fontWeight?: string;
  className?: string;
}) {
  const el = document.createElement("div");

  el.style.position = "absolute";
  el.style.visibility = "hidden";
  el.style.left = "-99999px";
  el.style.top = "0";

  // Wrapping behavior
  el.style.whiteSpace = "pre-wrap";
  el.style.overflowWrap = "break-word"; // modern
  el.style.wordBreak = "break-word"; // fallback-ish
  el.style.display = "block";

  if (opts.maxWidthPx != null) el.style.width = `${opts.maxWidthPx}px`;

  // Apply the font styles you're trying to measure
  el.style.fontFamily = opts.fontFamily;
  el.style.fontSize = `${opts.fontSizePx}px`;
  if (opts.fontWeight) el.style.fontWeight = opts.fontWeight;
  if (opts.lineHeightPx != null) el.style.lineHeight = `${opts.lineHeightPx}px`;

  if (opts.className) el.className = opts.className;

  el.textContent = opts.text;

  document.body.appendChild(el);

  // If you might use webfonts, this helps avoid measuring before they load.
  // (No harm if it's a system font.)
  await (document as any).fonts?.ready;

  const rect = el.getBoundingClientRect();
  el.remove();

  return { width: rect.width, height: rect.height };
}

ecs.registerComponent({
  name: "TextWrap",
  schema: {
    fontFamily: ecs.string,
    fontSize: ecs.ui32,
    heightScale: ecs.f32,
  },
  schemaDefaults: {
    fontFamily: "sans-serif",
    fontSize: 0,
    heightScale: 1,
  },
  add: async (world, component) => {
    const { eid, schema } = component;
    const ui = ecs.Ui.get(world, eid);

    const widthPx = parseUiWidthToPx(String(ui.width));
    if (widthPx == null) {
      console.warn(`Could not convert width of ${eid}: ${ui.width}`);
      return;
    }

    // Pick the font size: schema override if set, otherwise whatever ui.fontSize is
    const fontSizePx =
      schema.fontSize !== 0 ? schema.fontSize : Number(ui.fontSize);

    const wrappedSize = await measureWithDOM({
      text: ui.text,
      maxWidthPx: widthPx,
      fontFamily: schema.fontFamily || "sans-serif",
      fontSizePx: Number.isFinite(fontSizePx) ? fontSizePx : 16,
      lineHeightPx: Math.ceil(
        (Number.isFinite(fontSizePx) ? fontSizePx : 16) * 1.2,
      ),
    });

    ecs.Ui.set(world, eid, {
      height: String(Math.floor(wrappedSize.height * schema.heightScale)),
    });

    console.log(widthPx, wrappedSize);
  },
});
