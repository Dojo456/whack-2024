<script lang="ts">
	import { appState, updateGoal } from '$lib/firebase.svelte';
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
	const goals = $derived<Goal[] | null>(appState.goals);
	const goal = $derived<Goal | undefined>(goals ? goals.find((g) => g.id === goalId) : undefined);

	const imageUrl = $derived<string | undefined>(goal ? getGoalImage(goal) : undefined);

	$effect(() => {
		if (!goal || goal.progress >= goal.amount) {
			goto('/goal');
		}
	});

	async function handleDeposit(amount: number) {
		if (!goal) return;

		const newProgress = Math.min(goal.progress + amount, goal.amount);
		await updateGoal(goal.id, { progress: newProgress });
	}

	async function handleCustomDeposit() {
		if (!goal) return;

		const amount = prompt('Enter deposit amount:');
		if (!amount) return;

		const depositAmount = parseFloat(amount);
		if (isNaN(depositAmount) || depositAmount <= 0) {
			alert('Please enter a valid amount');
			return;
		}

		await handleDeposit(depositAmount);
	}
</script>

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
				<div class="progress-bar" style="width: {(goal.progress / goal.amount) * 100}%"></div>
			</div>
			<span class="progress-text">
				${goal.progress} out of ${goal.amount}
			</span>

			<div class="deposit-buttons">
				<button class="deposit-btn" onclick={() => handleDeposit(5)}>+$5</button>
				<button class="deposit-btn" onclick={() => handleDeposit(10)}>+$10</button>
				<button class="deposit-btn" onclick={() => handleDeposit(20)}>+$20</button>
				<button class="deposit-btn custom" onclick={() => handleCustomDeposit()}
					>Custom Amount</button
				>
			</div>
		</div>

		<div class="details-section">
			<div class="detail-item">
				<h3>Deadline</h3>
				<p>{new Date(goal.deadline).toLocaleDateString()}</p>
			</div>
		</div>
	</div>

	{#if goals}
		<GoalImages {goals} focused={goal.id} />
	{:else if goal === null}
		<div class="error-message">Loading goal...</div>
	{:else}
		<div class="error-message">Goal not found</div>
	{/if}
{/if}

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
		margin-top: 1.5rem;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.header img {
		width: 150px;
		height: 150px;
		object-fit: cover;
		border-radius: var(--radius-medium);
		background: lightgray;
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

	.deposit-buttons {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.deposit-btn {
		background: var(--background-card);
		border: 2px solid #9ed4a2;
		border-radius: var(--radius-small);
		padding: 0.5rem 1rem;
		font-size: 1.1rem;
		cursor: pointer;
		color: var(--text-primary);
		transition: all 0.2s;
	}

	.deposit-btn:active {
		background: #9ed4a2;
		color: white;
		transform: translateY(-2px);
	}

	.deposit-btn.custom {
		background: transparent;
		border: 2px dashed #9ed4a2;
	}
</style>
