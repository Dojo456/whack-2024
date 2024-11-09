// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface ImportMetaEnv {
		FIREBASE_PRIVATE_KEY: string;
		FIREBASE_PROJECT_ID: string;
		FIREBASE_CLIENT_EMAIL: string;
	}
}

export {};
