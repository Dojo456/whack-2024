<script lang="ts">
	import { appState } from '$lib/firebase.svelte';
	import type { Goal } from '$lib/models';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { send, receive } from '$lib/transition.svelte';
	import { getGoalImage } from '$lib/utils';
	import GoalImages from '$lib/components/GoalImages.svelte';

	onMount(() => {
		window.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				goto('/goal');
			}
		});
	});

	const goalId = $page.params.id;
	const goals = $derived<Goal[]>(appState.goals);
	const goal = $derived<Goal | undefined>(goals.find((g) => g.id === goalId));

	const imageUrl = $derived<string | undefined>(goal ? getGoalImage(goal) : undefined);
</script>

<main class="page-container">
	<a
		data-sveltekit-preload-data="hover"
		href="/goal"
		class="page-back-link"
		aria-label="Back to goals"
	>
	</a>

	{#if goal}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="goal-detail-card"
			onclick={(event) => {
				event.stopPropagation();
			}}
			in:receive={{ key: 'goal' }}
			out:send={{ key: 'goal' }}
		>
			<button class="back-button" onclick={() => goto('/goal')} aria-label="Back to goals">
				← All Goals
			</button>
			<div class="header">
				<img src={imageUrl} alt={goal.animal.name} />
				<h1>{goal.description}</h1>
			</div>

			<div class="progress-section">
				<div class="progress-bar-container">
					<div class="progress-bar" style="width: {goal.progress}%"></div>
				</div>
				<span class="progress-text">
					${goal.progress} out of ${goal.amount}
				</span>
			</div>

			<div class="details-section">
				<div class="detail-item">
					<h3>Deadline</h3>
					<p>{new Date(goal.deadline).toLocaleDateString()}</p>
				</div>
			</div>
		</div>

		<GoalImages {goals} focused={goal} />
	{:else if goal === null}
		<div class="error-message">Goal not found</div>
	{:else}
		<div class="error-message">Loading goal...</div>
	{/if}
</main>

<style>
	.page-back-link {
		text-decoration: none;
		color: var(--text-primary);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
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

	.goal-detail-card {
		background: var(--background-card);
		border-radius: var(--radius-medium);
		box-shadow: var(--shadow-soft);
		padding: 2rem;
		position: relative;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.header img {
		width: 150px;
		height: 150px;
		object-fit: cover;
		border-radius: var(--radius-medium);
	}

	h1 {
		color: var(--text-primary);
		font-size: 2rem;
		margin: 0;
		font-weight: 800;
	}

	.progress-section {
		margin: 2rem 0;
	}

	.progress-bar-container {
		background-color: #f0f9f0;
		border-radius: 30px;
		height: 20px;
		overflow: hidden;
		position: relative;
		margin-bottom: 1rem;
	}

	.progress-bar {
		background-color: #9ed4a2;
		height: 100%;
		border-radius: 30px;
		transition: width 0.5s ease-in-out;
	}

	.progress-text {
		color: var(--text-primary);
		font-size: 1.2rem;
		font-weight: 600;
	}

	.details-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.detail-item {
		background: rgba(255, 255, 255, 0.9);
		padding: 1.5rem;
		padding-bottom: 0;
		border-radius: var(--radius-small);
		backdrop-filter: blur(5px);
	}

	.detail-item h3 {
		color: #7fb883;
		margin: 0 0 0.5rem 0;
		font-size: 1.2rem;
	}

	.detail-item p {
		color: var(--text-primary);
		font-size: 1.1rem;
		margin: 0;
		font-weight: 600;
	}

	.error-message {
		text-align: center;
		color: var(--text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		padding: 2rem;
		background: var(--background-card);
		border-radius: var(--radius-medium);
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

	.back-button {
		position: absolute;
		left: 0.5rem;
		top: 0.5rem;
		background: var(--background-card);
		border: none;
		border-radius: var(--radius-small);
		padding: 0.5rem 1rem;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--text-primary);
		transition: transform 0.2s;
		z-index: 1;
	}

	.back-button:hover {
		transform: scale(1.1);
	}
</style>
