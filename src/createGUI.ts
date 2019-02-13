import { AdvancedDynamicTexture, Button, Control } from 'babylonjs-gui';

import { GameScene } from './core/GameScene';
import { logger } from './logger';

const debug = logger('gui');
export const createGUI = (scene: GameScene) => {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    'UI',
    true,
    scene,
  );
  const button = Button.CreateSimpleButton('but', 'Toggle camera');
  button.width = 0.2;
  button.height = '40px';
  button.color = 'white';
  button.background = 'green';
  button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  advancedTexture.addControl(button);

  button.onPointerUpObservable.add(() => {
    debug('button click');
  });
};