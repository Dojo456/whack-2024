export type Goal = {
	description: string;
	amount: number;
	progress: number;
	animal: Animal;
};

export type Animal = {
	name: string;
	id: string;
	imageUrl: string;
	stages: { [progressPercent: number]: AnimalStage };
};

export type AnimalStage = {
	imageUrl: string;
	description: string;
};
