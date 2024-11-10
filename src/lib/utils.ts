import type { Goal } from './models';

export function getGoalImage(goal: Goal) {
	if (!goal) return '';

	const progress = goal.progress / goal.amount;

	const stages = Object.entries(goal.animal.stages);
	stages.sort((a, b) => Number(a[0]) - Number(b[0]));

	let imageUrl: string | null = null;

	stages.forEach(([progressPercent, stage]) => {
		if (progress >= Number(progressPercent)) {
			imageUrl = stage.imageUrl;
		}
	});

	return imageUrl ?? '';
}
