import MeshRenderer from './MeshRenderer';
import { RENDERER_TYPE_SPRITE as type } from './types';
import {Sprite , SpriteMaterial} from 'three';

/**
 * @requires THREE - { Mesh, BoxGeometry, MeshLambertMaterial, Sprite, SpriteMaterial }
 */
export default class SpriteRenderer extends MeshRenderer {
  constructor(container) {
    super(container);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
    this._body = new Sprite(
      new SpriteMaterial({ color: 0xffffff })
    );
  }

  rotate(particle) {
    particle.target.material.rotation = particle.rotation.z;
  }

  scale(particle) {
    particle.target.scale.set(
      particle.scale * particle.radius,
      particle.scale * particle.radius,
      1
    );
  }
}
