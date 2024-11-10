<script lang="ts">
	let isMenuOpen = false;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const handleClickOutside = (event: MouseEvent) => {
		const nav = (event.target as HTMLElement).closest('.nav-container');
		if (!nav) {
			isMenuOpen = false;
		}
	};
</script>

<svelte:window on:click={handleClickOutside} />

<div class="nav-container">
	<button class="blob-button" on:click={toggleMenu}>
		<svg viewBox="0 0 50 50" class="blob-icon">
			<circle cx="25" cy="25" r="23" fill="#9ed4a2" />
			<!-- Eyes -->
			<circle cx="18" cy="22" r="4" fill="white" />
			<circle cx="32" cy="22" r="4" fill="white" />
			<circle cx="18" cy="22" r="2" fill="black" />
			<circle cx="32" cy="22" r="2" fill="black" />
			<!-- Smile -->
			<path
				d="M 15 28 Q 25 38 35 28"
				fill="none"
				stroke="white"
				stroke-width="3"
				stroke-linecap="round"
			/>
		</svg>
	</button>

	{#if isMenuOpen}
		<nav class="menu">
			<a href="/new" class="menu-item">New</a>
			<a href="/goal" class="menu-item">Current</a>
			<a href="/gallery" class="menu-item">Gallery</a>
			<a href="/options" class="menu-item">Options</a>
		</nav>
	{/if}
</div>

<style>
	.nav-container {
		position: fixed;
		top: 20px;
		left: 20px;
		z-index: 1000;
	}

	.blob-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: transform 0.3s ease;
		z-index: 1001;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.blob-icon {
		width: 50px;
		height: 50px;
	}

	.blob-button:hover {
		transform: scale(1.1);
	}

	.menu {
		position: absolute;
		top: 60px;
		left: 0;
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
	}

	.menu-item:hover {
		background: #e8f5e9;
		transform: scale(1.05);
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
			top: 15px;
			left: 15px;
		}

		.blob-icon {
			width: 35px; /* Smaller size for mobile */
			height: 35px;
		}

		.menu {
			top: 45px; /* Adjusted to match smaller icon */
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
			top: 40px;
			min-width: 120px;
		}

		.menu-item {
			padding: 0.5rem 0.8rem;
			font-size: 0.9rem;
		}
	}
</style>
