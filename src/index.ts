import { logger } from './logger';
import { setupEngine } from './setupEngine';

const debug = logger('index.ts');

declare global {
  interface Window {
    space_game_loaded?: boolean;
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
