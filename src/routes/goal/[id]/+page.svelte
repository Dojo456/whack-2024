<script lang="ts">
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';

	const animals = {
		chicken: {
			name: 'Chicken',
			description: 'A friendly farm bird that lays eggs daily.',
			stages: [
				{ stage: 1, imageUrl: 'https://placekitten.com/300/300', description: 'Baby chick' },
				{ stage: 2, imageUrl: 'https://placekitten.com/301/301', description: 'Growing chicken' },
				{ stage: 3, imageUrl: 'https://placekitten.com/302/302', description: 'Adult chicken' }
			]
		},
		pig: {
			name: 'Pig',
			description: 'A clever and social farm animal.',
			stages: [
				{ stage: 1, imageUrl: 'https://placekitten.com/303/303', description: 'Piglet' },
				{ stage: 2, imageUrl: 'https://placekitten.com/304/304', description: 'Adult pig' }
			]
		},
		cow: {
			name: 'Cow',
			description: 'A gentle giant that provides milk.',
			stages: [
				{ stage: 1, imageUrl: 'https://placekitten.com/305/305', description: 'Calf' },
				{ stage: 2, imageUrl: 'https://placekitten.com/306/306', description: 'Young cow' },
				{ stage: 3, imageUrl: 'https://placekitten.com/307/307', description: 'Teen cow' },
				{ stage: 4, imageUrl: 'https://placekitten.com/308/308', description: 'Adult cow' }
			]
		}
	};

	const animalName = $page.params.name;
	const animal = animals[animalName as keyof typeof animals];

	if (!animal) {
		throw error(404, 'Animal not found');
	}
</script>

<main>
	<a href="/" class="back-button">← Back to Farm</a>

	<h1>{animal.name}</h1>
	<p class="description">{animal.description}</p>

	<div class="stages-grid">
		{#each animal.stages as { stage, imageUrl, description }}
			<div class="stage-card">
				<img src={imageUrl} alt={`${animal.name} stage ${stage}`} />
				<div class="stage-info">
					<h3>Stage {stage}</h3>
					<p>{description}</p>
				</div>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.back-button {
		display: inline-block;
		margin-bottom: 2rem;
		color: var(--text-secondary);
		text-decoration: none;
		font-weight: 600;
		transition: color 0.3s ease;
	}

	.back-button:hover {
		color: var(--text-primary);
	}

	h1 {
		font-size: 2.5rem;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.description {
		font-size: 1.2rem;
		color: var(--text-secondary);
		margin-bottom: 3rem;
	}

	.stages-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	.stage-card {
		background: var(--background-card);
		border-radius: var(--radius-medium);
		overflow: hidden;
		box-shadow: var(--shadow-soft);
		transition: transform 0.3s ease;
	}

	.stage-card:hover {
		transform: translateY(-5px);
	}

	.stage-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.stage-info {
		padding: 1.5rem;
	}

	.stage-info h3 {
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.stage-info p {
		margin: 0;
		color: var(--text-secondary);
	}
</style>
