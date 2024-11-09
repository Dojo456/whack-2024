<script lang="ts">
	import AnimalCard from '$lib/components/AnimalCard.svelte';
	import '../lib/styles/theme.css';

	const animals = [
		{
			name: 'Chicken',
			stages: [
				{ stage: 1, imageUrl: 'https://placekitten.com/300/300' },
				{ stage: 2, imageUrl: 'https://placekitten.com/301/301' },
				{ stage: 3, imageUrl: 'https://placekitten.com/302/302' }
			]
		},
		{
			name: 'Pig',
			stages: [
				{ stage: 1, imageUrl: 'https://placekitten.com/303/303' },
				{ stage: 2, imageUrl: 'https://placekitten.com/304/304' }
			]
		},
		{
			name: 'Cow',
			stages: [
				{ stage: 1, imageUrl: 'https://placekitten.com/305/305' },
				{ stage: 2, imageUrl: 'https://placekitten.com/306/306' },
				{ stage: 3, imageUrl: 'https://placekitten.com/307/307' },
				{ stage: 4, imageUrl: 'https://placekitten.com/308/308' }
			]
		}
	];
</script>

<main>
	<h1>Growing Farm Friends</h1>
	<p class="subtitle">Watch our adorable animals grow day by day!</p>

	<div class="grid">
		{#each animals as animal}
			{#each animal.stages as { stage, imageUrl }}
				<AnimalCard name={animal.name} {stage} {imageUrl} maxStage={animal.stages.length} />
			{/each}
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		color: var(--text-primary);
		font-size: 2.5rem;
		margin: 2rem 0 0.5rem;
		font-weight: 800;
	}

	.subtitle {
		text-align: center;
		color: var(--text-secondary);
		font-size: 1.1rem;
		margin-bottom: 3rem;
	}

	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
		animation: fadeIn 0.6s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
