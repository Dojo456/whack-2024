import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const validAnimals = ['chicken', 'pig', 'cow'];

	if (!validAnimals.includes(params.name.toLowerCase())) {
		throw error(404, 'Animal not found');
	}

	return {
		name: params.name
	};
};
