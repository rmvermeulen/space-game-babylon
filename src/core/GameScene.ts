import { Engine, Scene } from 'babylonjs';

import { Combos } from '../KeyTracker';

export interface GameSceneOptions {
  engine: Engine;
  combos: Combos;
}

export abstract class GameScene extends Scene {
  public combos: Combos;
  constructor({ engine, combos }: GameSceneOptions) {
    super(engine);
    this.combos = combos;
  }

  public abstract update(): void;
}
