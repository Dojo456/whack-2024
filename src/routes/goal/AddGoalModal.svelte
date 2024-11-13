<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { addGoal } from '$lib/firebase.svelte';
	import { onMount } from 'svelte';
	import { Timestamp } from 'firebase/firestore';

	const { close } = $props<{ close: () => void }>();

	let description = $state('');
	let amount = $state(1);
	let deadline = $state(new Date().toISOString().split('T')[0]);

	onMount(() => {
		const unsubscribe = document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				close();
			}
		});

		return unsubscribe;
	});

	let isLoading = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		try {
			await addGoal({
				description,
				amount,
				deadline: Timestamp.fromDate(new Date(deadline)),
				progress: 0,
				animalId: '1'
			});

			close();
		} catch (error) {
			console.error('Error adding goal:', error);
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="modal-backdrop"
	onclick={() => close()}
	role="dialog"
	transition:fade={{ duration: 200 }}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="modal"
		aria-modal="true"
		transition:scale={{ duration: 200, start: 0.95 }}
		onclick={(event) => event.stopPropagation()}
	>
		<h2>Add New Goal</h2>
		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="description">Description</label>
				<input type="text" id="description" bind:value={description} required />
			</div>

			<div class="form-group">
				<label for="amount">Target Amount</label>
				<input type="number" id="amount" bind:value={amount} min="1" required />
			</div>

			<div class="form-group">
				<label for="deadline">Deadline</label>
				<input type="date" id="deadline" bind:value={deadline} required />
			</div>

			<div class="button-group">
				<button type="button" class="cancel" onclick={close}>Cancel</button>
				<button type="submit" class="submit" disabled={isLoading}>
					{isLoading ? 'Adding...' : 'Add Goal'}
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		width: 90%;
		max-width: 500px;
	}

	h2 {
		color: #7fb883;
		margin-bottom: 1.5rem;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: #666;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 1.5rem;
	}

	button {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: none;
		cursor: pointer;
	}

	.cancel {
		background-color: #f1f1f1;
		color: #666;
	}

	.submit {
		background-color: #7fb883;
		color: white;
	}

	.submit:hover {
		background-color: #6ca770;
	}
</style>
