// place files you want to import through the `$lib` alias in this folder.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, type User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import type { Animal, Goal } from './models';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDQrfMgZBVVvvbZ8KKqEH7wfPDiBAyn_ok',
	authDomain: 'whack-2024.firebaseapp.com',
	projectId: 'whack-2024',
	storageBucket: 'whack-2024.firebasestorage.app',
	messagingSenderId: '646928533019',
	appId: '1:646928533019:web:669a1296d02fd50d599abe'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export type UserProfile = {
	uid: string;
	email: string;
	displayName: string | null;
	goals: Goal[];
};

let currentUser = $state<UserProfile | null>(null);

export const getCurrentUser = () => currentUser;

const animals: { [id: string]: Animal } = {
	'1': {
		name: 'Blob',
		id: '1',
		imageUrl: '/images/blob.png',
		stages: {}
	}
};

export type GoalDocument = {
	description: string;
	amount: number;
	progress: number;
	animalId: string;
};

export const getUserProfile = async (firebaseUser: User): Promise<UserProfile> => {
	const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
	const data = userDoc.data();

	const goals =
		data?.goals.map((goal: GoalDocument) => {
			return {
				...goal,
				animal: animals[goal.animalId]
			};
		}) ?? [];

	const email = firebaseUser.email;
	if (!email) {
		throw new Error('User email is required');
	}

	return {
		uid: firebaseUser.uid,
		email: firebaseUser.email,
		displayName: firebaseUser.displayName,
		goals
	};
};

auth.onAuthStateChanged(async (user) => {
	if (user) {
		currentUser = await getUserProfile(user);
	} else {
		currentUser = null;
	}
});
