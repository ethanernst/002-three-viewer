import { atom } from 'jotai';

// jotai state values
const scale = atom(1);
const lights = atom(true);
const wireframe = atom(false);
const currentFile = atom(null);

export { scale, lights, wireframe, currentFile };
