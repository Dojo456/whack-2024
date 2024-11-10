import { crossfade } from 'svelte/transition';

export const [send, receive] = $state(crossfade({}));
