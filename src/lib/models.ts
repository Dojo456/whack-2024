export type Animal = {
	name: string;
	goalDescription: string;
	goal: number;
	progress: number;
	completed: boolean;
	stages: { [progressPercent: number]: AnimalStage };
};

export type AnimalStage = {
	imageUrl: string;
	description: string;
};
