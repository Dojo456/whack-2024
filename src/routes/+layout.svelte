<script>
	import '../app.css';
	import '../lib/styles/theme.css';
	import BlobNav from '$lib/components/BlobNav.svelte';
	import { registerListeners } from '$lib/firebase.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		return registerListeners();
	});

	const { children } = $props();
</script>

<BlobNav />

{@render children()}
