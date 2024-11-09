export type UserProfile = {
	uid: string;
	email: string;
	displayName: string | null;
	goals: Goal[];
};

export type UserProfileDocument = {
	uid: string;
	email: string;
	displayName: string | null;
	goals: GoalDocument[];
};

export type Goal = {
	description: string;
	amount: number;
	progress: number;
	deadline: Date;
	animal: Animal;
};

export type GoalDocument = {
	description: string;
	amount: number;
	progress: number;
	deadline: Date;
	animalId: string;
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
