import { Scene, TransformNode } from 'babylonjs';

export abstract class Actor {
  constructor(
    protected name: string,
    public scene: Scene,
    protected root?: TransformNode,
  ) {}
  public setRoot(node: TransformNode) {
    this.root = node;
  }
}
