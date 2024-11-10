// place files you want to import through the `$lib` alias in this folder.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, type User } from 'firebase/auth';
import {
	doc,
	getDoc,
	getFirestore,
	onSnapshot,
	setDoc,
	collection,
	arrayUnion,
	updateDoc,
	getDocs,
	where,
	query,
	documentId
} from 'firebase/firestore';
import type {
	Animal,
	GoalDocument,
	UserProfileDocument,
	UserProfile,
	Goal,
	GoalDocumentWithID
} from './models';
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
export const app = $state(initializeApp(firebaseConfig));
export const db = $state(getFirestore(app));
export const auth = $state(getAuth(app));

export const appState = $state<{ currentUser: UserProfile | null; goals: Goal[] }>({
	currentUser: null,
	goals: []
});

import image0 from '$lib/assets/image0.png';
import image1 from '$lib/assets/image1.png';
import image2 from '$lib/assets/image2.png';
import image3 from '$lib/assets/image3.png';

const animals: { [id: string]: Animal } = {
	'1': {
		name: 'Tree',
		id: '1',
		stages: {
			0: {
				imageUrl: image0,
				description: 'Blob'
			},
			0.33: {
				imageUrl: image1,
				description: 'Blob'
			},
			0.66: {
				imageUrl: image2,
				description: 'Blob'
			},
			1: {
				imageUrl: image3,
				description: 'Blob'
			}
		}
	}
};

const syncUserProfile = async (firebaseUser: User) => {
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

const syncUserGoals = async (data?: UserProfileDocument): Promise<void> => {
	const goalsIDs = data?.goals ?? appState.currentUser?.goals ?? [];

	if (goalsIDs.length === 0) {
		setGoals([]);
		return;
	}

	const goalsCollection = collection(db, 'goals');

	const goalDocsNoID = await getDocs(
		query(
			goalsCollection,
			where(
				documentId(),
				'in',
				goalsIDs.map((id) => id.toString())
			)
		)
	);

	const goalDocs: GoalDocumentWithID[] = goalDocsNoID.docs.map((doc) => {
		const goal = doc.data() as GoalDocumentWithID;
		goal.id = doc.id;

		return goal;
	});

	setGoals(goalDocs);
};

const setCurrentUser = (data: UserProfileDocument) => {
	const email = data.email;
	if (!email) {
		throw new Error('User email is required');
	}

	appState.currentUser = data;
};

const setGoals = (goals: GoalDocumentWithID[]) => {
	appState.goals = goals.map((goalDoc) => {
		const animal = animals[goalDoc.animalId];
		const goal: Goal = {
			id: goalDoc.id,
			animal,
			description: goalDoc.description,
			progress: goalDoc.progress,
			amount: goalDoc.amount,
			deadline: goalDoc.deadline.toDate()
		};

		return goal;
	});
};

export const updateGoal = async (goalId: string, goal: Partial<GoalDocument>): Promise<void> => {
	const goalRef = doc(db, 'goals', goalId);
	await updateDoc(goalRef, goal);
	await syncUserGoals();
};

export const addGoal = async (goal: GoalDocument): Promise<void> => {
	if (!appState.currentUser) {
		throw new Error('No user logged in');
	}

	const goalsCollection = collection(db, 'goals');

	const goalRef = doc(goalsCollection);
	await setDoc(goalRef, {
		...goal,
		animalId: goal.animalId
	});

	const docID = goalRef.id;

	await updateDoc(doc(db, 'users', appState.currentUser.uid), {
		goals: arrayUnion(docID)
	});
};

export const registerListeners = () => {
	let unsubscribe: () => void;

	unsubscribe = auth.onAuthStateChanged(async (user) => {
		if (user) {
			await Promise.all([syncUserProfile(user), syncUserGoals()]);

			unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
				const data = snapshot.data();
				if (!data) {
					return;
				}

				const user = data as UserProfileDocument;

				setCurrentUser(user);
				syncUserGoals(user);
			});
		} else {
			appState.currentUser = null;
			unsubscribe?.();
		}
	});

	return unsubscribe;
};
