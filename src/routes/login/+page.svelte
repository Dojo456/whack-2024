<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { auth } from '$lib/firebase.svelte';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let email = $state('');
	let password = $state('');

	const from = $page.url.searchParams.get('from') ?? '/current';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		try {
			await signInWithEmailAndPassword(auth, email, password);

			goto(from);
		} catch (error) {
			console.error('Login failed:', error);
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

			<button type="submit">Log In</button>
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
