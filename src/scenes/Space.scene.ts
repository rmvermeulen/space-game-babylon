import {
  CubeTexture,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Orientation,
  StandardMaterial,
  Texture,
  Vector3,
} from 'babylonjs';
import { provide } from 'inversify-binding-decorators';

import { GameScene } from '../core/GameScene';
import { Combos } from '../KeyTracker';
import { logger } from '../logger';

const debug = logger('space-scene');

@provide(GameScene)
export class SpaceScene extends GameScene {
  constructor(engine: Engine, combos: Combos) {
    super(engine, combos);

    // tslint:disable:no-unused-expression
    new HemisphericLight('light1', new Vector3(1, 1, 0), this);
    // tslint:enable:no-unused-expression

    // When click event is raised
    window.addEventListener('click', () => {
      debug('--');
      // We try to pick an object

      const { pickedMesh } = this.pick(this.pointerX, this.pointerY)!;
      if (!pickedMesh) {
        debug('nothing');
        return;
      }
      debug(pickedMesh.name);

      // pickedMesh.visibility = +!pickedMesh.visibility;
    });

    // Skybox
    const skyboxSize = 2e3;
    const skybox = MeshBuilder.CreateBox(
      'skyBox',
      { size: skyboxSize, sideOrientation: Orientation.CCW },
      this,
    );
    const skyboxMaterial = new StandardMaterial('skyBox', this);
    skyboxMaterial.backFaceCulling = true;
    skyboxMaterial.reflectionTexture = new CubeTexture(
      //   'assets/stormy-days',
      'assets/skybox',
      this,
    );
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
  }
  public update() {
    // do stuff
  }
}
