<script>
	import '../app.css';
	import '../lib/styles/theme.css';
	import BlobNav from '$lib/components/BlobNav.svelte';
	import { auth, registerListeners } from '$lib/firebase.svelte';
	import { onMount } from 'svelte';
	import { browserLocalPersistence } from 'firebase/auth';

	onMount(() => {
		auth.setPersistence(browserLocalPersistence);
		return registerListeners();
	});

	const { children } = $props();
</script>

<BlobNav />

{@render children()}
