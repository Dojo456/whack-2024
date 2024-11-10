<script lang="ts">
	import GoalCard from '$lib/components/GoalCard.svelte';
	import { appState } from '$lib/firebase.svelte';
	import '../../lib/styles/theme.css';

	const completedGoals = $derived(appState.currentUser?.goals ?? []);
</script>

<main>
	<h1>Your Animal Gallery</h1>
	<p class="subtitle">Celebrate your farming achievements!</p>

	<div class="gallery-grid">
		{#each completedGoals as goal}
			<div class="achievement-card">
				<GoalCard {goal} />
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

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		animation: fadeIn 0.6s ease-out;
	}

	.achievement-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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

	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
