<script lang="ts">
	import { goto } from '$app/navigation';
	import BlobNav from '$lib/components/BlobNav.svelte';
	import { appState, auth } from '$lib/firebase.svelte';

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
<div class="background">
	<main class="page-container">
		{@render children()}
	</main>
</div>

<style>
	.page-container {
		z-index: 1;
		max-width: 800px;
		margin: 1rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.background {
		background-color: #d5dde0;
		background-image: url('$lib/assets/Floating_island_.jpg');
		background-size: 400%;
		background-position: 50% 0%;
		min-height: 100vh;
		position: relative;
		overflow: hidden;
		overflow-y: hidden;
	}
</style>
