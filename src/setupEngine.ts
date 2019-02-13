import { CannonJSPlugin, Engine, Vector3 } from 'babylonjs';
import CANNON from 'cannon';
import Combokeys from 'combokeys';

import { GameScene } from './core/GameScene';
import { createGUI } from './createGUI';
import { logger } from './logger';
import { SpaceScene } from './scenes/Space.scene';
import { setupCamera } from './setupCamera';

const debug = logger('engine');

window.CANNON = CANNON;

const getRenderCanvas = (): HTMLCanvasElement => {
  const maybeCanvas = document.getElementById('renderCanvas');
  if (maybeCanvas instanceof HTMLCanvasElement) {
    return maybeCanvas;
  }
  const canvas = new HTMLCanvasElement();
  canvas.id = 'renderCanvas';
  document.body.append(canvas);
  return canvas;
};

export const setupEngine = () => {
  debug('setup');

  const canvas = getRenderCanvas();
  const engine = new Engine(canvas, true, {
    deterministicLockstep: true,
    lockstepMaxSteps: 4,
  });

  const combos = new Combokeys(canvas);
  const scene = new SpaceScene({ engine, combos });

  // const gravity = new Vector3(0, -9.81, 0);
  // const physicsPlugin = new CannonJSPlugin();
  // scene.enablePhysics(gravity, physicsPlugin);

  createGUI(scene);
  setupCamera(scene, canvas);

  engine.runRenderLoop(() => {
    scene.update();
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener('resize', () => {
    debug('resizing');
    engine.resize();
  });

  return { canvas, keys: combos };
};