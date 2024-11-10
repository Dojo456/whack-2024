<script lang="ts">
	import GoalCard from '$lib/components/GoalCard.svelte';
	import AddGoalModal from '$lib/components/AddGoalModal.svelte';
	import { appState } from '$lib/firebase.svelte';
	import type { Goal } from '$lib/models';
	import { send, receive } from '$lib/transition.svelte';
	import GoalImages from '$lib/components/GoalImages.svelte';

	let goals = $derived<Goal[]>(appState.goals ?? []);

	$inspect(goals);

	let isModalOpen = $state(false);
</script>

<main class="page-container">
	<div class="progress-container">
		{#each goals as goal}
			<div in:receive={{ key: 'goal' }} out:send={{ key: 'goal' }}>
				<GoalCard {goal} />
			</div>
		{/each}

		{#if goals.length < 3}
			<div class="add-button-container">
				<button class="add-button" onclick={() => (isModalOpen = true)}>Add New Goal</button>
			</div>
		{/if}
	</div>

	<GoalImages {goals} />
</main>

{#if isModalOpen}
	<AddGoalModal close={() => (isModalOpen = false)} />
{/if}

<style>
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
		z-index: 1;
		max-width: 800px;
		margin: 1rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.progress-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
		max-width: 600px;
	}

	.add-button-container {
		display: flex;
		justify-content: center;
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
	}

	.add-button:hover {
		background-color: #6ca770;
	}
</style>
