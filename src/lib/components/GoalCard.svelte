<script lang="ts">
	import type { Goal } from '$lib/models';

	const { goal }: { goal: Goal } = $props();

	const animal = goal.animal;
</script>

<a href="/goal/{animal.id}" class="goal-card">
	<div class="progress-card">
		<h3>{goal.description}</h3>
		<div class="progress-bar-container">
			<div class="progress-bar" style="width: {goal.progress}%">
				<span class="progress-text">
					{goal.progress}%
				</span>
			</div>
		</div>
	</div>
</a>

<style>
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
		background-color: rgba(255, 255, 255, 0.9);
		padding: 1.5rem;
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
		margin-bottom: 1rem;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.progress-bar-container {
		background-color: #f0f9f0;
		border-radius: 30px;
		height: 35px;
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
		color: #ffffff;
		font-size: 1.2rem;
		font-weight: 600;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}
</style>
