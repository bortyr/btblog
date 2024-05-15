<script lang="ts">
	import { formatDate } from '$lib/utils'

	export let data
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

  <!-- Post -->
	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
		text-align:justify;
	}

	h1 {
		text-transform: capitalize;
		margin-inline: auto;
		max-inline-size: var(--size-content-3);
		font-size: xx-large;
		text-align:center;
	}

	h1 + p {
		margin-top: var(--size-3);
		color: var(--text-2);
	}

</style>
