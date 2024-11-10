<script lang="ts">
	import { appState } from '$lib/firebase.svelte';
	import type { Goal } from '$lib/models';
	import { getGoalImage } from '$lib/utils';

	const { goals, focused }: { goals: Goal[]; focused?: string } = $props();

	const orderedGoals = $derived<Goal[]>(appState.goals ?? []);

	const center = goals.length % 2 === 0 ? goals.length / 2 : (goals.length - 1) / 2;

	$effect(() => {
		if (focused) {
			const temp = orderedGoals[center];
			const focusedIndex = orderedGoals.findIndex((g) => g.id === focused);
			orderedGoals[center] = goals[focusedIndex];
			orderedGoals[focusedIndex] = temp;
		}
	});
</script>

<div class="goal-image-container">
	{#each orderedGoals as goal, index}
		{@const imageUrl = getGoalImage(goal)}
		<img
			class="goal-image
				{index === center ? '' : 'behind'} 
				{focused && goal.id === focused ? 'focused' : ''}
				{focused && goal.id !== focused ? 'unfocused' : ''}
			"
			src={imageUrl}
			alt={goal.animal.name}
		/>
	{/each}
</div>

<style>
	.goal-image-container {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 12%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.goal-image-container img {
		width: 10rem;
		height: 10rem;
		object-fit: cover;
	}

	.goal-image {
		margin: 0 -1.5rem;
		width: 10rem;
		height: 10rem;
		object-fit: cover;
	}

	.focused {
		transform: scale(1.2);
		transform-origin: bottom;
	}

	.unfocused {
		transform: scale(0.8);
		transform-origin: bottom;
		filter: brightness(0.5);
	}

	.behind {
		z-index: -1;
	}
</style>
