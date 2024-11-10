<script lang="ts">
	import type { Goal } from '$lib/models';
	import { getGoalImage } from '$lib/utils';

	const { goals, focused }: { goals: Goal[]; focused?: Goal } = $props();

	const orderedGoals = [...goals];

	const center = goals.length % 2 === 0 ? goals.length / 2 : (goals.length - 1) / 2;

	if (focused) {
		const temp = orderedGoals[center];
		const focusedIndex = orderedGoals.indexOf(focused);
		orderedGoals[center] = focused;
		orderedGoals[focusedIndex] = temp;
	}
</script>

<div class="goal-image-container">
	{#each orderedGoals as goal, index}
		{@const imageUrl = getGoalImage(goal)}
		<img
			width={100}
			height={100}
			class="goal-image
				{index === center ? '' : 'behind'} 
				{focused && goal === focused ? 'focused' : ''}
				{focused && goal !== focused ? 'unfocused' : ''}
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
