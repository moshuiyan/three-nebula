import {
  ATTRIBUTE_TO_SIZE_MAP,
  DEFAULT_MAX_PARTICLES,
  PARTICLE_BYTE_SIZE,
} from './constants';

import { InterleavedBuffer , InterleavedBufferAttribute, BufferGeometry } from 'three';


/**
 * Creates and provides performant buffers for mapping particle properties to geometry vertices.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 * @see https://threejs.org/examples/?q=buffe#webgl_buffergeometry_points_interleaved
 * @see https://threejs.org/examples/?q=points#webgl_custom_attributes_points
 */
export default class ParticleBuffer {
  constructor(maxParticles = DEFAULT_MAX_PARTICLES) {
    
    this.maxParticles = maxParticles;

    this.createInterleavedBuffer().createBufferGeometry();
  }

  /**
   * Creates the interleaved buffer that will be used to write data to the GPU.
   *
   * @return {ParticleBuffer}
   */
  createInterleavedBuffer() {
    const arrayBuffer = new ArrayBuffer(this.maxParticles * PARTICLE_BYTE_SIZE);

    this.interleavedBuffer = new InterleavedBuffer(
      new Float32Array(arrayBuffer),
      PARTICLE_BYTE_SIZE
    );
    // this.interleavedBuffer.usage = DynamicDrawUsage;
    
    return this;
  }

  /**
   * Sets the geometry's buffer attributes.
   *
   * NOTE Each attribute needs to be set at the right index in the buffer right after the previous
   * attribute that occupies a set amount of size in the buffer.
   *
   * @return {ParticleBufferGeometry}
   */
  createBufferGeometry() {
    this.geometry = new BufferGeometry();

    const { interleavedBuffer, geometry } = this;

    Object.keys(ATTRIBUTE_TO_SIZE_MAP).reduce((offset, attribute) => {
      const size = ATTRIBUTE_TO_SIZE_MAP[attribute];

      geometry.setAttribute(
        attribute,
        new InterleavedBufferAttribute(interleavedBuffer, size, offset)
      );

      return (offset += size);
    }, 0);

    return this;
  }

  /**
   * Gets the publicly accessible interleaved buffer.
   *
   * @return {InterleavedBuffer} buffers - The interleaved buffer
   */
  get buffer() {
    return this.interleavedBuffer;
  }

  get stride() {
    return PARTICLE_BYTE_SIZE;
  }
}
