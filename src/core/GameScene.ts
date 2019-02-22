import { Engine, Scene } from 'babylonjs';

import { Combos } from '../KeyTracker';

// @provide(GameScene)
export abstract class GameScene extends Scene {
  constructor(public engine: Engine, public combos: Combos) {
    super(engine);
  }
}
