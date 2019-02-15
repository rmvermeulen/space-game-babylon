import { Engine, Scene } from 'babylonjs';
import { provide } from 'inversify-binding-decorators';

import { Combos } from '../KeyTracker';

@provide(Scene)
export abstract class GameScene extends Scene {
  constructor(public engine: Engine, public combos: Combos) {
    super(engine);
  }

  public abstract update(): void;
}
