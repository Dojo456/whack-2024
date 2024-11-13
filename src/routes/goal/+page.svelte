<script lang="ts">
	import GoalCard from '$lib/components/GoalCard.svelte';
	import AddGoalModal from './AddGoalModal.svelte';
	import { appState } from '$lib/firebase.svelte';
	import type { Goal } from '$lib/models';
	import { send, receive } from '$lib/transition.svelte';
	import GoalImages from '$lib/components/GoalImages.svelte';

	let goals = $derived<Goal[] | null>(appState.goals);

	let isModalOpen = $state(false);
</script>

{#if goals}
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
{:else if goals === null}
	<div class="error-message">Loading goals...</div>
{:else}
	<div class="error-message">No goals found</div>
{/if}

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

	.progress-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
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
