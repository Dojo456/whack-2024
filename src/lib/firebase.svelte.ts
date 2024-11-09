// place files you want to import through the `$lib` alias in this folder.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, type User } from 'firebase/auth';
import {
	arrayUnion,
	doc,
	getDoc,
	getFirestore,
	onSnapshot,
	setDoc,
	updateDoc
} from 'firebase/firestore';
import type { Animal, GoalDocument, UserProfile, UserProfileDocument } from './models';
import { writable } from 'svelte/store';
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

export const currentUser = writable<UserProfile | null>(null);

const animals: { [id: string]: Animal } = {
	'1': {
		name: 'Blob',
		id: '1',
		imageUrl: '/images/blob.png',
		stages: {}
	}
};

const getUserProfile = async (firebaseUser: User) => {
	const userRef = doc(db, 'users', firebaseUser.uid);
	const userDoc = await getDoc(userRef);

	if (!userDoc.exists()) {
		await setDoc(userRef, {
			uid: firebaseUser.uid,
			email: firebaseUser.email,
			displayName: firebaseUser.displayName,
			goals: []
		});
	}

	const data = userDoc.data();
	setCurrentUser(data as UserProfileDocument);
};

const setCurrentUser = (data: UserProfileDocument) => {
	const goals =
		data?.goals.map((goal: GoalDocument) => {
			return {
				...goal,
				animal: animals[goal.animalId]
			};
		}) ?? [];

	const email = data.email;
	if (!email) {
		throw new Error('User email is required');
	}

	currentUser.set({
		uid: data.uid,
		email: data.email,
		displayName: data.displayName,
		goals
	});
};

export const addGoal = async (goal: GoalDocument): Promise<void> => {
	const result = new Promise<void>((resolve, reject) => {
		const unsubscribe = currentUser.subscribe(async (user) => {
			if (!user) {
				reject(new Error('No user logged in'));
				return;
			}

			const userRef = doc(db, 'users', user.uid);
			await updateDoc(userRef, {
				goals: arrayUnion({
					...goal,
					animalId: goal.animalId
				})
			});

			resolve();
			unsubscribe();
		});
	});

	return result;
};

export const registerListeners = () => {
	let unsubscribe: () => void;

	auth.onAuthStateChanged(async (user) => {
		if (user) {
			await getUserProfile(user);

			unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
				setCurrentUser(snapshot.data() as UserProfileDocument);
			});
		} else {
			currentUser.set(null);
			unsubscribe?.();
		}
	});
};
