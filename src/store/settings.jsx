import { atom } from 'jotai';

// jotai state values
const scale = atom(0);
const rotation = atom(0);
const wireframe = atom(false);
const currentFile = atom(null);

export { scale, rotation, wireframe, currentFile };
