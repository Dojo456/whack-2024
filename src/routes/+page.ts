import { appState } from '$lib/firebase.svelte';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (!appState.currentUser) {
		return redirect(302, '/login');
	}
};
