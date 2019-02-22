import { Mesh, SceneLoader, Vector2, Vector3 } from 'babylonjs';
import { Vec3 } from 'cannon';
import { map, multiply } from 'ramda';

import { Actor } from '../core/Actor';
import { GameScene } from '../core/GameScene';
import { KeyTracker } from '../KeyTracker';
import { logger } from '../logger';

const debug = logger('space-ship');

export class SpaceShip extends Actor {
  public get isReady(): boolean {
    return !!this.root;
  }
  public get mesh() {
    return this.root;
  }
  public static create(scene: GameScene) {
    return new SpaceShip(scene);
  }
  protected root?: Mesh;
  constructor(scene: GameScene) {
    super('space-ship', scene);
    SceneLoader.LoadAssetContainer(
      '/assets/space-ship-model/Wraith Raider Starship/',
      'Wraith Raider Starship.obj',
      scene,
      (container) => {
        debug('raider loaded');
        this.root = container.createRootMesh();
        this.root.scaling = Vector3.One().scale(0.3);
        container.addAllToScene();
      },
    );

    const trackers = map(KeyTracker.factory(scene.combos), {
      left: 'left',
      right: 'right',
      down: 'down',
      up: 'up',
    });

    const angle = multiply(Math.PI / 180);

    let speed = 0;

    scene.onBeforeDrawPhaseObservable.add(() => {
      if (!this.root) {
        return;
      }
      const input = new Vector2(
        +trackers.right.isHeld - +trackers.left.isHeld,
        +trackers.up.isHeld - +trackers.down.isHeld,
      );

      if (input.y !== 0) {
        speed += input.y / 2;
      } else {
        speed *= 0.99;
      }

      this.root
        .rotate(Vector3.Up(), angle(input.x))
        .translate(Vector3.Forward(), speed);
    });
  }
}
