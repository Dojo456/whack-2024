<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Goal } from '$lib/models';
	import { fade, scale } from 'svelte/transition';
	import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
	import { db, getCurrentUser } from '$lib/firebase.svelte';

	const dispatch = createEventDispatcher();

	let description = '';
	let amount = 0;
	let progress = 0;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const currentUser = getCurrentUser();
		if (!currentUser) {
			console.error('No user logged in');
			return;
		}

		try {
			const userRef = doc(db, 'users', currentUser.uid);
			await updateDoc(userRef, {
				goals: arrayUnion({
					description,
					amount,
					progress,
					animalId: '1'
				})
			});

			dispatch('close');
		} catch (error) {
			console.error('Error adding goal:', error);
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="modal-backdrop"
	onclick={() => dispatch('close')}
	onkeydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('close');
		}
	}}
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
				<input type="number" id="amount" bind:value={amount} min="0" required />
			</div>

			<div class="form-group">
				<label for="progress">Initial Progress</label>
				<input type="number" id="progress" bind:value={progress} min="0" max="100" required />
			</div>

			<div class="button-group">
				<button type="button" class="cancel" onclick={() => dispatch('close')}>Cancel</button>
				<button type="submit" class="submit">Add Goal</button>
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
