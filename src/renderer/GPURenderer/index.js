import BaseRenderer from '../BaseRenderer';
import { DEFAULT_RENDERER_OPTIONS } from './common/constants';
import DesktopGPURenderer from './Desktop';
import MobileGPURenderer from './Mobile';
import { RENDERER_TYPE_GPU } from '../types';

/**
 * Performant particle renderer that uses THREE.Points to propagate particle (postiion, rgba etc.,) properties to
 * vertices in a ParticleBufferGeometry.
 * Uses a dynamic texture atlas to support systems with mutliple sprites in a performant way.
 *
 * NOTE! This is an experimental renderer and is currently not covered by tests, coverage will be added when the API
 * is more stable. Currently only compatible with sprite/texture based systems. Meshes are not yet supported.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 */
export default class GPURenderer extends BaseRenderer {
  constructor(container, options = DEFAULT_RENDERER_OPTIONS) {
    super(RENDERER_TYPE_GPU);

    const { shouldForceDesktopRenderer, shouldForceMobileRenderer } = options;
    const args = [container,  options];

    if (shouldForceDesktopRenderer) {
      return new DesktopGPURenderer(...args);
    }

    if (shouldForceMobileRenderer) {
      return new MobileGPURenderer(...args);
    }

    if (!this.isFloatingPointTextureSupported()) {
      return new MobileGPURenderer(...args);
    }

    return new DesktopGPURenderer(...args);
  }

  isFloatingPointTextureSupported() {
    const canvas = document.createElement('canvas');

    if (window.WebGL2RenderingContext && canvas.getContext('webgl2')) {
      // return false here to test the mobile renderer on desktop
      return true;
    }

    const gl = canvas.getContext('webgl');
    const support = !!gl.getExtension('OES_texture_float');

    canvas.remove();

    return support;
  }
}
