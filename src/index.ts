import * as BABYLON from 'babylonjs';

Object.assign(window, { BABYLON });

// tslint:disable-next-line:ordered-imports
import 'babylonjs-loaders';
import 'reflect-metadata';

import { logger } from './logger';
import { setupEngine } from './setupEngine';

const debug = logger('index.ts');

declare global {
  interface Window {
    space_game_loaded?: boolean;
    BABYLON: typeof BABYLON;
  }
}

if (window.space_game_loaded) {
  window.location.reload();
}

window.onload = async () => {
  window.space_game_loaded = true;
  debug('window ready, starting game');
  setupEngine();
};
