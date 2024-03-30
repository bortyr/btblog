import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
injectSpeedInsights();
inject({ mode: dev ? 'development' : 'production' });

export const prerender = true
export async function load({ url }) {
	return {
		url: url.pathname
	}
}
