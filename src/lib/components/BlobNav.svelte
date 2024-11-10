<script lang="ts">
	import { auth } from '$lib/firebase.svelte';
	import { goto } from '$app/navigation';

	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const handleClickOutside = (event: MouseEvent) => {
		const nav = (event.target as HTMLElement).closest('.nav-container');
		if (!nav) {
			isMenuOpen = false;
		}
	};

	async function handleSignOut() {
		try {
			await auth.signOut();
			goto('/login');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="nav-container">
	<button class="blob-button" onclick={toggleMenu}> Menu </button>

	{#if isMenuOpen}
		<nav class="menu">
			<a href="/goal" class="menu-item">Your Goals</a>
			<button class="menu-item sign-out" onclick={handleSignOut}>Sign Out</button>
		</nav>
	{/if}
</div>

<style>
	.nav-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
	}

	.blob-button {
		background: white;
		border: 1px solid var(--background-primary);
		cursor: pointer;
		padding: 0.8rem 1.2rem;
		transition: transform 0.3s ease;
		z-index: 1001;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 25px;
	}

	.blob-button:hover {
		transform: scale(1.1);
	}

	.menu {
		position: absolute;
		bottom: 60px;
		right: 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(5px);
		padding: 1rem;
		border-radius: 20px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 150px;
		animation: popIn 0.3s ease-out;
	}

	.menu-item {
		font-family: 'Nunito', sans-serif;
		color: #7fb883;
		text-decoration: none;
		padding: 0.8rem 1.2rem;
		border-radius: 15px;
		transition: all 0.2s ease;
		font-size: 1.1rem;
		font-weight: 600;
		text-align: center;
		border: none;
		background: none;
		cursor: pointer;
	}

	.menu-item:hover {
		background: #e8f5e9;
		transform: scale(1.05);
	}

	.sign-out {
		color: #ff6b6b;
		margin-top: 0.5rem;
		border-top: 1px solid #eee;
	}

	.sign-out:hover {
		background: #ffe5e5;
	}

	@keyframes popIn {
		0% {
			opacity: 0;
			transform: translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.blob-button {
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	/* Responsive design for mobile */
	@media (max-width: 768px) {
		.nav-container {
			bottom: 15px;
			right: 15px;
		}

		.menu {
			bottom: 45px;
			min-width: 130px;
		}

		.menu-item {
			padding: 0.6rem 1rem;
			font-size: 1rem;
		}
	}

	/* Even smaller for very small screens */
	@media (max-width: 360px) {
		.blob-icon {
			width: 30px;
			height: 30px;
		}

		.menu {
			bottom: 40px;
			min-width: 120px;
		}

		.menu-item {
			padding: 0.5rem 0.8rem;
			font-size: 0.9rem;
		}
	}
</style>
