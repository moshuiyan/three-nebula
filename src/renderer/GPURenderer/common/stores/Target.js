/**
 * Simple class that stores the particle's "target" or "next" state.
 *
 */
import { Vector3, Color } from 'three';
export class Target {
  constructor() {
    this.position = new Vector3();
    this.rotation = new Vector3();
    this.size = 0;
    this.color = new Color();
    this.alpha = 0;
    this.texture = null;
    this.index = 0;
  }

  reset() {
    this.position.set(0, 0, 0);
    this.rotation.set(0, 0, 0);
    this.size = 0;
    this.color.setRGB(0, 0, 0);
    this.alpha = 0;
    this.texture = null;
  }
}
