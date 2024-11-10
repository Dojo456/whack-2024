<script lang="ts">
	import GoalCard from '$lib/components/GoalCard.svelte';
	import AddGoalModal from '$lib/components/AddGoalModal.svelte';
	import { appState } from '$lib/firebase.svelte';
	import type { Goal } from '$lib/models';

	let goals = $derived<Goal[]>(appState.currentUser?.goals ?? []);

	let isModalOpen = $state(false);
</script>

<div class="background">
	<div class="page-container">
		<h1 class="main-heading">Current Blobs</h1>
		<div class="progress-container">
			<button class="add-button" onclick={() => (isModalOpen = true)}>Add New Blob</button>
			{#each goals as goal}
				<GoalCard {goal} />
			{/each}
		</div>
	</div>
</div>

{#if isModalOpen}
	<AddGoalModal on:close={() => (isModalOpen = false)} />
{/if}

<style>
	.background {
		background-color: #e8f5e9;
		min-height: 100vh;
		position: relative;
		overflow: hidden;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(30px, -30px) rotate(5deg);
		}
		66% {
			transform: translate(-20px, 20px) rotate(-5deg);
		}
	}

	.page-container {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.main-heading {
		text-align: center;
		color: #7fb883;
		font-size: 3.5rem;
		margin-bottom: 2.5rem;
		font-weight: 700;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.progress-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1.5rem;
		margin: 0 auto;
		width: 100%;
		max-width: 600px;
	}

	@media (max-width: 600px) {
		.page-container {
			margin: 1rem auto;
		}

		.main-heading {
			font-size: 2.5rem;
			margin-bottom: 2rem;
		}

		.progress-container {
			padding: 1rem;
			gap: 1.5rem;
		}
	}

	.add-button {
		background-color: #7fb883;
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: background-color 0.2s;
		align-self: center;
		margin-bottom: 1rem;
	}

	.add-button:hover {
		background-color: #6ca770;
	}
</style>
