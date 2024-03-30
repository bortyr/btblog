//import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex, escapeSvelte } from 'mdsvex'
import { getHighlighter } from 'shiki'
import { addCopyButton } from 'shiki-transformer-copy-button'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: './src/mdsvex.svelte'
	},
		highlight: {
			highlighter: async (code, lang = 'text') => {
				const highlighter = await getHighlighter({
				// check this out ! https://shikijs.github.io/twoslash/
					themes: ['dark-plus'],
					langs: ['javascript', 'typescript', 'rust']
				})
				await highlighter.loadLanguage('javascript', 'typescript', 'rust')
				const html = escapeSvelte(highlighter.codeToHtml(code, { 
						lang, 
						theme: 'dark-plus', 
				    transformers: [
				      addCopyButton(code)
						]
				}))
				return `{@html \`${html}\` }`
			}
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
}

export default config
