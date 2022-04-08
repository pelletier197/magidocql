var e=`---
title: PrismJS
since: 1.0.0
tags: ['standalone', 'plugin', 'svelte']
---

> Info: This plugin is a standalone plugin and can be used outside of Magidoc. It is built to be re-usable outside of Magidoc for any Svelte or SvelteKit Project.

The PrismJS plugin is a Svelte plugin built with TypeScript that gives you to get syntax highlighting for displaying code inside the browser, using [PrismJS](https://www.npmjs.com/package/prismjs) under the hood.

## Install

PrismJS is required as a peer dependency so you can use the themes and languages provided. 
\`\`\`bash
pnpm install -D @magidoc/plugin-prismjs prismjs @types/prismjs
\`\`\`

For ViteJS users or SvelteKit users, \`prismjs\` needs to be added to the \`noExternal\` dependencies. Here is an example for a \`svelte.config.js\`.

\`\`\`javascript
export default {
  kit: {
    vite: {
      ssr: {
        noExternal: ['prismjs'],
      },
    },
  },
}
\`\`\`

## Usage

The plugin exposes attributes to provide the source and the language. Attributes to display line numbers and a copy button are also available.

\`\`\`svelte
<script lang="ts">
  import Prism from '@magidoc/plugin-prismjs'
<\/script>

<Prism
  language={'javascript}
  source={\`
    const x = 'best plugin ever'
    console.log(x)
  \`}
  showLineNumbers
  showCopyButton
/>

\`\`\`
## Install languages

PrismJS supports a [ton of languages](https://prismjs.com/#supported-languages) out of the box. You can use any of these languages simply by importing the syntax highlighting. Most languages plugins will install themselves automatically, but PrismJS must be imported first.

\`\`\`svelte
<script lang="ts">
  import Prism from '@magidoc/plugin-prismjs'
  import 'prismjs/components/prism-graphql' 
  import 'prism-svelte' // https://github.com/pngwn/prism-svelte
<\/script>
\`\`\`

## Themes

You can modify Prism code sections style simply by importing a stylesheet. PrismJS provides many [themes](https://github.com/PrismJS/prism/tree/master/themes) out of the box that you can easily import. Otherwise, there is a wide variety of themes available on the web and even a [theme generator](https://k88hudson.github.io/syntax-highlighting-theme-generator/www/). 

\`\`\`svelte
<script lang="ts">
  import Prism from '@magidoc/plugin-prismjs'
  import 'prismjs/themes/prism-dark.css'
<\/script>
\`\`\`

> Info: This website uses the PrismJS plugin to display code. If you like the theme used, it is a slightly modified version of the OneDark theme and is available [here](https://github.com/pelletier197/magidoc/blob/main/packages/docs/src/lib/components/common/markdown/prism-theme.css).
`;export{e as default};
