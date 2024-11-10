import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { appState } from '$lib/firebase.svelte';

export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const goal = appState.goals.find((goal) => goal.id === id);

	if (!goal) {
		throw error(404, 'Goal not found');
	}
};
