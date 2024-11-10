<script lang="ts">
	import type { Goal } from '$lib/models';
	import { getGoalImage } from '$lib/utils';

	const { goal }: { goal: Goal } = $props();
	const imageUrl = $derived<string | undefined>(goal ? getGoalImage(goal) : undefined);
</script>

<a data-sveltekit-preload-data="hover" href="/goal/{goal.id}" class="goal-card">
	<div class="goal-card-content">
		<img src={imageUrl} alt={goal.animal.name} width={100} height={100} />
		<div class="progress-card">
			<h3>{goal.description}</h3>
			<div class="progress-bar-container">
				<div class="progress-bar" style="width: {(goal.progress / goal.amount) * 100}%"></div>
			</div>
			<span class="progress-text">
				${goal.progress} out of ${goal.amount}
			</span>
		</div>
	</div>
</a>

<style>
	.goal-card-content {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.goal-card {
		display: block;
		text-decoration: none;
		background: var(--background-card);
		border-radius: var(--radius-medium);
		box-shadow: var(--shadow-soft);
		overflow: hidden;
		transition: all 0.3s ease;
		animation: float 6s ease-in-out infinite;
	}

	.goal-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-hover);
	}

	h3 {
		margin: 0 0 1rem 0;
		font-size: 1.4rem;
		color: var(--text-primary);
		font-weight: 700;
	}

	.progress-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.9);
		flex-grow: 1;
		padding: 0.5rem;
		border-radius: 25px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
		transition: transform 0.2s ease;
		backdrop-filter: blur(5px);
	}

	.progress-card:hover {
		transform: translateY(-2px);
	}

	h3 {
		color: #7fb883;
		margin-bottom: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.progress-bar-container {
		background-color: #f0f9f0;
		border-radius: 30px;
		height: 15px;
		overflow: hidden;
		position: relative;
	}

	.progress-bar {
		background-color: #9ed4a2;
		height: 100%;
		border-radius: 30px;
		transition: width 0.5s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.progress-text {
		color: var(--text-primary);
		font-size: 1.2rem;
		font-weight: 600;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}
</style>
