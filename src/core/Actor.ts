import { Scene, TransformNode } from 'babylonjs';
import { injectable } from 'inversify';

@injectable
export abstract class Actor extends TransformNode {
  constructor(name: string, public scene: Scene) {
    super(name);
  }
}
