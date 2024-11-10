<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase.svelte';
	import type { FirebaseError } from 'firebase/app';
	import { createUserWithEmailAndPassword } from 'firebase/auth';

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	let loading = $state(false);
	let error = $state<string | null>(null);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		try {
			loading = true;
			await createUserWithEmailAndPassword(auth, email, password);

			goto('/goal');
		} catch (reason) {
			error = (reason as FirebaseError).message;
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<div class="signup-container">
		<h1>Create Account</h1>
		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" id="email" bind:value={email} required />
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" id="password" bind:value={password} required />
			</div>

			<div class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" id="confirmPassword" bind:value={confirmPassword} required />
			</div>

			<button type="submit" disabled={loading}>
				{loading ? 'Creating Account...' : 'Sign Up'}
			</button>

			{#if error}
				<p class="error">{error}</p>
			{/if}

			<p class="login-link">
				Already have an account? <a href="/login">Log in</a>
			</p>
		</form>
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.signup-container {
		background: var(--background-card);
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem;
		border-radius: var(--radius-medium);
		box-shadow: var(--shadow-soft);
		animation: float 6s ease-in-out infinite;
	}

	h1 {
		color: var(--text-primary);
		font-size: 2rem;
		margin: 0 0 1.5rem 0;
		text-align: center;
		font-weight: 800;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.error {
		color: red;
		font-weight: 600;
		text-align: center;
		margin: 1rem 0;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
		font-weight: 600;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid var(--background-primary);
		border-radius: var(--radius-small);
		background: var(--background-primary);
		color: var(--text-primary);
		transition: border-color 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: var(--pastel-blue);
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: var(--matcha-green);
		color: white;
		border: none;
		border-radius: var(--radius-small);
		cursor: pointer;
		font-weight: 700;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	button:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-hover);
	}

	.login-link {
		text-align: center;
		margin-top: 1rem;
		color: var(--text-secondary);
	}

	.login-link a {
		color: var(--matcha-green);
		text-decoration: none;
		font-weight: 600;
	}

	.login-link a:hover {
		text-decoration: underline;
	}

	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-5px);
		}
		100% {
			transform: translateY(0px);
		}
	}
</style>
