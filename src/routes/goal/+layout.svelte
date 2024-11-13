<script lang="ts">
	import { goto } from '$app/navigation';
	import BlobNav from '$lib/components/BlobNav.svelte';
	import { appState, auth } from '$lib/firebase.svelte';
	import background from '$lib/assets/Floating_island_.jpg';

	const { children } = $props();

	$effect(() => {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				goto('/login');
			}
		});
	});
</script>

<BlobNav />
<div class="background-container">
	<img class="background" src={background} alt="background" />
</div>
<main class="page-container">
	{@render children()}
</main>

<style>
	.page-container {
		z-index: 1;
		margin: 1rem;
		position: fixed;
		overflow-y: hidden;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.background-container {
		position: fixed;
		bottom: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.background {
		height: 100%;
	}
</style>
