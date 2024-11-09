// place files you want to import through the `$lib` alias in this folder.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, type User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import type { Animal } from './models';
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
	animals: Animal[];
};

let currentUser = $state<UserProfile | null>(null);

export const getCurrentUser = () => currentUser;

export const getUserProfile = async (firebaseUser: User): Promise<UserProfile> => {
	const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
	const data = userDoc.data();

	const animals = data?.animals ?? [];

	const email = firebaseUser.email;
	if (!email) {
		throw new Error('User email is required');
	}

	return {
		uid: firebaseUser.uid,
		email: firebaseUser.email,
		displayName: firebaseUser.displayName,
		animals
	};
};

auth.onAuthStateChanged(async (user) => {
	if (user) {
		currentUser = await getUserProfile(user);
	} else {
		currentUser = null;
	}
});
