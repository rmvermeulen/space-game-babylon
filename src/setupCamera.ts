import { ArcRotateCamera, Mesh, Vector3 } from 'babylonjs';
import { assert, expect } from 'chai';

import { GameScene } from './core/GameScene';
import { logger } from './logger';

const debug = logger('camera');

export const setupCamera = (
  scene: GameScene,
  canvas: HTMLCanvasElement,
  target?: Mesh,
) => {
  debug('setup camera');
  const camera = new ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    -500,
    new Vector3(0, 0, 0),
    scene,
  );

  if (target) {
    debug('setting target');
    camera.setTarget(target);
    camera.useFramingBehavior = true;
    const framing = camera.framingBehavior!;
    assert(framing, 'No framing behaviour!');
    // framing.mode
    // = FramingBehavior.IgnoreBoundsSizeMode
    // = FramingBehavior.FitFrustumSidesMode
    // framing.radiusScale
    debug('framing', framing);
    framing.positionY = 10;
    // framing.defaultElevation
    // framing.elevationReturnTime
    // framing.elevationReturnWaitTime
    // framing.zoomStopsAnimation
    // framing.framingTime
  }
  return camera;
};
