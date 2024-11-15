<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { auth } from '$lib/firebase.svelte';
	import type { FirebaseError } from 'firebase/app';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let email = $state('');
	let password = $state('');

	let loading = $state(false);
	let error = $state<string | null>(null);

	$inspect(error);

	const from = $page.url.searchParams.get('from') ?? '/goal';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		try {
			loading = true;
			await signInWithEmailAndPassword(auth, email, password);

			goto(from);
		} catch (reason) {
			error = (reason as FirebaseError).message;
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<div class="login-container">
		<h1>Login</h1>
		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" id="email" bind:value={email} required />
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" id="password" bind:value={password} required />
			</div>

			<button type="submit" disabled={loading}>
				{loading ? 'Loading...' : 'Log In'}
			</button>

			<p class="error">{error}</p>

			<p class="signup-link">
				Need an account? <a href="/signup">Sign up</a>
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

	.login-container {
		background: var(--background-card);
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem;
		border-radius: var(--radius-medium);
		box-shadow: var(--shadow-soft);
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

	.signup-link {
		text-align: center;
		margin-top: 1rem;
		color: var(--text-secondary);
	}

	.signup-link a {
		color: var(--matcha-green);
		text-decoration: none;
		font-weight: 600;
	}

	.signup-link a:hover {
		text-decoration: underline;
	}
</style>
