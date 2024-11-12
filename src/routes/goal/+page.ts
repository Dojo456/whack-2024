export const load = async ({ parent }) => {
	const { goals } = await parent();
	return { goals };
};
