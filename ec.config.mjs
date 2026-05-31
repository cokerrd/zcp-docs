import { defineEcConfig } from '@astrojs/starlight/expressive-code';

// This file is auto-discovered by astro-expressive-code via loadEcConfigFile()
// called unconditionally in the astro:config:setup hook. No reference to it is
// needed in astro.config.mjs.
//
// emitExternalStylesheet: false — inlines EC styles as a <style> tag per page
// instead of emitting /_astro/ec.*.css. This avoids a routing conflict in
// Astro v6 where Starlight's catch-all page route intercepts /_astro/ requests
// before Vite's virtual-module middleware can serve them.
//
// codeLineHeight is intentionally omitted. Starlight's preprocessor already
// defaults it to 'var(--sl-line-height)'. EC passes styleOverrides values
// directly as CSS property values, so both unitless numbers and CSS variable
// references (e.g. var(--sl-line-height, 1.65)) are valid — but overriding
// the variable here would break Starlight's own line-height token.
// defaultProps.frame: 'none' — render every code block as a flat box with no
// frame chrome (no terminal dots / titlebar, no editor tab). This gives a
// consistent look across all languages (shell, yaml, json, …) and, critically,
// works around a rendering bug in expressive-code 0.42 on Astro 6 where the
// terminal frame (the default for bash/sh/powershell) fails to paint
// single-line code blocks — they showed up as empty boxes. Non-terminal frames
// and frame:'none' are unaffected, so disabling frames fixes both issues.
export default defineEcConfig({
  emitExternalStylesheet: false,
  defaultProps: {
    frame: 'none',
  },
  styleOverrides: {
    codePaddingBlock: '1.125rem',
  },
});
