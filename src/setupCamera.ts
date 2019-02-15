import { ArcRotateCamera, Vector3 } from 'babylonjs';

import { GameScene } from './core/GameScene';
import { logger } from './logger';

const debug = logger('camera');

export const setupCamera = (scene: GameScene, canvas: HTMLCanvasElement) => {
  debug('setup camera');
  const camera = new ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    500,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl(canvas, true);
  return camera;
};
