import { readFileSync } from 'node:fs';
import { defineEcConfig, ExpressiveCodeTheme } from '@astrojs/starlight/expressive-code';

// Starlight's Expressive Code integration discovers this project-root config.
// No explicit Expressive Code key is needed in astro.config.mjs.
//
// emitExternalStylesheet: false inlines EC styles as a <style> tag per page
// instead of emitting a shared /_astro/ec.*.css asset.
//
// defaultProps.frame: 'none' renders every code block as a flat box with no
// frame chrome (no terminal dots or titlebar, no editor tab). The ZCP
// Instrument CodeBlock adds its own label row instead. The plugin below sets
// data-language on the block. src/styles/custom.css draws it as an uppercase
// mono label above the code.
//
// Syntax colour follows the ZCP Instrument CodeBlock rule: keywords in accent,
// strings in ink-muted, comments in ink-faint, everything else in ink. EC
// needs literal colours to check contrast at build time. The two themes below
// read the token values from src/styles/tokens.css, which is the only place
// they are defined. Design spec: docs/architecture/zcp-instrument-design-system.md
// in the platform repo.

const tokensCss = readFileSync(new URL('./src/styles/tokens.css', import.meta.url), 'utf8');

/** Reads the hex --zi-* tokens declared in one selector block of tokens.css. */
function readTokens(selector) {
  const start = tokensCss.indexOf(`\n${selector} {`);
  if (start === -1) throw new Error(`[ERROR] ec.config.mjs: ${selector} not found in tokens.css`);
  const block = tokensCss.slice(start, tokensCss.indexOf('}', start));
  const tokens = {};
  for (const [, name, value] of block.matchAll(/--zi-([a-z-]+):\s*(#[0-9a-fA-F]{6})\b/g)) {
    tokens[name] = value;
  }
  return tokens;
}

/** Carbon overrides Paper, so the dark set starts from the light one. */
const paperTokens = readTokens(':root');
const carbonTokens = { ...paperTokens, ...readTokens(":root[data-theme='dark']") };

/** Builds a theme from one set of ZCP Instrument token values. */
function instrumentTheme(name, type, t) {
  const surfaceSunken = t['surface-sunken'];
  const { ink, accent, success, danger } = t;
  const inkMuted = t['ink-muted'];
  const inkFaint = t['ink-faint'];
  return new ExpressiveCodeTheme({
    name,
    type,
    colors: {
      'editor.background': surfaceSunken,
      'editor.foreground': ink,
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: { foreground: inkFaint },
      },
      {
        scope: ['string', 'punctuation.definition.string', 'string.quoted', 'string.unquoted'],
        settings: { foreground: inkMuted },
      },
      {
        scope: [
          'keyword',
          'keyword.control',
          'storage',
          'storage.type',
          'storage.modifier',
          'entity.name.tag',
          'support.type.property-name',
          'meta.object-literal.key',
        ],
        settings: { foreground: accent },
      },
      {
        scope: ['markup.inserted', 'punctuation.definition.inserted'],
        settings: { foreground: success },
      },
      {
        scope: ['markup.deleted', 'punctuation.definition.deleted'],
        settings: { foreground: danger },
      },
    ],
  });
}

const paper = instrumentTheme('zcp-instrument-paper', 'light', paperTokens);
const carbon = instrumentTheme('zcp-instrument-carbon', 'dark', carbonTokens);

// Languages that are plain text get no label row.
const UNLABELLED = new Set(['', 'txt', 'text', 'plaintext', 'plain', 'ansi']);

/** Exposes the block's language as data-language for the CSS label row. */
const languageLabel = {
  name: 'zcp-instrument-language-label',
  hooks: {
    postprocessRenderedBlock: ({ codeBlock, renderData }) => {
      const language = codeBlock.language ?? '';
      if (UNLABELLED.has(language)) return;
      const figure =
        renderData.blockAst.tagName === 'figure'
          ? renderData.blockAst
          : renderData.blockAst.children?.find((node) => node.tagName === 'figure');
      if (figure) figure.properties = { ...figure.properties, dataLanguage: language };
    },
  },
};

export default defineEcConfig({
  emitExternalStylesheet: false,
  themes: [carbon, paper],
  // The themes above are the site's own, so Starlight's UI colour overrides
  // (built for its bundled themes) stay off. The frame colours come from the
  // tokens through styleOverrides instead.
  useStarlightUiThemeColors: false,
  minSyntaxHighlightingColorContrast: 4.5,
  plugins: [languageLabel],
  defaultProps: {
    frame: 'none',
  },
  styleOverrides: {
    borderColor: 'var(--zi-line)',
    borderRadius: 'var(--zi-radius-md)',
    codeBackground: 'var(--zi-surface-sunken)',
    codeForeground: 'var(--zi-ink)',
    codeFontSize: '0.875rem',
    codeLineHeight: '1.375rem',
    codePaddingBlock: 'var(--zi-space-4)',
    codePaddingInline: 'var(--zi-space-6)',
    uiFontFamily: 'var(--zi-font-sans)',
    frames: {
      editorBackground: 'var(--zi-surface-sunken)',
      terminalBackground: 'var(--zi-surface-sunken)',
      frameBoxShadowCssValue: 'none',
      inlineButtonForeground: 'var(--zi-ink-muted)',
      inlineButtonBorder: 'var(--zi-line-control)',
      inlineButtonBackground: 'var(--zi-surface)',
      tooltipSuccessBackground: 'var(--zi-success)',
      tooltipSuccessForeground: 'var(--zi-surface)',
    },
  },
});
