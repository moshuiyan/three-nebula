import * as THREE from 'three';
import { Vector3, Euler, AdditiveBlending, CustomBlending, MultiplyBlending, NoBlending, NormalBlending, SubtractiveBlending, TextureLoader, SpriteMaterial, Sprite, SphereGeometry, BoxGeometry, MeshBasicMaterial, Mesh, OctahedronGeometry, MeshLambertMaterial, Color as Color$1, DataTexture, RGBAFormat, FloatType, CanvasTexture } from 'three';

const BEHAVIOUR_TYPE_ABSTRACT = 'Behaviour';
const BEHAVIOUR_TYPE_ALPHA = 'Alpha';
const BEHAVIOUR_TYPE_ATTRACTION = 'Attraction';
const BEHAVIOUR_TYPE_COLLISION = 'Collision';
const BEHAVIOUR_TYPE_COLOR = 'Color';
const BEHAVIOUR_TYPE_CROSS_ZONE = 'CrossZone';
const BEHAVIOUR_TYPE_FORCE = 'Force';
const BEHAVIOUR_TYPE_GRAVITY = 'Gravity';
const BEHAVIOUR_TYPE_RANDOM_DRIFT = 'RandomDrift';
const BEHAVIOUR_TYPE_REPULSION = 'Repulsion';
const BEHAVIOUR_TYPE_ROTATE = 'Rotate';
const BEHAVIOUR_TYPE_SCALE = 'Scale';
const BEHAVIOUR_TYPE_SPRING = 'Spring';

const INITIALIZER_TYPE_ABSTRACT = 'Initializer';
const INITIALIZER_TYPE_BODY = 'Body';
const INITIALIZER_TYPE_BODY_SPRITE = 'BodySprite';
const INITIALIZER_TYPE_TEXTURE = 'Texture';
const INITIALIZER_TYPE_LIFE = 'Life';
const INITIALIZER_TYPE_MASS = 'Mass';
const INITIALIZER_TYPE_POSITION = 'Position';
const INITIALIZER_TYPE_ROTATION = 'Rotation';
const INITIALIZER_TYPE_RADIUS = 'Radius';
const INITIALIZER_TYPE_VECTOR_VELOCITY = 'VectorVelocity';
const INITIALIZER_TYPE_POLAR_VELOCITY = 'PolarVelocity';
const INITIALIZER_TYPE_RADIAL_VELOCITY = 'RadialVelocity';
const INITIALIZER_TYPE_RATE = 'Rate';
const INITIALIZER_TYPES_THAT_REQUIRE_THREE = [
  INITIALIZER_TYPE_BODY_SPRITE,
  INITIALIZER_TYPE_TEXTURE,
];

const ZONE_TYPE_ABSTRACT = 'Zone';
const ZONE_TYPE_BOX = 'BoxZone';
const ZONE_TYPE_LINE = 'LineZone';
const ZONE_TYPE_MESH = 'MeshZone';
const ZONE_TYPE_POINT = 'PointZone';
const ZONE_TYPE_SCREEN = 'ScreenZone';
const ZONE_TYPE_SPHERE = 'SphereZone';

const RENDERER_TYPE_BASE = 'BaseRenderer';
const RENDERER_TYPE_CUSTOM = 'CustomRenderer';
const RENDERER_TYPE_SPRITE = 'SpriteRenderer';
const RENDERER_TYPE_MESH = 'MeshRenderer';
const RENDERER_TYPE_GPU = 'GPURenderer';
const RENDERER_TYPE_GPU_MOBILE = 'MobileGPURenderer';
const RENDERER_TYPE_GPU_DESKTOP = 'DesktopGPURenderer';

const PI = 3.142;

/**
 * The max particle number in pool.
 *
 * @const {integer}
 */
const POOL_MAX = 500;
const DR = PI / 180;

/**
 * 1:100
 *
 * @const {integer}
 */
const MEASURE = 100;
const EULER = 'euler';

const __DEV__ = () => {
  if (!process) {
    return false;
  }

  if (!process.env) {
    return false;
  }

  if (!process.env.NODE_ENV) {
    return false;
  }

  if (process.env.NODE_ENV !== 'development') {
    return false;
  }

  return true;
};

/**
 * The Ease class provides a collection of easing functions for use with System
 */
const ease = {
  easeLinear: function(value) {
    return value;
  },

  easeInQuad: function(value) {
    return Math.pow(value, 2);
  },

  easeOutQuad: function(value) {
    return -(Math.pow(value - 1, 2) - 1);
  },

  easeInOutQuad: function(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 2);

    return -0.5 * ((value -= 2) * value - 2);
  },

  easeInCubic: function(value) {
    return Math.pow(value, 3);
  },

  easeOutCubic: function(value) {
    return Math.pow(value - 1, 3) + 1;
  },

  easeInOutCubic: function(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 3);

    return 0.5 * (Math.pow(value - 2, 3) + 2);
  },

  easeInQuart: function(value) {
    return Math.pow(value, 4);
  },

  easeOutQuart: function(value) {
    return -(Math.pow(value - 1, 4) - 1);
  },

  easeInOutQuart: function(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 4);

    return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
  },

  easeInSine: function(value) {
    return -Math.cos(value * (PI / 2)) + 1;
  },

  easeOutSine: function(value) {
    return Math.sin(value * (PI / 2));
  },

  easeInOutSine: function(value) {
    return -0.5 * (Math.cos(PI * value) - 1);
  },

  easeInExpo: function(value) {
    return value === 0 ? 0 : Math.pow(2, 10 * (value - 1));
  },

  easeOutExpo: function(value) {
    return value === 1 ? 1 : -Math.pow(2, -10 * value) + 1;
  },

  easeInOutExpo: function(value) {
    if (value === 0) return 0;
    if (value === 1) return 1;
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));

    return 0.5 * (-Math.pow(2, -10 * --value) + 2);
  },

  easeInCirc: function(value) {
    return -(Math.sqrt(1 - value * value) - 1);
  },

  easeOutCirc: function(value) {
    return Math.sqrt(1 - Math.pow(value - 1, 2));
  },

  easeInOutCirc: function(value) {
    if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);

    return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
  },

  easeInBack: function(value) {
    var s = 1.70158;

    return value * value * ((s + 1) * value - s);
  },

  easeOutBack: function(value) {
    var s = 1.70158;

    return (value = value - 1) * value * ((s + 1) * value + s) + 1;
  },

  easeInOutBack: function(value) {
    var s = 1.70158;

    if ((value /= 0.5) < 1)
      return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));

    return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
  }
};

const {
  easeLinear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack
} = ease;

const setEasingByName = easeName => {
  if (ease[easeName]) return ease[easeName];
  else return ease.easeLinear;
};

const getEasingByName = name =>
  ease[name] ? ease[name] : ease.easeLinear;

/**
 * @desc Default particle life
 * @type {number}
 */
const DEFAULT_LIFE$1 = Infinity;
/**
 * @desc Default particle age
 * @type {number}
 */
const DEFAULT_AGE = 0;
/**
 * @desc Default particle energy
 * @type {number}
 */
const DEFAULT_ENERGY = 1;
/**
 * @desc Default particle dead
 * @type {boolean}
 */
const DEFAULT_DEAD = false;
/**
 * @desc Default particle sleep
 * @type {boolean}
 */
const DEFAULT_SLEEP = false;
/**
 * @desc Default particle body
 * @type {?object}
 */
const DEFAULT_BODY = null;
/**
 * @desc Default particle parent
 * @type {?Emitter}
 */
const DEFAULT_PARENT = null;
/**
 * @desc Default particle mass
 * @type {number}
 */
const DEFAULT_MASS = 1;
/**
 * @desc Default particle radius
 * @type {number}
 */
const DEFAULT_RADIUS = 10;
/**
 * @desc Default particle alpha
 * @type {number}
 */
const DEFAULT_ALPHA = 1;
/**
 * @desc Default particle scale
 * @type {number}
 */
const DEFAULT_SCALE = 1;
/**
 * @desc Default particle useColor
 * @type {boolean}
 */
const DEFAULT_USE_COLOR = false;
/**
 * @desc Default particle useAlpha
 * @type {boolean}
 */
const DEFAULT_USE_ALPHA = false;
/**
 * @desc Default particle easing
 * @type {function}
 */
const DEFAULT_EASING = easeLinear;

/**
 * @desc The default delta provided to the System instance
 * @type {number}
 */
const DEFAULT_SYSTEM_DELTA = 0.0167;

/**
 * @desc The types of initializers supported by the System.fromJSON method.
 * @type {array<string>}
 */
const SUPPORTED_JSON_INITIALIZER_TYPES = [
  INITIALIZER_TYPE_POSITION,
  INITIALIZER_TYPE_ROTATION,
  INITIALIZER_TYPE_LIFE,
  INITIALIZER_TYPE_RADIUS,
  INITIALIZER_TYPE_MASS,
  INITIALIZER_TYPE_BODY,
  INITIALIZER_TYPE_BODY_SPRITE,
  INITIALIZER_TYPE_TEXTURE,
  INITIALIZER_TYPE_POLAR_VELOCITY,
  INITIALIZER_TYPE_RADIAL_VELOCITY,
  INITIALIZER_TYPE_VECTOR_VELOCITY,
];

/**
 * @desc The types of behaviours supported by the System.fromJSON method.
 * @type {array<string>}
 */
const SUPPORTED_JSON_BEHAVIOUR_TYPES = [
  BEHAVIOUR_TYPE_ALPHA,
  BEHAVIOUR_TYPE_ATTRACTION,
  BEHAVIOUR_TYPE_COLOR,
  BEHAVIOUR_TYPE_CROSS_ZONE,
  BEHAVIOUR_TYPE_FORCE,
  BEHAVIOUR_TYPE_GRAVITY,
  BEHAVIOUR_TYPE_RANDOM_DRIFT,
  BEHAVIOUR_TYPE_REPULSION,
  BEHAVIOUR_TYPE_ROTATE,
  BEHAVIOUR_TYPE_SCALE,
  BEHAVIOUR_TYPE_SPRING,
];

/**
 * @desc The types of zones supported by the System.fromJSON method.
 * @type {array<string>}
 */
const SUPPORTED_JSON_ZONE_TYPES = [
  ZONE_TYPE_BOX,
  ZONE_TYPE_LINE,
  ZONE_TYPE_MESH,
  ZONE_TYPE_POINT,
  ZONE_TYPE_SPHERE,
];

var ColorUtil = {
  getRGB: function(color) {
    var rgb = {};

    if (typeof color === 'number') {
      hex = Math.floor(color);
      rgb.r = ((color >> 16) & 255) / 255;
      rgb.g = ((color >> 8) & 255) / 255;
      rgb.b = (color & 255) / 255;
    } else if (typeof color === 'string') {
      var m;

      if (
        (m = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
          color
        ))
      ) {
        rgb.r = Math.min(255, parseInt(m[1], 10)) / 255;
        rgb.g = Math.min(255, parseInt(m[2], 10)) / 255;
        rgb.b = Math.min(255, parseInt(m[3], 10)) / 255;
        // eslint-disable-next-line no-useless-escape
      } else if ((m = /^\#([A-Fa-f0-9]+)$/.exec(color))) {
        var hex = m[1];

        rgb.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
        rgb.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
        rgb.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
      }
    } else {
      rgb.r = color.r;
      rgb.g = color.g;
      rgb.b = color.b;
    }

    return rgb;
  },
};

var PUID = {
  _id: 0,
  _uids: new Map(),
  getNewId: function() {
    return `PUID_${++this._id}`;
  },
  id: function(functionOrObject) {
    if (this._uids.has(functionOrObject)) {
      return this._uids.get(functionOrObject);
    }

    const newId = this.getNewId();

    this._uids.set(functionOrObject, newId);

    return newId;
  },
};

var THREEUtil = {
  toScreenPos: (function() {
    var vector = new Vector3();

    return function(pos, camera, canvas) {
      vector.copy(pos);
      // map to normalized device coordinate (NDC) space
      vector.project(camera);
      // map to 2D screen space
      vector.x = Math.round(((vector.x + 1) * canvas.width) / 2);
      vector.y = Math.round(((-vector.y + 1) * canvas.height) / 2);
      vector.z = 0;

      return vector;
    };
  })(),

  toSpacePos: (function() {
    var vector = new Vector3(),
      dir = new Vector3(),
      distance;

    return function(pos, camera, canvas) {
      vector.set(
        (pos.x / canvas.width) * 2 - 1,
        -(pos.y / canvas.height) * 2 + 1,
        0.5
      );
      vector.unproject(camera);

      dir.copy(vector.sub(camera.position).normalize());
      distance = -camera.position.z / dir.z;
      vector.copy(camera.position);
      vector.add(dir.multiplyScalar(distance));

      return vector;
    };
  })(),
};

let UID = 0;

var Util = {
  initValue: function(value, defaults) {
    var _value = value != null && value != undefined ? value : defaults;

    return _value;
  },

  isArray: function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  sample(array) {
    const length = array == null ? 0 : array.length;
    
    return length ? array[Math.floor(Math.random() * length)] : undefined;
  },
  isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  },
  uid() {
    return UID++;
  },
  destroyArray: function(array) {
    array.length = 0;
  },

  destroyObject: function(obj) {
    for (var o in obj) delete obj[o];
  },

  isUndefined: function() {
    for (var id in arguments) {
      var arg = arguments[id];

      if (arg !== undefined) return false;
    }

    return true;
  },

  setVectorByObj: function(target, pOBJ) {
    if (pOBJ['x'] !== undefined) target.position.x = pOBJ['x'];
    if (pOBJ['y'] !== undefined) target.position.y = pOBJ['y'];
    if (pOBJ['z'] !== undefined) target.position.z = pOBJ['z'];

    if (pOBJ['vx'] !== undefined) target.velocity.x = pOBJ['vx'];
    if (pOBJ['vy'] !== undefined) target.velocity.y = pOBJ['vy'];
    if (pOBJ['vz'] !== undefined) target.velocity.z = pOBJ['vz'];

    if (pOBJ['ax'] !== undefined) target.acceleration.x = pOBJ['ax'];
    if (pOBJ['ay'] !== undefined) target.acceleration.y = pOBJ['ay'];
    if (pOBJ['az'] !== undefined) target.acceleration.z = pOBJ['az'];

    if (pOBJ['p'] !== undefined) target.position.copy(pOBJ['p']);
    if (pOBJ['v'] !== undefined) target.velocity.copy(pOBJ['v']);
    if (pOBJ['a'] !== undefined) target.acceleration.copy(pOBJ['a']);

    if (pOBJ['position'] !== undefined) target.position.copy(pOBJ['position']);
    if (pOBJ['velocity'] !== undefined) target.velocity.copy(pOBJ['velocity']);
    if (pOBJ['accelerate'] !== undefined)
      target.acceleration.copy(pOBJ['accelerate']);
  },

  //set prototype
  setPrototypeByObj: function(target, proObj, filters) {
    for (var key in proObj) {
      // eslint-disable-next-line no-prototype-builtins
      if (target.hasOwnProperty(key)) {
        if (filters) {
          if (filters.indexOf(key) < 0)
            target[key] = this._getValue(proObj[key]);
        } else {
          target[key] = this._getValue(proObj[key]);
        }
      }
    }

    return target;
  },

  _getValue: function(pan) {
    if (pan.constructor.type === 'Span') return pan.getValue();
    else return pan;
  },
};

const withDefaults = (defaults, properties) => ({
  ...defaults,
  ...properties,
});

var MathUtils = {
  randomAToB: function(a, b, INT) {
    if (!INT) return a + Math.random() * (b - a);
    else return ((Math.random() * (b - a)) >> 0) + a;
  },
  randomFloating: function(center, f, INT) {
    return this.randomAToB(center - f, center + f, INT);
  },

  randomZone: function(display) {}, //eslint-disable-line

  degreeTransform: function(a) {
    return (a * PI) / 180;
  },

  toColor16: function getRGB(num) {
    return '#' + num.toString(16);
  },

  randomColor: function() {
    return (
      '#' +
      ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
    );
  },

  lerp: function(a, b, energy) {
    return b + (a - b) * energy;
  },

  getNormal: function(v, n) {
    if (v.x == 0 && v.y == 0) {
      if (v.z == 0) n.set(1, 0, 1);
      else n.set(1, 1, -v.y / v.z);
    } else {
      if (v.x == 0) n.set(1, 0, 1);
      else n.set(-v.y / v.x, 1, 1);
    }

    return n.normalize();
  },

  /**
   * Rodrigues' Rotation Formula
   * https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula
   * v′ = vcos(θ) + k(k⋅v)(1−cos(θ)) + (k*v)sin(θ)
   */
  axisRotate: function(v0, v, k, tha) {
    var cos = Math.cos(tha);
    var sin = Math.sin(tha);
    var p = k.dot(v) * (1 - cos);

    v0.copy(k);
    v0.cross(v).scalar(sin);
    v0.addValue(v.x * cos, v.y * cos, v.z * cos);
    v0.addValue(k.x * p, k.y * p, k.z * p);
  }
};

const MATH_TYPE_ARRAY_SPAN = 'ArraySpan';
const MATH_TYPE_COLOR_SPAN = 'ColorSpan';
const MATH_TYPE_BOX = 'Box';
const MATH_TYPE_POLAR_3D = 'Polar3D';
const MATH_TYPE_SPAN = 'Span';

class Span {
  /**
   * Span Class. Get a random Number from a to b. Or from c-a to c+b
   * @param {Number|Array} a - min number
   * @param {Number} b - max number
   * @param {Number} center - the center's z value
   * @example
   * var span = new Span(0,30);
   * or
   * var span = new Span(["#fff","#ff0","#000"]);
   * or
   * var span = new Span(5,1,"center");
   * @extends {Zone}
   * @constructor
   */
  constructor(a, b, center) {
    this._isArray = false;

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = MATH_TYPE_SPAN;

    if (Util.isArray(a)) {
      this._isArray = true;
      this.a = a;
    } else {
      this.a = Util.initValue(a, 1);
      this.b = Util.initValue(b, this.a);
      this._center = Util.initValue(center, false);
    }
  }

  /**
   * Span.getValue function
   * @name get a random Number from a to b. Or get a random Number from c-a to c+b
   * @param {number} INT or int
   * @return {number} a random Number
   */
  getValue(INT) {
    if (this._isArray) {
      return this.a[(this.a.length * Math.random()) >> 0];
    } else {
      if (!this._center) return MathUtils.randomAToB(this.a, this.b, INT);
      else return MathUtils.randomFloating(this.a, this.b, INT);
    }
  }
}

const createSpan = (a, b, c) => {
  if (a instanceof Span) return a;

  if (b === undefined) {
    return new Span(a);
  } else {
    if (c === undefined) return new Span(a, b);
    else return new Span(a, b, c);
  }
};

/**
 * Class for storing items of mixed type and fetching a randomised
 * value from these items.
 *
 */
class ArraySpan extends Span {
  /**
   * Constructs an ArraySpan instance.
   *
   * @param {mixed|array<mixed>} items - Items
   * @return void
   */
  constructor(items) {
    super();

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = MATH_TYPE_ARRAY_SPAN;

    /**
     * @desc An array of colors
     * @type {array}
     */
    this.items = Array.isArray(items) ? items : [items];
  }

  /**
   * Gets a random item.
   *
   * @return {mixed}
   */
  getValue() {
    return Util.sample(this.items);
  }
}

/**
 * Attempts to create an ArraySpan from the items provided.
 *
 * @param {mixed} items - Items to try and create an ArraySpan from
 * @return {?ArraySpan}
 */
const createArraySpan = items => {
  if (!items) {
    return null;
  }

  if (items instanceof ArraySpan) {
    return items;
  }

  return new ArraySpan(items);
};

/**
 * Class for storing and interacting with an array of colours.
 *
 */
class ColorSpan extends Span {
  /**
   * Constructs a ColorSpan instance.
   *
   * @param {string|array<string>} colors - A color or array of colors. If the
   * string 'random' is provided, a random color will be returned from getValue
   * @return void
   */
  constructor(colors) {
    super();

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = MATH_TYPE_COLOR_SPAN;

    /**
     * @desc Determines if a random color should be returned from the getValue method.
     * @type {boolean}
     */
    this.shouldRandomize = colors === 'random' ? true : false;

    /**
     * @desc An array of colors to select from
     * @type {array<string>}
     */
    this.colors = Array.isArray(colors) ? colors : [colors];
  }

  /**
   * Gets a color from the color array
   * or a random color if this.shouldRandomize is true.
   *
   * @return {string} a hex color
   */
  getValue() {
    return this.shouldRandomize ? MathUtils.randomColor() : Util.sample(this.colors);
  }
}

/**
 * Attempts to create an ArraySpan from the colors provided.
 *
 * @param {mixed} colors - colors to try and create an ArraySpan from
 * @return {?ColorSpan}
 */
const createColorSpan = colors => {
  if (!colors) {
    console.warn(
      `Invalid colors argument ${colors} passed to createColorSpan. Defaulting to 'random'.`
    );

    colors = 'random';
  }

  if (colors instanceof ColorSpan) {
    return colors;
  }

  return new ColorSpan(colors);
};

class Box {
  constructor(x, y, z, w, h, d) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = MATH_TYPE_BOX;
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = w;
    this.height = h;
    this.depth = d;
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
    this.right = this.x + this.width;
  }

  contains(x, y, z) {
    if (
      x <= this.right &&
      x >= this.x &&
      y <= this.bottom &&
      y >= this.y &&
      z <= this.depth &&
      z >= this.z
    )
      return true;
    else return false;
  }
}

/**
 * @see https://en.wikipedia.org/wiki/Euler_method
 * @type {string}
 */
const INTEGRATION_TYPE_EULER = 'EULER';

/**
 * @see http://web.mit.edu/10.001/Web/Course_Notes/Differential_Equations_Notes/node5.html
 * @type {string}
 */
const INTEGRATION_TYPE_RK2 = 'RUNGE_KUTTA_2';

/**
 * @see http://web.mit.edu/10.001/Web/Course_Notes/Differential_Equations_Notes/node5.html
 * @type {string}
 */
const INTEGRATION_TYPE_RK4 = 'RUNGE_KUTTA_4';

/**
 * @see https://en.wikipedia.org/wiki/Verlet_integration
 * @type {string}
 */
const INTEGRATION_TYPE_VERLET = 'VERLET';

/**
 * Performs euler integration on the particle.
 *
 * @param {Particle} particle - The particle to integrate
 * @param {number} time - The factor of time to use
 * @param {number} damping - The damping to use
 * @return void
 */
const eulerIntegration = (particle, time, damping) => {
  if (particle.sleep) {
    return;
  }

  particle.old.position.copy(particle.position);
  particle.old.velocity.copy(particle.velocity);
  particle.acceleration.scalar(1 / particle.mass);
  particle.velocity.add(particle.acceleration.scalar(time));
  particle.position.add(particle.old.velocity.scalar(time));
  damping &&
    particle.velocity.scalar(Math.pow(damping, time / DEFAULT_SYSTEM_DELTA));
  particle.acceleration.clear();
};

/**
 * Performs the chosen integration on the particle.
 * Defaults to euler integration.
 *
 * @param {Particle} particle - The particle to integrate
 * @param {number} time - The factor of time to use
 * @param {number} damping - The damping to use
 * @param {string} [type=INTEGRATION_TYPE_EULER] - The algorithm to use
 * @return void
 */
const integrate = (
  particle,
  time,
  damping,
  type = INTEGRATION_TYPE_EULER
) => {
  switch (type) {
    case INTEGRATION_TYPE_EULER:
      eulerIntegration(particle, time, damping);
      break;
    default:
      eulerIntegration(particle, time, damping);
  }
};

class Vector3D extends Vector3 {
  clear() {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;

    return this;
  }

  scalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
  }

  addValue(a, b, c) {
    this.x += a;
    this.y += b;
    this.z += c;

    return this;
  }

  toString() {
    return 'x:' + this.x + 'y:' + this.y + 'z:' + this.z;
  }

  eulerFromDir(vector3D) {
    const euler = new Euler();

    return euler.setFromVector3(vector3D);
  }
}

class Polar3D {
  constructor(radius, theta, phi) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = MATH_TYPE_POLAR_3D;
    this.radius = radius || 1;
    this.phi = phi || 0;
    this.theta = theta || 0;
  }

  set(radius, theta, phi) {
    this.radius = radius || 1;
    this.phi = phi || 0;
    this.theta = theta || 0;

    return this;
  }

  setRadius(radius) {
    this.radius = radius;

    return this;
  }

  setPhi(phi) {
    this.phi = phi;

    return this;
  }

  setTheta(theta) {
    this.theta = theta;

    return this;
  }

  copy(p) {
    this.radius = p.radius;
    this.phi = p.phi;
    this.theta = p.theta;

    return this;
  }

  toVector3D() {
    return new Vector3D(this.getX(), this.getY(), this.getZ());
  }

  getX() {
    return this.radius * Math.sin(this.theta) * Math.cos(this.phi);
  }

  getY() {
    return -this.radius * Math.sin(this.theta) * Math.sin(this.phi);
  }

  getZ() {
    return this.radius * Math.cos(this.theta);
  }

  normalize() {
    this.radius = 1;

    return this;
  }

  equals(v) {
    return (
      v.radius === this.radius && v.phi === this.phi && v.theta === this.theta
    );
  }

  clear() {
    this.radius = 0.0;
    this.phi = 0.0;
    this.theta = 0.0;

    return this;
  }

  clone() {
    return new Polar3D(this.radius, this.phi, this.theta);
  }
}

const CORE_TYPE_PARTICLE = 'Particle';
const CORE_TYPE_POOL = 'Pool';
const CORE_TYPE_SYSTEM = 'System';

/**
 * A Particle is an object that is emitted by an emitter.
 *
 */
class Particle {
  /**
   * Constructs a Particle instance.
   *
   * @param {object} properties - The properties to instantiate the particle with
   * @property {number} properties.life - The particle's life
   * @property {number} properties.age - The particle's age
   * @property {number} properties.energy - The particle's energy loss
   * @property {boolean} properties.dead - Determines if the particle is dead or not
   * @property {boolean} properties.sleep - Determines if the particle is sleeping or not
   * @property {object} properties.target - The particle's target
   * @property {object} properties.body - The particle's body
   * @property {number} properties.mass - The particle's mass
   * @property {number} properties.radius - The particle's radius
   * @property {number} properties.alpha - The particle's alpha
   * @property {number} properties.scale - The particle's scale
   * @property {number} properties.rotation - The particle's rotation
   * @property {string|number} properties.color - The particle's color
   * @property {function} properties.easing - The particle's easing
   * @property {Vector3D} properties.position - The particle's position
   * @property {Vector3D} properties.velocity - The particle's velocity
   * @property {Vector3D} properties.acceleration - The particle's acceleration
   * @property {array} properties.behaviours - The particle's behaviours array
   * @property {object} properties.transform - The particle's transform collection
   * @return void
   */
  constructor(properties) {
    /**
     * @desc The particle's unique id
     * @type {number}
     */
    this.id = `particle-${Util.uid()}`;

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = CORE_TYPE_PARTICLE;
    /**
     * @desc The particle's life
     * @type {number}
     */
    this.life = DEFAULT_LIFE$1;
    /**
     * @desc The particle's age
     * @type {number}
     */
    this.age = DEFAULT_AGE;
    /**
     * @desc The particle's energy loss
     * @type {number}
     */
    this.energy = DEFAULT_ENERGY;
    /**
     * @desc Determines if the particle is dead or not
     * @type {number}
     */
    this.dead = DEFAULT_DEAD;
    /**
     * @desc Determines if the particle is sleeping or not
     * @type {number}
     */
    this.sleep = DEFAULT_SLEEP;
    /**
     * @desc The particle's body
     * @type {object}
     */
    this.body = DEFAULT_BODY;
    /**
     * @desc The particle's parent
     * @type {?Emitter}
     */
    this.parent = DEFAULT_PARENT;
    /**
     * @desc The particle's mass
     * @type {number}
     */
    this.mass = DEFAULT_MASS;
    /**
     * @desc The particle's radius
     * @type {number}
     */
    this.radius = DEFAULT_RADIUS;
    /**
     * @desc The particle's alpha
     * @type {number}
     */
    this.alpha = DEFAULT_ALPHA;
    /**
     * @desc The particle's scale
     * @type {number}
     */
    this.scale = DEFAULT_SCALE;
    /**
     * @desc Determines whether to use color or not
     * @type {boolean}
     */
    this.useColor = DEFAULT_USE_COLOR;
    /**
     * @desc Determines whether to use alpha or not
     * @type {boolean}
     */
    this.useAlpha = DEFAULT_USE_ALPHA;
    /**
     * @desc The particle's easing
     * @type {string}
     */
    this.easing = DEFAULT_EASING;
    /**
     * @desc The particle's position
     * @type {Vector3D}
     */
    this.position = new Vector3D();
    /**
     * @desc The particle's velocity
     * @type {Vector3D}
     */
    this.velocity = new Vector3D();
    /**
     * @desc The particle's acceleration
     * @type {Vector3D}
     */
    this.acceleration = new Vector3D();
    /**
     * @desc The particle's last position, velocity and acceleration
     * @type {Vector3D}
     */
    this.old = {};
    /**
     * @desc The particle's old position
     * @type {Vector3D}
     */
    this.old.position = this.position.clone();
    /**
     * @desc The particle's old velocity
     * @type {Vector3D}
     */
    this.old.velocity = this.velocity.clone();
    /**
     * @desc The particle's old acceleration
     * @type {Vector3D}
     */
    this.old.acceleration = this.acceleration.clone();
    /**
     * @desc The particle's behaviours array
     * @type {array}
     */
    this.behaviours = [];
    /**
     * @desc The particle's transform collection
     * @type {object}
     */
    this.transform = {};
    /**
     * @desc The particle's color store
     * @type {object}
     */
    this.color = { r: 0, g: 0, b: 0 };
    /**
     * @desc The particle's rotation
     * @type {number}
     */
    this.rotation = new Vector3D();

    /**
     * @desc The particle's distance to the camera, only set by the GPURenderer for depth sorting purposes.
     * @type {number}
     */
    this.distanceToCamera = 0;

    // override constructor props with passed properties.
    Util.setPrototypeByObj(this, properties);
  }

  /**
   * Gets the particle's current direction.
   *
   * @return {number}
   */
  getDirection() {
    return Math.atan2(this.velocity.x, -this.velocity.y) * (180 / PI);
  }

  /**
   * Resets the particle's default properties and clear's its particle's position,
   * velocity, acceleration, color and rotation. Also destroy's the particle's
   * transform collection & removes all behaviours.
   *
   * @return {Particle}
   */
  reset() {
    this.life = DEFAULT_LIFE$1;
    this.age = DEFAULT_AGE;
    this.energy = DEFAULT_ENERGY;
    this.dead = DEFAULT_DEAD;
    this.sleep = DEFAULT_SLEEP;
    this.body = DEFAULT_BODY;
    this.parent = DEFAULT_PARENT;
    this.mass = DEFAULT_MASS;
    this.radius = DEFAULT_RADIUS;
    this.alpha = DEFAULT_ALPHA;
    this.scale = DEFAULT_SCALE;
    this.useColor = DEFAULT_USE_COLOR;
    this.useAlpha = DEFAULT_USE_ALPHA;
    this.easing = DEFAULT_EASING;
    this.position.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
    this.acceleration.set(0, 0, 0);
    this.old.position.set(0, 0, 0);
    this.old.velocity.set(0, 0, 0);
    this.old.acceleration.set(0, 0, 0);
    this.color.r = 0;
    this.color.g = 0;
    this.color.b = 0;

    this.rotation.clear();
    Util.destroyObject(this.transform);
    this.removeAllBehaviours();

    return this;
  }

  /**
   * Updates the particle's properties by applying each behaviour to the particle.
   * Will also update the particle's energy, unless it's age is greater than it's life
   * in which case it will be destroyed.
   *
   * @param {number} time - Integration time
   * @param {integer} index - Particle index
   * @return void
   */
  update(time, index) {
    if (!this.sleep) {
      this.age += time;

      let i = this.behaviours.length;

      while (i--) {
        let behaviour = this.behaviours[i];

        //behaviour && 
        behaviour.applyBehaviour(this, time, index);
      }
    }

    if (this.age >= this.life) {
      this.destroy();
    } else {
      const scale = this.easing(this.age / this.life);

      this.energy = Math.max(1 - scale, 0);
    }
  }

  /**
   * Adds a behaviour to the particle.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the particle
   * @return void
   */
  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
    behaviour.initialize(this);
  }

  /**
   * Adds multiple behaviours to the particle.
   *
   * @param {array<Behaviour>} behaviours - An array of behaviours to add to the particle
   * @return void
   */
  addBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addBehaviour(behaviours[i]);
    }
  }

  /**
   * Removes the behaviour from the particle.
   *
   * @param {Behaviour} behaviour - The behaviour to remove from the particle
   * @return void
   */
  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      this.behaviours.splice(index, 1);
    }
  }

  /**
   * Removes all behaviours from the particle.
   *
   * @return void
   */
  removeAllBehaviours() {
    Util.destroyArray(this.behaviours);
  }

  /**
   * Destroys the particle.
   *
   * @return void
   */
  destroy() {
    this.removeAllBehaviours();
    this.energy = 0;
    this.dead = true;
    this.parent = null;
  }
}

/**
 * An object pool implementation. Used for pooling objects to avoid unnecessary
 * garbage collection.
 *
 */
class Pool {
  /**
   * Constructs a Pool instance.
   *
   * @return void
   */
  constructor() {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = CORE_TYPE_POOL;
    /**
     * @desc Incrementing id that keeps a count of the number of objects created
     * @type {integer}
     */
    this.cID = 0;

    /**
     * @desc Map of pools in the format of PUID<String>: pool<Array>
     * @type {object}
     */
    this.list = {};
  }

  /**
   * Attempts to create a new object either by creating a new instance or calling its
   * clone method.
   *
   * TODO COVERAGE - for the constructorArgs
   * @param {function|object} functionOrObject - The object to instantiate or clone
   * @return {object|undefined}
   */
  create(functionOrObject, ...constructorArgs) {
    if (!this.canCreateNewObject(functionOrObject)) {
      throw new Error(
        'The pool is unable to create or clone the object supplied'
      );
    }

    this.cID++;

    if (this.canInstantiateObject(functionOrObject)) {
      return new functionOrObject(...constructorArgs);
    }

    if (this.canCloneObject(functionOrObject)) {
      return functionOrObject.clone();
    }
  }

  /**
   * Determines if the object is able to be instantiated or not.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */
  canInstantiateObject(object) {
    return typeof object === 'function';
  }

  /**
   * Determines if the object is able to be cloned or not.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */
  canCloneObject(object) {
    return object.clone && typeof object.clone === 'function';
  }

  /**
   * Determines if a new object is able to be created.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */
  canCreateNewObject(object) {
    return this.canInstantiateObject(object) || this.canCloneObject(object)
      ? true
      : false;
  }

  /**
   * Gets a count of all objects in the pool.
   *
   * @return {integer}
   */
  getCount() {
    var count = 0;

    for (var id in this.list) count += this.list[id].length;

    return count++;
  }

  /**
   * Gets an object either by creating a new one or retrieving it from the pool.
   *
   * @param {function|object} obj - The function or object to get
   * @param {array} args - The args to pass to the function on creation
   * @return {object}
   */
  get(obj, ...args) {
    var p,
      puid = obj.__puid || PUID.id(obj);

    if (this.list[puid] && this.list[puid].length > 0)
      p = this.list[puid].pop();
    else p = this.create(obj, ...args);

    p.__puid = obj.__puid || puid;

    return p;
  }

  /**
   * Pushes an object into the pool.
   *
   * @param {object} obj - The object to expire
   * @return {integer}
   */
  expire(obj) {
    return this._getList(obj.__puid).push(obj);
  }

  /**
   * Destroys all pools.
   *
   * @return void
   */
  destroy() {
    for (var id in this.list) {
      this.list[id].length = 0;
      delete this.list[id];
    }
  }

  /**
   * Gets the pool mapped to the UID.
   *
   * @param {string} uid - The pool uid
   * @return {array}
   */
  _getList(uid) {
    uid = uid || 'default';
    if (!this.list[uid]) this.list[uid] = [];

    return this.list[uid];
  }
}

/*
 * EventDispatcher
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 **/

class EventDispatcher {
  constructor() {
    this.listeners = null;
  }

  set listeners(listeners) {
    this._listeners = listeners;
  }

  get listeners() {
    return this._listeners;
  }

  addEventListener(type, listener) {
    if (!this.listeners) {
      this.listeners = {};
    } else {
      this.removeEventListener(type, listener);
    }

    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(listener);

    return listener;
  }

  removeEventListener(type, listener) {
    if (!this.listeners) return;
    if (!this.listeners[type]) return;

    var arr = this.listeners[type];

    for (var i = 0, l = arr.length; i < l; i++) {
      if (arr[i] == listener) {
        if (l == 1) {
          delete this.listeners[type];
        }
        // allows for faster checks.
        else {
          arr.splice(i, 1);
        }
        break;
      }
    }
  }

  removeAllEventListeners(type) {
    if (!type) this.listeners = null;
    else if (this.listeners) delete this.listeners[type];
  }

  dispatchEvent(eventName, eventTarget) {
    var ret = false,
      listeners = this.listeners;

    if (eventName && listeners) {
      var arr = listeners[eventName];

      if (!arr) return ret;

      arr = arr.slice();        //Should use a copy into a temporary here instead...
      // to avoid issues with items being removed or added during the dispatch

      var handler,
        i = arr.length;

      while (i--) {
        handler = arr[i];

        ret = ret || handler(eventTarget);
      }
    }

    return !!ret;
  }

  hasEventListener(type) {
    var listeners = this.listeners;

    return !!(listeners && listeners[type]);
  }
}

const SYSTEM_UPDATE = 'SYSTEM_UPDATE';
const PARTICLE_CREATED = 'PARTICLE_CREATED';
const PARTICLE_UPDATE = 'PARTICLE_UPDATE';
const PARTICLE_DEAD = 'PARTICLE_DEAD';
const EMITTER_ADDED = 'EMITTER_ADDED';
const EMITTER_REMOVED = 'EMITTER_REMOVED';
const EMITTER_DEAD = 'EMITTER_DEAD';
const SYSTEM_UPDATE_AFTER = 'SYSTEM_UPDATE_AFTER';

/**
 * The base Emitter / Particle property class.
 *
 * @abstract
 */
let Initializer$1 = class Initializer {
  /**
   * Constructs an Initializer instance.
   *
   * @param {string} [type=INITIALIZER_TYPE_ABSTRACT] - The intiializer type
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not

   * @return void
   */
  constructor(type = INITIALIZER_TYPE_ABSTRACT, isEnabled = true) {
    this.type = type;
    this.isEnabled = isEnabled;
  }

  /**
   * Initializes the property on the emitter or particle.
   *
   * @see {@link '../emitter/emitter.js'} setupParticle
   * @param {Emitter} emitter - the emitter to initialize the property on
   * @param {Particle} particle - the particle to intiialize the property on
   * @return void
   */
  init(emitter, particle) {
    if (!this.isEnabled) {
      return;
    }

    if (particle) {
      this.initialize(particle);
      particle.hasBeenInitialized = true;
    } else {
      this.initialize(emitter);
      emitter.hasBeenInitialized = true;
    }
  }

  /**
   * @abstract
   */
  reset() {}

  /**
   * Place custom property initialization code in this method in the subclass.
   *
   * @param {object} target - either an Emitter or a Particle
   * @abstract
   */
  initialize(target) {} // eslint-disable-line

  /**
   * Determines if the initializer requires a Web GL API to be provided to its constructor.
   * If true, the WebGL API will need to be provided as the first argument to the constructor
   * and fromJSON methods.
   *
   * @return {boolean}
   */
  static requiresWebGlApi() {
    return false;
  }

  /**
   * Returns a new instance of the initializer from the JSON object passed.
   *
   * @abstract
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Behaviour}
   */
  static fromJSON(json) {} // eslint-disable-line
};

/**
 * Sets the body property on initialized particles.
 *
 */
class Body extends Initializer$1 {
  /**
   * Constructs a Body initalizer instance.
   *
   * @param {string|number|object} body - The content for the particle body, can
   * be a color or an object (mesh)
   * @param {?number} w - The width of the particle body
   * @param {?number} h - The height of the particle body
   * @return void
   */
  constructor(body, w, h, isEnabled = true) {
    super(INITIALIZER_TYPE_BODY, isEnabled);

    /**
     * @desc The content for the particle body
     * @type {ArraySpan}
     */
    this.body = createArraySpan(body);

    /**
     * @desc The width of the particle Body
     * @type {number}
     */
    this.w = w;

    /**
     * @desc The height of the particle Body
     * @type {number}
     */
    this.h = h || w;
  }

  /**
   * Sets the particle's initial body.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */
  initialize(particle) {
    var body = this.body.getValue();

    if (this.w) {
      particle.body = {
        width: this.w,
        height: this.h,
        body: body,
      };
    } else {
      particle.body = body;
    }
  }

  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.body - The color for the particle body
   * @property {number} json.width - The width of the particle body
   * @property {number} json.height - The height of the particle body
   * @return {Body}
   */
  static fromJSON(json) {
    const { body, width, height, isEnabled = true } = json;

    return new Body(body, width, height, isEnabled);
  }
}

const SUPPORTED_MATERIAL_BLENDING_MODES = {
  AdditiveBlending,
  CustomBlending,
  MultiplyBlending,
  NoBlending,
  NormalBlending,
  SubtractiveBlending,
};

const DEFAULT_MATERIAL_PROPERTIES = {
  color: 0xff0000,
  blending: AdditiveBlending,
  fog: true,
};
const DEFAULT_JSON_MATERIAL_PROPERTIES = {
  ...DEFAULT_MATERIAL_PROPERTIES,
  blending: 'AdditiveBlending',
};
const DEFAULT_RATE_NUM_PAN = 1;
const DEFAULT_RATE_TIME_PAN = 1;

/**
 * Sets the body property to be a Sprite on initialized particles.
 *
 * NOTE The texture map MUST be set on the SpriteMaterial in the TextureLoader.load
 * callback. Not doing so will cause WebGL buffer errors.
 */
class BodySprite extends Initializer$1 {
  /**
   * Constructs a BodySprite initializer.
   *
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} texture - The sprite texture
   * @param {object} materialProperties - The sprite material properties
   * @throws {Error} If the TextureLoader fails to load the supplied texture
   * @return void
   */
  constructor(
    
    texture,
    materialProperties = DEFAULT_MATERIAL_PROPERTIES,
    isEnabled = true
  ) {
    super(INITIALIZER_TYPE_BODY_SPRITE, isEnabled);

    /**
     * @desc The material properties for this object's SpriteMaterial
     * NOTE This is required for testing purposes
     * @type {object}
     */
    this.materialProperties = withDefaults(
      DEFAULT_MATERIAL_PROPERTIES,
      materialProperties
    );

    new TextureLoader().load(
      texture,
      map => {
        /**
         * @desc The texture for the SpriteMaterial map.
         * @type {Texture}
         */
        this.texture = map;

        /**
         * @desc SpriteMaterial instance.
         * @type {SpriteMaterial}
         */
        this.material = new SpriteMaterial({
          ...{ map },
          ...this.materialProperties,
        });

        /**
         * @desc Sprite instance.
         * @type {Sprite}
         */
        this.sprite = new Sprite(this.material);
      },
      undefined,
      error => {
        throw new Error(error);
      }
    );
  }

  /**
   * Sets the particle body to the sprite.
   *
   * @param {Particle} particle - The particle to set the body of
   * @return void
   */
  initialize(particle) {
    particle.body = this.sprite;
  }

  /**
   * Creates a BodySprite initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} json.texture - The sprite texture
   * @param {object} json.materialProperties - The sprite material properties
   * @return {BodySprite}
   */
  static fromJSON(json) {
    const {
      texture,
      materialProperties = DEFAULT_JSON_MATERIAL_PROPERTIES,
      isEnabled = true,
    } = json;

    const ensureMappedBlendingMode = properties => {
      const { blending } = properties;

      return {
        ...properties,
        blending: blending
          ? SUPPORTED_MATERIAL_BLENDING_MODES[blending]
          : SUPPORTED_MATERIAL_BLENDING_MODES[
            DEFAULT_JSON_MATERIAL_PROPERTIES.blending
          ],
      };
    };

    return new BodySprite(
      
      texture,
      withDefaults(
        DEFAULT_JSON_MATERIAL_PROPERTIES,
        ensureMappedBlendingMode(materialProperties)
      ),
      isEnabled
    );
  }
}

const particleEuler = new Euler();

var InitializerUtil = {
  particleEuler: null,
  /**
   * Loops through the initializers array and calls each initializer's initialize method
   * on the supplied particle. This sets the particle's initial properties.
   *
   * @see {@link '../emitter/Emitter'} setupParticle
   * @param {Emitter} emitter - The emitter that has called this method
   * @param {Particle} particle - The particle that has just been created
   * @param {array<Initializer>} initializers - All of the emitter's initializers
   * @return void
   */
  initialize: function(emitter, particle, initializers) {
    let i = initializers.length;

    while (i--) {
      initializers[i].init(emitter, particle);
    }

    emitter.bindEmitter && this.bindEmitter(emitter, particle);
  },

  /**
   * Ensures that the emitter's position, velocity and accleration are added
   * to each created particle.
   *
   * @param {Emitter} emitter - The emitter that is emitting the particles
   * @param {Particle} particle - The newly created particle
   * @return void
   */
  bindEmitter: function(emitter, particle) {
    const {
      rotation: { x, y, z },
    } = emitter;

    particle.position.add(emitter.position);
    particle.velocity.add(emitter.velocity);
    particle.acceleration.add(emitter.acceleration);
    particle.velocity.applyEuler(particleEuler.set(x, y, z));
  },
};

/**
 * Sets the life property on initialized particles.
 *
 */
class Life extends Initializer$1 {
  /**
   * Constructs a Life property instance.
   *
   * @param {number} min - The minimum life
   * @param {number} max - The maximum life
   * @param {boolean} [center] - Determines whether to average the life value
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
   * @return void
   */
  constructor(min, max, center, isEnabled = true) {
    super(INITIALIZER_TYPE_LIFE, isEnabled);

    /**
     * @desc The life span of the particle.
     * @type {Span}
     */
    this.lifePan = createSpan(min, max, center);
  }

  /**
   * Sets the particle's initial life.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */
  initialize(particle) {
    if (this.lifePan.a == Infinity || this.lifePan.a == 'infi') {
      particle.life = Infinity;
    } else {
      particle.life = this.lifePan.getValue();
    }
  }

  /**
   * Creates a Life initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.min - The minimum life time
   * @param {number} json.max - The maximum life time
   * @param {number} json.center - The center of the life time
   * @param {boolean} [json.isEnabled=true] - Determines if the initializer should be enabled or not
   * @return {Life}
   */
  static fromJSON(json) {
    const { min, max, center = false, isEnabled = true } = json;

    return new Life(min, max, center, isEnabled);
  }
}

/**
 * Sets the mass property on initialized particles.
 *
 */
class Mass extends Initializer$1 {
  /**
   * Constructs a Mass initializer instance.
   *
   * @param {number} min - The minumum mass for the particle
   * @param {number} max - The maximum mass for the particle
   * @param {boolean} [center] - Determines whether to average the mass value
   * @return void
   */
  constructor(min, max, center = false, isEnabled = true) {
    super(INITIALIZER_TYPE_MASS, isEnabled);

    /**
     * @desc The mass span which is used to set the particle mass value.
     * @type {Span}
     */
    this.massPan = createSpan(min, max, center);
  }

  /**
   * Sets the particle's initial mass.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */
  initialize(particle) {
    particle.mass = this.massPan.getValue();
  }

  /**
   * Creates a Mass initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.min - The minimum mass
   * @property {number} json.max - The maximum mass
   * @property {number} json.center - The center of the mass
   * @return {Mass}
   */
  static fromJSON(json) {
    const { min, max, center = false, isEnabled = true } = json;

    return new Mass(min, max, center, isEnabled);
  }
}

/**
 * A Zone determines the area in 3D space where an emitter's particles can position
 * themselves. They are supplied to both the Position initializer
 * and the CrossZone behaviour.
 *
 * @see {@link '../initialize/Position.js'}
 * @see {@link '../behaviour/CrossZone.js'}
 * @abstract
 */
let Zone$1 = class Zone {
  /**
   * Constructs a Zone instance.
   *
   * @param {string} type - The zone type
   * @return void
   */
  constructor(type = ZONE_TYPE_ABSTRACT) {
    this.type = type;
    this.vector = new Vector3D(0, 0, 0);
    this.random = 0;
    this.crossType = 'dead';
    this.log = true;
    this.supportsCrossing = true;
  }

  getPosition() {
    return null;
  }

  crossing(particle) {
    if (!this.supportsCrossing) {
      return console.warn(
        `${this.constructor.name} does not support the crossing method`
      );
    }

    switch (this.crossType) {
      case 'bound':
        this._bound(particle);
        break;

      case 'cross':
        this._cross(particle);
        break;

      case 'dead':
        this._dead(particle);
        break;
    }
  }

  /**
   * Determines if this zone is a BoxZone.
   *
   * @return {boolean}
   */
  isBoxZone() {
    return false;
  }

  /**
   * Determines if this zone is a LineZone.
   *
   * @return {boolean}
   */
  isLineZone() {
    return false;
  }

  /**
   * Determines if this zone is a MeshZone.
   *
   * @return {boolean}
   */
  isMeshZone() {
    return false;
  }

  /**
   * Determines if this zone is a PointZone.
   *
   * @return {boolean}
   */
  isPointZone() {
    return false;
  }

  /**
   * Determines if this zone is a ScreenZone.
   *
   * @return {boolean}
   */
  isScreenZone() {
    return false;
  }

  /**
   * Determines if this zone is a SphereZone.
   *
   * @return {boolean}
   */
  isSphereZone() {
    return false;
  }

  /**
   * Sets the particle's dead property to true if required.
   *
   * @param {Particle} particle
   * @abstract
   */
  _dead(particle) {} //eslint-disable-line

  /**
   * @abstract
   */
  _bound(particle) {} //eslint-disable-line

  /**
   * @abstract
   */
  _cross(particle) {} //eslint-disable-line
};

class BoxZone extends Zone$1 {
  /**
   * BoxZone is a box zone
   * @param {Number|Vector3D} x - the position's x value or a Vector3D Object
   * @param {Number} y - the position's y value
   * @param {Number} z - the position's z value
   * @param {Number} w - the Box's width
   * @param {Number} h - the Box's height
   * @param {Number} d - the Box's depth
   * @example
   * var boxZone = new BoxZone(0,0,0,50,50,50);
   * or
   * var boxZone = new BoxZone(new Vector3D(0,0,0), 50, 50, 50);
   * @extends {Zone}
   * @constructor
   */
  constructor(a, b, c, d, e, f) {
    super(ZONE_TYPE_BOX);

    // TODO this reassigning of arguments is pretty dangerous, need to fix it.
    // eslint-disable-next-line
    var x, y, z, w, h, d;

    if (Util.isUndefined(b, c, d, e, f)) {
      x = y = z = 0;
      w = h = d = a || 100;
    } else if (Util.isUndefined(d, e, f)) {
      x = y = z = 0;
      w = a;
      h = b;
      d = c;
    } else {
      x = a;
      y = b;
      z = c;
      w = d;
      h = e;
      d = f;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.width = w;
    this.height = h;
    this.depth = d;
    // TODO Set this via an argument to the constructor
    this.friction = 0.85;
    // TODO Set this via an argument to the constructor
    this.max = 6;
  }

  /**
   * Returns true to indicate this is a BoxZone.
   *
   * @return {boolean}
   */
  isBoxZone() {
    return true;
  }

  getPosition() {
    this.vector.x = this.x + MathUtils.randomAToB(-0.5, 0.5) * this.width;
    this.vector.y = this.y + MathUtils.randomAToB(-0.5, 0.5) * this.height;
    this.vector.z = this.z + MathUtils.randomAToB(-0.5, 0.5) * this.depth;

    return this.vector;
  }

  _dead(particle) {
    if (particle.position.x + particle.radius < this.x - this.width / 2)
      particle.dead = true;
    else if (particle.position.x - particle.radius > this.x + this.width / 2)
      particle.dead = true;

    if (particle.position.y + particle.radius < this.y - this.height / 2)
      particle.dead = true;
    else if (particle.position.y - particle.radius > this.y + this.height / 2)
      particle.dead = true;

    if (particle.position.z + particle.radius < this.z - this.depth / 2)
      particle.dead = true;
    else if (particle.position.z - particle.radius > this.z + this.depth / 2)
      particle.dead = true;
  }

  _bound(particle) {
    if (particle.position.x - particle.radius < this.x - this.width / 2) {
      particle.position.x = this.x - this.width / 2 + particle.radius;
      particle.velocity.x *= -this.friction;
      this._static(particle, 'x');
    } else if (particle.position.x + particle.radius > this.x + this.width / 2) {
      particle.position.x = this.x + this.width / 2 - particle.radius;
      particle.velocity.x *= -this.friction;
      this._static(particle, 'x');
    }

    if (particle.position.y - particle.radius < this.y - this.height / 2) {
      particle.position.y = this.y - this.height / 2 + particle.radius;
      particle.velocity.y *= -this.friction;
      this._static(particle, 'y');
    } else if (particle.position.y + particle.radius > this.y + this.height / 2) {
      particle.position.y = this.y + this.height / 2 - particle.radius;
      particle.velocity.y *= -this.friction;
      this._static(particle, 'y');
    }

    if (particle.position.z - particle.radius < this.z - this.depth / 2) {
      particle.position.z = this.z - this.depth / 2 + particle.radius;
      particle.velocity.z *= -this.friction;
      this._static(particle, 'z');
    } else if (particle.position.z + particle.radius > this.z + this.depth / 2) {
      particle.position.z = this.z + this.depth / 2 - particle.radius;
      particle.velocity.z *= -this.friction;
      this._static(particle, 'z');
    }
  }

  _static(particle, axis) {
    if (particle.velocity[axis] * particle.acceleration[axis] > 0) return;
    if (
      Math.abs(particle.velocity[axis]) <
      Math.abs(particle.acceleration[axis]) * 0.0167 * this.max
    ) {
      particle.velocity[axis] = 0;
      particle.acceleration[axis] = 0;
    }
  }

  _cross(particle) {
    // 如果粒子的最右侧超出box的最左侧 并且粒子还在 向左移动 那么粒子的 x 值设为box的左侧
    if (
      particle.position.x + particle.radius < this.x - this.width / 2 &&
      particle.velocity.x <= 0
    )
      particle.position.x = this.x + this.width / 2 + particle.radius;
    else if (
      particle.position.x - particle.radius > this.x + this.width / 2 &&
      particle.velocity.x >= 0
    )
      particle.position.x = this.x - this.width / 2 - particle.radius;

    if (
      particle.position.y + particle.radius < this.y - this.height / 2 &&
      particle.velocity.y <= 0
    )
      particle.position.y = this.y + this.height / 2 + particle.radius;
    else if (
      particle.position.y - particle.radius > this.y + this.height / 2 &&
      particle.velocity.y >= 0
    )
      particle.position.y = this.y - this.height / 2 - particle.radius;

    if (
      particle.position.z + particle.radius < this.z - this.depth / 2 &&
      particle.velocity.z <= 0
    )
      particle.position.z = this.z + this.depth / 2 + particle.radius;
    else if (
      particle.position.z - particle.radius > this.z + this.depth / 2 &&
      particle.velocity.z >= 0
    )
      particle.position.z = this.z - this.depth / 2 - particle.radius;
  }
}

class LineZone extends Zone$1 {
  /**
   * LineZone is a 3d line zone
   * @param {Number|Vector3D} x1 - the line's start point of x value or a Vector3D Object
   * @param {Number|Vector3D} y1 - the line's start point of y value or a Vector3D Object
   * @param {Number} z1 - the line's start point of z value
   * @param {Number} x2 - the line's end point of x value
   * @param {Number} y2 - the line's end point of y value
   * @param {Number} z2 - the line's end point of z value
   * @example
   * var lineZone = new System.LineZone(0,0,0,100,100,0);
   * or
   * var lineZone = new System.LineZone(new System.Vector3D(0,0,0),new System.Vector3D(100,100,0));
   * @extends {Zone}
   * @constructor
   */
  constructor(x1, y1, z1, x2, y2, z2) {
    super(ZONE_TYPE_LINE);

    if (x1 instanceof Vector3D) {
      this.x1 = x1.x;
      this.y1 = x1.y;
      this.z1 = x1.z;

      this.x2 = x2.x;
      this.y2 = x2.y;
      this.z2 = x2.z;
    } else {
      this.x1 = x1;
      this.y1 = y1;
      this.z1 = z1;

      this.x2 = x2;
      this.y2 = y2;
      this.z2 = z2;
    }

    this.supportsCrossing = false;
  }

  /**
   * Returns true to indicate this is a LineZone.
   *
   * @return {boolean}
   */
  isLineZone() {
    return true;
  }

  getPosition() {
    this.random = Math.random();
    this.vector.x = this.x1 + this.random * (this.x2 - this.x1);
    this.vector.y = this.y1 + this.random * (this.y2 - this.y1);
    this.vector.z = this.z1 + this.random * (this.z2 - this.z1);

    return this.vector;
  }
}

/**
 * Uses a three THREE.Geometry to determine the zone parameters.
 *
 */
class MeshZone extends Zone$1 {
  /**
   * @constructs {MeshZone}
   *
   * @param {THREE.Geometry|Mesh} bounds - the geometry or mesh that will determine the zone bounds
   * @param {number} scale - the zone scale
   * @param {THREE.Geometry} ThreeGeometry - the three geometry class
   * @return void
   */
  constructor(bounds, scale = 1, ThreeGeometry) {
    super(ZONE_TYPE_MESH);

    this.geometry = null;
    this.scale = scale;
    this.supportsCrossing = false;

    if (bounds.type && bounds.type === 'Geometry') {
      this.geometry = bounds;
    }

    if (bounds.geometry) {
      this.geometry = bounds.geometry;
    }

    if (!this.geometry) {
      throw new Error(
        'MeshZone unable to set geometry from the supplied bounds'
      );
    }

    if (this.geometry.isBufferGeometry) {
      this.geometry = new ThreeGeometry().fromBufferGeometry(this.geometry);
    }
  }

  /**
   * Returns true to indicate this is a MeshZone.
   *
   * @return {boolean}
   */
  isMeshZone() {
    return true;
  }

  getPosition() {
    const vertices = this.geometry.getAttribute('position').array;
    const rVector = vertices[(vertices.length * Math.random()) >> 0];

    this.vector.x = rVector.x * this.scale;
    this.vector.y = rVector.y * this.scale;
    this.vector.z = rVector.z * this.scale;

    return this.vector;
  }
}

class PointZone extends Zone$1 {
  /**
   * PointZone is a point zone
   * @param {Number|Vector3D} x - the center's x value or a Vector3D Object
   * @param {Number} y - the center's y value
   * @param {Number} z - the center's z value
   * @example
   * var pointZone = new System.PointZone(0,30,10);
   * or
   * var pointZone = new System.PointZone(new System.Vector3D(0,30,10));
   * @extends {Zone}
   * @constructor
   */
  constructor(a, b, c) {
    super(ZONE_TYPE_POINT);

    // TODO see below, these should probably be assigned properly
    // eslint-disable-next-line
    var x;

    if (Util.isUndefined(a, b, c)) {
      x = 0;
    } else {
      x = a;
    }

    this.x = x;

    // TODO shouldn't this be set to y?
    this.y = x;

    // TODO shouldn't this be set to z?
    this.z = x;
    this.supportsCrossing = false;
  }

  /**
   * Returns true to indicate this is a PointZone.
   *
   * @return {boolean}
   */
  isPointZone() {
    return true;
  }

  getPosition() {
    this.vector.x = this.x;
    this.vector.y = this.y;
    this.vector.z = this.z;

    return this.vector;
  }
}

class ScreenZone extends Zone$1 {
  /**
   * ScreenZone is a 3d line zone
   * @param {Number|Vector3D} x1 - the line's start point of x value or a Vector3D Object
   * @param {Number|Vector3D} y1 - the line's start point of y value or a Vector3D Object
   * @param {Number} z1 - the line's start point of z value
   * @param {Number} x2 - the line's end point of x value
   * @param {Number} y2 - the line's end point of y value
   * @param {Number} z2 - the line's end point of z value
   * @example
   * var lineZone = new ScreenZone(0,0,0,100,100,0);
   * or
   * var lineZone = new ScreenZone(new Vector3D(0,0,0),new Vector3D(100,100,0));
   * @extends {Zone}
   * @constructor
   */
  constructor(camera, renderer, dis, dir) {
    super(ZONE_TYPE_SCREEN);

    this.camera = camera;
    this.renderer = renderer;
    this.dis = dis || 20;
    dir = dir || '1234';

    for (var i = 1; i < 5; i++) this['d' + i] = dir.indexOf(i + '') >= 0;
  }

  /**
   * Returns true to indicate this is a ScreenZone.
   *
   * @return {boolean}
   */
  isScreenZone() {
    return true;
  }

  _dead(particle) {
    var pos = THREEUtil.toScreenPos(
      particle.position,
      this.camera,
      this.renderer.domElement
    );
    var canvas = this.renderer.domElement;

    if (pos.y + particle.radius < -this.dis && this.d1) {
      particle.dead = true;
    } else if (pos.y - particle.radius > canvas.height + this.dis && this.d3) {
      particle.dead = true;
    }

    if (pos.x + particle.radius < -this.dis && this.d4) {
      particle.dead = true;
    } else if (pos.x - particle.radius > canvas.width + this.dis && this.d2) {
      particle.dead = true;
    }
  }

  _bound(particle) {
    var pos = THREEUtil.toScreenPos(
      particle.position,
      this.camera,
      this.renderer.domElement
    );
    var canvas = this.renderer.domElement;

    if (pos.y + particle.radius < -this.dis) {
      particle.velocity.y *= -1;
    } else if (pos.y - particle.radius > canvas.height + this.dis) {
      particle.velocity.y *= -1;
    }

    if (pos.x + particle.radius < -this.dis) {
      particle.velocity.y *= -1;
    } else if (pos.x - particle.radius > canvas.width + this.dis) {
      particle.velocity.y *= -1;
    }
  }
}

ScreenZone.prototype.getPosition = (function() {
  var vec2 = new Vector3D(),
    canvas;

  return function() {
    canvas = this.renderer.domElement;
    vec2.x = Math.random() * canvas.width;
    vec2.y = Math.random() * canvas.height;
    this.vector.copy(THREEUtil.toSpacePos(vec2, this.camera, canvas));

    return this.vector;
  };
})();

ScreenZone.prototype._cross = (function() {
  var vec2 = new Vector3D();

  return function(particle) {
    var pos = THREEUtil.toScreenPos(
      particle.position,
      this.camera,
      this.renderer.domElement
    );
    var canvas = this.renderer.domElement;

    if (pos.y + particle.radius < -this.dis) {
      vec2.x = pos.x;
      vec2.y = canvas.height + this.dis + particle.radius;
      particle.position.y = THREEUtil.toSpacePos(vec2, this.camera, canvas).y;
    } else if (pos.y - particle.radius > canvas.height + this.dis) {
      vec2.x = pos.x;
      vec2.y = -this.dis - particle.radius;
      particle.position.y = THREEUtil.toSpacePos(vec2, this.camera, canvas).y;
    }

    if (pos.x + particle.radius < -this.dis) {
      vec2.y = pos.y;
      vec2.x = canvas.width + this.dis + particle.radius;
      particle.position.x = THREEUtil.toSpacePos(vec2, this.camera, canvas).x;
    } else if (pos.x - particle.radius > canvas.width + this.dis) {
      vec2.y = pos.y;
      vec2.x = -this.dis - particle.radius;
      particle.position.x = THREEUtil.toSpacePos(vec2, this.camera, canvas).x;
    }
  };
})();

/**
 * A spherical zone for particles to be emitted within.
 *
 */
class SphereZone extends Zone$1 {
  /**
   * @constructs {SphereZone}
   *
   * @param {number} centerX - the sphere's center x coordinate
   * @param {number} centerY - the sphere's center y coordinate
   * @param {number} centerZ - the sphere's center z coordinate
   * @param {number} radius - the sphere's radius value
   * @return void
   */
  constructor(centerX, centerY, centerZ, radius) {
    super(ZONE_TYPE_SPHERE);

    // TODO see below, these should probably be assigned properly
    // eslint-disable-next-line
    let x, r;

    if (Util.isUndefined(centerY, centerZ, radius)) {
      x = 0;
      r = centerX || 100;
    } else {
      x = centerX;
      r = radius;
    }

    this.x = x;

    // TODO shouldn't this be set to y?
    this.y = x;

    // TODO shouldn't this be set to z?
    this.z = x;
    this.radius = r;
    this.the = this.phi = 0;
  }

  /**
   * Returns true to indicate this is a SphereZone.
   *
   * @return {boolean}
   */
  isSphereZone() {
    return true;
  }

  /**
   * Sets the particle to dead if the particle collides with the sphere.
   *
   * @param {object} particle
   * @return void
   */
  _dead(particle) {
    var d = particle.position.distanceTo(this);

    if (d - particle.radius > this.radius) particle.dead = true;
  }

  /**
   * Warns that this zone does not support the _cross method.
   *
   * @return void
   */
  _cross() {
    console.warn(`${this.constructor.name} does not support the _cross method`);
  }
}

SphereZone.prototype.getPosition = (function() {
  var tha, phi, r;

  return function() {
    this.random = Math.random();

    r = this.random * this.radius;
    tha = PI * Math.random(); //[0-pi]
    phi = PI * 2 * Math.random(); //[0-2pi]

    this.vector.x = this.x + r * Math.sin(tha) * Math.cos(phi);
    this.vector.y = this.y + r * Math.sin(phi) * Math.sin(tha);
    this.vector.z = this.z + r * Math.cos(tha);

    return this.vector;
  };
})();

SphereZone.prototype._bound = (function() {
  var normal = new Vector3D(),
    v = new Vector3D(),
    k;

  return function(particle) {
    var d = particle.position.distanceTo(this);

    if (d + particle.radius >= this.radius) {
      normal
        .copy(particle.position)
        .sub(this)
        .normalize();
      v.copy(particle.velocity);
      k = 2 * v.dot(normal);
      particle.velocity.sub(normal.scalar(k));
    }
  };
})();

var Zone = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BoxZone: BoxZone,
  LineZone: LineZone,
  MeshZone: MeshZone,
  PointZone: PointZone,
  ScreenZone: ScreenZone,
  SphereZone: SphereZone
});

/**
 * Sets the starting position property for initialized particles.
 * This is derived from a zone randomly chosen from those supplied to the constructor.
 *
 */
class Position extends Initializer$1 {
  /**
   * Constructs a Position initializer instance.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */
  constructor() {
    super(INITIALIZER_TYPE_POSITION);

    this.reset.apply(this, arguments);
  }

  /**
   * Resets the initializer properties.
   * Clears all previously set zones and resets the zones according to args passed.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */
  reset() {
    if (!this.zones) {
      this.zones = [];
    } else {
      this.zones.length = 0;
    }

    /**
     * @desc The zones to use as bounds for calculating the particle's starting position.
     * @type {array<Zone>}
     */
    this.zones = this.zones.concat(Array.prototype.slice.call(arguments));
  }

  /**
   * Adds a zone or zones to this.zones.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */
  addZone() {
    this.zones = this.zones.concat(Array.prototype.slice.call(arguments));
  }

  /**
   * Creates a Position initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {string} json.zoneType - The type of zone to use for initial position
   * @return {Position}
   */
  static fromJSON(json) {
    const { zoneType, ...params } = json;

    if (!SUPPORTED_JSON_ZONE_TYPES.includes(zoneType)) {
      throw new Error(
        `The zone type ${zoneType} is invalid or not yet supported`
      );
    }

    return new Position(new Zone[zoneType](...Object.values(params)));
  }
}

/**
 * Sets the particle's initial position.
 *
 * @param {Particle} particle - the particle to initialize the property on
 * @return void
 */
Position.prototype.initialize = (function() {
  let zone;

  return function(target) {
    zone = this.zones[(Math.random() * this.zones.length) >> 0];

    zone.getPosition();

    target.position.x = zone.vector.x;
    target.position.y = zone.vector.y;
    target.position.z = zone.vector.z;
  };
})();

/**
 * Sets the rotation property on initialized particles.
 *
 */
class Rotation extends Initializer$1 {
  /**
   * Constructs a Rotation property instance.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {boolean} [useEmitterRotation=true] - Determines if we should use the emitter's rotation as the starting rotation
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
   * @return void
   */
  constructor(x, y, z, useEmitterRotation=true, isEnabled = true) {
    super(INITIALIZER_TYPE_ROTATION, isEnabled);
    this.rotation = new Vector3(x,y,z);
    this.useEmitterRotation = useEmitterRotation;
  }

  /**
   * Sets the particle's initial rotation.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */
  initialize(particle) {
    if(this.useEmitterRotation)
    {
      // set initial particle rotation to that of the particle's emitter then add our set rotation
      particle.rotation.copy(particle.parent.rotation).add(this.rotation);
    }
    else
    {
      particle.rotation.copy(this.rotation);
    }
  }

  static fromJSON(json) {
    const { x, y, z, useEmitterRotation = true, isEnabled = true } = json;

    return new Rotation(x, y, z, useEmitterRotation, isEnabled);
  }
}

/**
 * Sets the radius property on initialized particles.
 *
 */
class Radius extends Initializer$1 {
  /**
   * Constructs a Radius initializer instance.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */
  constructor(width, height, center = false, isEnabled = true) {
    super(INITIALIZER_TYPE_RADIUS, isEnabled);

    /**
     * @desc The radius span which is used to set the particle radius value.
     * @type {Span}
     */
    this.radius = createSpan(width, height, center);
  }

  /**
   * Resets the initializer properties.
   * Clears all previously set zones and resets the zones according to args passed.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */
  reset(width, height, center = false) {
    this.radius = createSpan(width, height, center);
  }

  /**
   * Sets the particle's initial radius.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */
  initialize(particle) {
    particle.radius = this.radius.getValue();
    particle.transform.oldRadius = particle.radius;
  }

  /**
   * Creates a Radius initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.width - The width of the particle radius
   * @property {number} json.height - The height of the particle radius
   * @property {number} json.center - The center of the particle radius
   * @return {Radius}
   */
  static fromJSON(json) {
    const { width, height, center = false, isEnabled = true } = json;

    return new Radius(width, height, center, isEnabled);
  }
}

/**
 * Calculates the rate of particle emission.
 *
 * NOTE This doesn't need to be an initializer, it doesn't have an initialize
 * method, it overrides the base init method and it is only relevent to the Emitter class.
 * It would be better to move this to the Emitter module itself as a standalone class.
 *
 */
class Rate extends Initializer$1 {
  /**
   * Constructs a Rate instance.
   *
   * @param {number|array|Span} numPan - The number of particles to emit
   * @param {number|array|Span} timePan - The time between each particle emission
   * @return void
   */
  constructor(numPan = DEFAULT_RATE_NUM_PAN, timePan = DEFAULT_RATE_TIME_PAN) {
    super(INITIALIZER_TYPE_RATE);

    /**
     * @desc Sets the number of particles to emit.
     * @type {Span}
     */
    this.numPan = createSpan(numPan);

    /**
     * @desc Sets the time between each particle emission.
     * @type {Span}
     */
    this.timePan = createSpan(timePan);

    /**
     * @desc The rate's start time.
     * @type {number}
     */
    this.startTime = 0;

    /**
     * @desc The rate's next time.
     * @type {number}
     */
    this.nextTime = 0;

    this.init();
  }

  /**
   * Sets the startTime and nextTime properties.
   *
   * @return void
   */
  init() {
    this.startTime = 0;
    this.nextTime = this.timePan.getValue();
  }

  /**
   * Gets the number of particles to emit.
   *
   * @param {number} time - Current particle engine time
   * @return {number}
   */
  getValue(time) {
    this.startTime += time;

    if (this.startTime >= this.nextTime) {
      this.init();

      if (this.numPan.b == 1) {
        if (this.numPan.getValue('Float') > 0.5) return 1;
        else return 0;
      } else {
        return this.numPan.getValue('Int');
      }
    }

    return 0;
  }

  /**
   * Creates a Rate initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.particlesMin - The minimum number of particles to emit
   * @property {number} json.particlesMax - The maximum number of particles to emit
   * @property {number} json.perSecondMin - The minimum per second emit rate
   * @property {number} json.perSecondMax - The maximum per second emit rate
   * @return {Rate}
   */
  static fromJSON(json) {
    const { particlesMin, particlesMax, perSecondMin, perSecondMax } = json;

    return new Rate(
      new Span(particlesMin, particlesMax),
      new Span(perSecondMin, perSecondMax)
    );
  }
}

/**
 * Sets the body property to be a THREE.Sprite with a texture map on initialized particles.
 *
 */
class Texture extends Initializer$1 {
  /**
   * Constructs an Texture initializer.
   *
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} texture - The sprite texture
   * @param {object|undefined} materialProperties - The sprite material properties
   * @param {?Texture} loadedTexture - Preloaded THREE.Texture instance
   */
  constructor(
    
    loadedTexture,
    materialProperties = DEFAULT_MATERIAL_PROPERTIES,
    isEnabled = true
  ) {
    super(INITIALIZER_TYPE_TEXTURE, isEnabled);

    const { Sprite, SpriteMaterial } = THREE;

    /**
     * @desc The material properties for this object's SpriteMaterial
     * NOTE This is required for testing purposes
     * @type {object}
     */
    this.materialProperties = withDefaults(
      DEFAULT_MATERIAL_PROPERTIES,
      materialProperties
    );

    /**
     * @desc The texture for the THREE.SpriteMaterial map.
     * @type {Texture}
     */
    this.texture = loadedTexture;

    /**
     * @desc THREE.SpriteMaterial instance.
     * @type {SpriteMaterial}
     */
    this.material = new SpriteMaterial({
      ...{ map: loadedTexture },
      ...this.materialProperties,
    });

    /**
     * @desc THREE.Sprite instance.
     * @type {Sprite}
     */
    this.sprite = new Sprite(this.material);
  }

  /**
   * Sets the particle body to the sprite.
   *
   * @param {Particle} particle - The particle to set the body of
   * @return void
   */
  initialize(particle) {
    particle.body = this.sprite;
  }

  /**
   * Creates a Texture initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {Texture} json.loadedTexture - The loaded sprite texture
   * @param {object} json.materialProperties - The sprite material properties
   * @return {BodySprite}
   */
  static fromJSON(json) {
    const {
      loadedTexture,
      materialProperties = DEFAULT_JSON_MATERIAL_PROPERTIES,
      isEnabled = true,
    } = json;

    const ensureMappedBlendingMode = properties => {
      const { blending } = properties;

      return {
        ...properties,
        blending: blending
          ? SUPPORTED_MATERIAL_BLENDING_MODES[blending]
          : SUPPORTED_MATERIAL_BLENDING_MODES[
            DEFAULT_JSON_MATERIAL_PROPERTIES.blending
          ],
      };
    };

    return new Texture(
      
      loadedTexture,
      withDefaults(
        DEFAULT_JSON_MATERIAL_PROPERTIES,
        ensureMappedBlendingMode(materialProperties)
      ),
      isEnabled
    );
  }
}

/**
 * Abstract class for Velocity initializers.
 *
 */
class Velocity extends Initializer$1 {
  /**
   * Constructs a Velocity intitializer instance.
   *
   * @return void
   */
  constructor(type, isEnabled = true) {
    super(type, isEnabled);

    /**
     * @desc Directional vector
     * @type {Vector3D}
     */
    this.dirVec = new Vector3D(0, 0, 0);
  }

  normalize(vr) {
    return vr * MEASURE;
  }
}

/**
 * Sets the particle's initial velocity.
 *
 * @singleton
 * @param {Particle} particle - the particle to initialize the property on
 * @return void
 */
Velocity.prototype.initialize = (function() {
  var tha;
  var normal = new Vector3D(0, 0, 1);
  var v = new Vector3D(0, 0, 0);

  return function initialize(particle) {
    tha = this.tha * Math.random();
    this._useV && this.dirVec.copy(this.dir).scalar(this.radiusPan.getValue());

    MathUtils.getNormal(this.dirVec, normal);
    v.copy(this.dirVec).applyAxisAngle(normal, tha);
    v.applyAxisAngle(this.dirVec.normalize(), Math.random() * PI * 2);

    particle.velocity.copy(v);

    return this;
  };
})();

/**
 * Sets the velocity property on initialized particles.
 *
 */
class PolarVelocity extends Velocity {
  /**
   * Constructs a PolarVelocity initializer.
   *
   * @param {Polar3D} polar3d - The polar vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(polar3d, theta, isEnabled = true) {
    super(INITIALIZER_TYPE_POLAR_VELOCITY, isEnabled);

    /**
     * @desc Theta.
     * @type {number}
     */
    this.tha = theta * DR;

    /**
     * @desc Directional vector
     * @type {Vector3D}
     */
    this.dirVec = polar3d.toVector3D();

    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */
    this._useV = false;
  }

  /**
   * Creates a PolarVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.polarRadius - The Polar3D radius
   * @param {number} json.polarTheta - The Polar3D theta
   * @param {number} json.polarPhi - The Polar3D phi
   * @param {number} json.velocityTheta - The velocity theta
   * @return {PolarVelocity}
   */
  static fromJSON(json) {
    const {
      polarRadius,
      polarTheta,
      polarPhi,
      velocityTheta,
      isEnabled = true,
    } = json;

    return new PolarVelocity(
      new Polar3D(polarRadius, polarTheta, polarPhi),
      velocityTheta,
      isEnabled
    );
  }
}

/**
 * Sets the velocity property on initialized particles.
 *
 */
class RadialVelocity extends Velocity {
  /**
   * Constructs a RadialVelocity initializer.
   *
   * @param {number|Span} radius - The velocity radius
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(radius, vector3d, theta, isEnabled = true) {
    super(INITIALIZER_TYPE_RADIAL_VELOCITY, isEnabled);

    /**
     * @desc Velocity radius span.
     * @type {Span}
     */
    this.radiusPan = createSpan(radius);

    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */
    this.dir = vector3d.clone().normalize();

    /**
     * @desc Theta.
     * @type {number}
     */
    this.tha = theta * DR;

    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */
    this._useV = true;
  }

  /**
   * Creates a RadialVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.radius - The velocity radius
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {RadialVelocity}
   */
  static fromJSON(json) {
    const { radius, x, y, z, theta, isEnabled = true } = json;

    return new RadialVelocity(radius, new Vector3D(x, y, z), theta, isEnabled);
  }
}

/**
 * Sets the velocity property on initialized particles.
 *
 */
class VectorVelocity extends Velocity {
  /**
   * Constructs a VectorVelocity initializer.
   *
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(vector3d, theta, isEnabled = true) {
    super(INITIALIZER_TYPE_VECTOR_VELOCITY, isEnabled);

    /**
     * @desc Velocity radius span.
     * @type {Span}
     */
    this.radiusPan = createSpan(1);

    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */
    this.dir = vector3d.clone();

    /**
     * @desc Theta.
     * @type {number}
     */
    this.tha = theta * DR;

    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */
    this._useV = true;
  }

  /**
   * Creates a VectorVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {VectorVelocity}
   */
  static fromJSON(json) {
    const { x, y, z, theta, isEnabled = true } = json;

    return new VectorVelocity(new Vector3D(x, y, z), theta, isEnabled);
  }
}

var Initializer = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Body: Body,
  BodySprite: BodySprite,
  InitializerUtil: InitializerUtil,
  Life: Life,
  Mass: Mass,
  PolarVelocity: PolarVelocity,
  Position: Position,
  RadialVelocity: RadialVelocity,
  Radius: Radius,
  Rate: Rate,
  Rotation: Rotation,
  Texture: Texture,
  VectorVelocity: VectorVelocity
});

const DEFAULT_DAMPING = 0.006;
const DEFAULT_BIND_EMITTER = true;
const DEFAULT_EMITTER_RATE = new Rate(1, 0.1);
const DEFAULT_BIND_EMITTER_EVENT = false;
const DEFAULT_EMITTER_INDEX = undefined;

const EMITTER_TYPE_EMITTER = 'Emitter';
const EMITTER_TYPE_FOLLOW = 'FollowEmitter';

const { isNumber: isNumber$1, uid: uid$1} = Util;
/**
 * Emitters are the System engine's particle factories. They cause particles to
 * be rendered by emitting them, and store all particle initializers and behaviours.
 *
 */
class Emitter extends Particle {
  /**
   * Constructs an Emitter instance.
   *
   * @param {object} properties - The properties to instantiate the emitter with
   * @return void
   */
  constructor(properties) {
    super(properties);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = EMITTER_TYPE_EMITTER;

    /**
     * @desc The particles emitted by this emitter.
     * @type {array}
     */
    this.particles = [];

    /**
     * @desc The initializers for particles emitted by this emitter.
     * @type {array}
     */
    this.initializers = [];

    /**
     * @desc The behaviours for particles emitted by this emitter.
     * @type {array}
     */
    this.behaviours = [];

    /**
     * @desc The behaviours for the emitter.
     * @type {array}
     */
    this.emitterBehaviours = [];

    /**
     * @desc The current emit iteration.
     * @type {integer}
     */
    this.currentEmitTime = 0;

    /**
     * @desc The total number of times the emitter should emit particles.
     * @type {integer}
     */
    this.totalEmitTimes = -1;

    /**
     * @desc The friction coefficient for all particle to emit by.
     * @type {number}
     */
    this.damping = DEFAULT_DAMPING;

    /**
     * @desc Ensures that particles emitted by this emitter are positioned
     * according to the emitter's properties.
     * @type {boolean}
     */
    this.bindEmitter = DEFAULT_BIND_EMITTER;

    /**
     * @desc Determines if the emitter will dispatch internal events. Defaults
     * to false
     * @type {boolean}
     */
    this.bindEmitterEvent = DEFAULT_BIND_EMITTER_EVENT;

    /**
     * @desc The number of particles to emit per second (a [particle]/b [s])
     * @type {Rate}
     */
    this.rate = DEFAULT_EMITTER_RATE;

    /**
     * @desc Determines if the emitter is emitting particles or not.
     * @type {boolean}
     */
    this.isEmitting = false;

    /**
     * @desc The emitter's id.
     * @type {string}
     */
    this.id = `emitter-${uid$1()}`;
    this.cID = 0;
    this.name = 'Emitter';

    /**
     * @desc The index of the emitter as it is added to the system.
     * @type {number|undefined}
     */
    this.index = DEFAULT_EMITTER_INDEX;

    /**
     * @desc The emitter's internal event dispatcher.
     * @type {EventDispatcher}
     */
    this.eventDispatcher = new EventDispatcher();
  }

  /**
   * Proxy method for the internal event dispatcher's dispatchEvent method.
   *
   * @param {string} event - The event to dispatch
   * @param {object<Particle>} [target=this] - The event target
   */
  dispatch(event, target = this) {
    this.eventDispatcher.dispatchEvent(event, target);
  }

  /**
   * Sets the emitter rate.
   *
   * @param {Rate} rate - a rate initializer object
   * @return {Emitter}
   */
  setRate(rate) {
    this.rate = rate;

    return this;
  }

  /**
   * Sets the position of the emitter.
   *
   * @param {object} newPosition - an object the new x, y and z props
   * @return {Emitter}
   */
  setPosition(newPosition = {}) {
    const { position } = this;
    const { x = position.x, y = position.y, z = position.z } = newPosition;

    this.position.set(x, y, z);

    return this;
  }

  /**
   * Sets the rotation of the emitter.
   *
   * @param {object} newRotation - an object the new x, y and z props
   * @return {Emitter}
   */
  setRotation(newRotation = {}) {
    const { rotation } = this;
    const { x = rotation.x, y = rotation.y, z = rotation.z } = newRotation;

    this.rotation.set(x, y, z);

    return this;
  }

  /**
   * Sets the total number of times the emitter should emit particles as well as
   * the emitter's life. Also intializes the emitter rate.
   * This enables the emitter to emit particles.
   *
   * @param {number} [totalEmitTimes=Infinity] - the total number of times to emit particles
   * @param {number} [life=Infinity] - the life of this emitter in milliseconds
   * @return {Emitter}
   */
  emit(totalEmitTimes = Infinity, life = Infinity) {
    this.currentEmitTime = 0;
    this.totalEmitTimes = isNumber$1(totalEmitTimes) ? totalEmitTimes : Infinity;

    if (totalEmitTimes === 1) {
      this.life = totalEmitTimes;
    } else {
      this.life = isNumber$1(life) ? life : Infinity;
    }

    this.rate.init();
    this.isEmitting = true;

    return this;
  }

  /**
   * Experimental emit method that is designed to be called from the System.emit method.
   *
   * @return {Emitter}
   */
  experimental_emit() {
    const { isEmitting, totalEmitTimes, life } = this;

    if (!isEmitting) {
      this.currentEmitTime = 0;

      if (!totalEmitTimes) {
        this.setTotalEmitTimes(Infinity);
      }

      if (!life) {
        this.setLife(Infinity);
      }

      this.rate.init();
      this.isEmitting = true;
    }

    return this;
  }

  /**
   * Sets the total emit times for the emitter.
   *
   * @param {number} [totalEmitTimes=Infinity] - the total number of times to emit particles
   * @return {Emitter}
   */
  setTotalEmitTimes(totalEmitTimes = Infinity) {
    this.totalEmitTimes = isNumber$1(totalEmitTimes) ? totalEmitTimes : Infinity;

    return this;
  }

  /**
   * Sets the life of the emitter.
   *
   * @param {number} [life=Infinity] - the life of this emitter in milliseconds
   * @return {Emitter}
   */
  setLife(life = Infinity) {
    if (this.totalEmitTimes === 1) {
      this.life = this.totalEmitTimes;
    } else {
      this.life = isNumber$1(life) ? life : Infinity;
    }

    return this;
  }

  /**
   * Stops the emitter from emitting particles.
   *
   * @return void
   */
  stopEmit() {
    this.totalEmitTimes = -1;
    this.currentEmitTime = 0;
    this.isEmitting = false;
  }

  /**
   * Kills all of the emitter's particles.
   *
   * @return void
   */
  removeAllParticles() {
    let i = this.particles.length;

    while (i--) {
      this.particles[i].dead = true;
    }
  }

  /**
   * Adds a particle initializer to the emitter.
   * Each initializer is run on each particle when they are created.
   *
   * @param {Initializer} initializer - The initializer to add
   * @return {Emitter}
   */
  addInitializer(initializer) {
    this.initializers.push(initializer);

    return this;
  }

  /**
   * Adds multiple particle initializers to the emitter.
   *
   * @param {array<Initializer>} initializers - an array of particle initializers
   * @return {Emitter}
   */
  addInitializers(initializers) {
    let i = initializers.length;

    while (i--) {
      this.addInitializer(initializers[i]);
    }

    return this;
  }

  /**
   * Sets the emitter's particle initializers.
   *
   * @param {array<Initializer>} initializers - an array of particle initializers
   * @return {Emitter}
   */
  setInitializers(initializers) {
    this.initializers = initializers;

    return this;
  }

  /**
   * Removes an initializer from the emitter's initializers array.
   *
   * @param {Initializer} initializer - The initializer to remove
   * @return {Emitter}
   */
  removeInitializer(initializer) {
    const index = this.initializers.indexOf(initializer);

    if (index > -1) {
      this.initializers.splice(index, 1);
    }

    return this;
  }

  /**
   * Removes all initializers.
   *
   * @return {Emitter}
   */
  removeAllInitializers() {
    Util.destroyArray(this.initializers);

    return this;
  }

  /**
   * Adds a behaviour to the emitter. All emitter behaviours are added to each particle when
   * they are emitted.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the emitter
   * @return {Emitter}
   */
  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);

    return this;
  }

  /**
   * Adds multiple behaviours to the emitter.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */
  addBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addBehaviour(behaviours[i]);
    }

    return this;
  }

  /**
   * Sets the emitter's behaviours.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */
  setBehaviours(behaviours) {
    this.behaviours = behaviours;

    return this;
  }

  /**
   * Removes the behaviour from the emitter's behaviours array.
   *
   * @param {Behaviour} behaviour - The behaviour to remove
   * @return {Emitter}
   */
  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      this.behaviours.splice(index, 1);
    }

    return this;
  }

  /**
   * Removes all behaviours from the emitter.
   *
   * @return {Emitter}
   */
  removeAllBehaviours() {
    Util.destroyArray(this.behaviours);

    return this;
  }

  /**
   * Adds an emitter behaviour to the emitter.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the emitter
   * @return {Emitter}
   */
  addEmitterBehaviour(behaviour) {
    this.emitterBehaviours.push(behaviour);

    behaviour.initialize(this);

    return this;
  }

  /**
   * Adds multiple behaviours to the emitter.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */
  addEmitterBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addEmitterBehaviour(behaviours[i]);
    }

    return this;
  }

  /**
   * Sets the emitter's behaviours.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */
  setEmitterBehaviours(behaviours) {
    const length = behaviours.length;

    this.emitterBehaviours = behaviours;

    for (let i = 0; i < length; i++) {
      this.emitterBehaviours[i].initialize(this);
    }

    return this;
  }

  /**
   * Removes the behaviour from the emitter's behaviours array.
   *
   * @param {Behaviour} behaviour - The behaviour to remove
   * @return {Emitter}
   */
  removeEmitterBehaviour(behaviour) {
    const index = this.emitterBehaviours.indexOf(behaviour);

    if (index > -1) {
      this.emitterBehaviours.splice(index, 1);
    }

    return this;
  }

  /**
   * Removes all behaviours from the emitter.
   *
   * @return {Emitter}
   */
  removeAllEmitterBehaviours() {
    Util.destroyArray(this.emitterBehaviours);

    return this;
  }

  /**
   * Adds the event listener for the EMITTER_DEAD event.
   *
   * @param {onEmitterDead} - The function to call when the EMITTER_DEAD is dispatched.
   * @return {Emitter}
   */
  addOnEmitterDeadEventListener(onEmitterDead) {
    this.eventDispatcher.addEventListener(`${this.id}_${EMITTER_DEAD}`, () =>
      onEmitterDead()
    );

    return this;
  }

  /**
   * Creates a particle by retreiving one from the pool and setting it up with
   * the supplied initializer and behaviour.
   *
   * @return {Emitter}
   */
  createParticle() {
    const particle = this.parent.pool.get(Particle);
    const index = this.particles.length;

    this.setupParticle(particle, index);
    this.parent && this.parent.dispatch(PARTICLE_CREATED, particle);
    this.bindEmitterEvent && this.dispatch(PARTICLE_CREATED, particle);

    return particle;
  }

  /**
   * Sets up a particle by running all initializers on it and setting its behaviours.
   * Also adds the particle to this.particles.
   *
   * @param {Particle} particle - The particle to setup
   * @return void
   */
  setupParticle(particle, index) {
    const { initializers, behaviours } = this;

    InitializerUtil.initialize(this, particle, initializers);

    particle.addBehaviours(behaviours);
    particle.parent = this;
    particle.index = index;

    this.particles.push(particle);
  }

  /**
   * Updates the emitter according to the time passed by calling the generate
   * and integrate methods. The generate method creates particles, the integrate
   * method updates existing particles.
   *
   * If the emitter age is greater than time, the emitter is killed.
   *
   * This method also indexes/deindexes particles.
   *
   * @param {number} time - System engine time
   * @return void
   */
  update(time) {
    if (!this.isEmitting && this.particles.length === 0) {
      return;
    }

    this.age += time;

    if (this.dead || this.age >= this.life) {
      this.destroy();
    }

    if (this.isEmitting)
    {
      this.generate(time);
    }

    this.integrate(time);

    let i = this.particles.length;

    while (i--) {
      const particle = this.particles[i];

      if (particle.dead) {
        this.parent && this.parent.dispatch(PARTICLE_DEAD, particle);
        this.bindEmitterEvent && this.dispatch(PARTICLE_DEAD, particle);
        this.parent.pool.expire(particle.reset());
        this.particles.splice(i, 1);
        if(this.particles.length === 0)
        {
          this.parent && this.parent.dispatch(SYSTEM_UPDATE);
        }
      }
    }

    this.updateEmitterBehaviours(time);
  }

  /**
   * Updates the emitter's emitter behaviours.
   *
   * @param {number} time - System engine time
   * @return void
   */
  updateEmitterBehaviours(time) {
    if (this.sleep) {
      return;
    }

    const length = this.emitterBehaviours.length;

    for (let i = 0; i < length; i++) {
      this.emitterBehaviours[i].applyBehaviour(this, time, i);
    }
  }

  /**
   * Runs the integration algorithm on the emitter and all particles.
   * Updates the particles with the timstamp passed.
   *
   * @param {number} time - System engine time
   * @return void
   */
  integrate(time) {
    const integrationType = this.parent
      ? this.parent.integrationType
      : INTEGRATION_TYPE_EULER;
    const damping = 1 - this.damping;

    integrate(this, time, damping, integrationType);

    let index = this.particles.length;

    while (index--) {
      const particle = this.particles[index];

      particle.update(time, index);
      integrate(particle, time, damping, integrationType);

      this.parent && this.parent.dispatch(PARTICLE_UPDATE, particle);
      this.bindEmitterEvent && this.dispatch(PARTICLE_UPDATE, particle);
    }
  }

  /**
   * Generates new particles.
   *
   * @param {number} time - System engine time
   * @return void
   */
  generate(time) {
    if (this.totalEmitTimes === 1) {
      let i = this.rate.getValue(99999);

      if (i > 0) {
        this.cID = i;
      }

      while (i--) {
        this.createParticle();
      }

      this.totalEmitTimes = 0;

      return;
    }

    this.currentEmitTime += time;

    if (this.currentEmitTime < this.totalEmitTimes) {
      let i = this.rate.getValue(time);

      if (i > 0) {
        this.cID = i;
      }

      while (i--) {
        this.createParticle();
      }
    }
  }

  /**
   * Kills the emitter.
   *
   * @return void
   */
  destroy() {
    this.dead = true;
    this.energy = 0;
    this.totalEmitTimes = -1;

    if (this.particles.length == 0) {
      this.isEmitting = false;
      this.removeAllInitializers();
      this.removeAllBehaviours();
      this.dispatch(`${this.id}_${EMITTER_DEAD}`);

      this.parent && this.parent.removeEmitter(this);
    }
  }
}

const DEFAULT_LIFE = Infinity;
const DEFAULT_ATTRACITON_RADIUS = 1000;
const DEFAULT_ATTRACTION_FORCE_SCALAR = 100;
const DEFAULT_BEHAVIOUR_EASING = easeLinear;
const DEFAULT_RANDOM_DRIFT_DELAY = 0.03;
const PARTICLE_ALPHA_THRESHOLD = 0.002;
const PARTICLE_LENGTH_SQ_THRESHOLD = 0.000004;
const DEFAULT_CROSS_TYPE = 'dead';

const { isNumber, uid} = Util;

/**
 * The base behaviour class.
 * Behaviours manage a particle's behaviour after they have been emitted.
 *
 */
let Behaviour$1 = class Behaviour {
  /**
   * Constructs a Behaviour instance.
   *
   * @param {number} [life=Infinity] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   * @param {string} [type=BEHAVIOUR_TYPE_ABSTRACT] - The behaviour type
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(
    life = Infinity,
    easing = DEFAULT_BEHAVIOUR_EASING,
    type = BEHAVIOUR_TYPE_ABSTRACT,
    isEnabled = true
  ) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;

    /**
     * @desc Determines if the behaviour will be applied or not
     * @type {boolean}
     */
    this.isEnabled = isEnabled;

    /**
     * @desc The behaviour's id
     * @type {string} id
     */
    this.id = `behaviour-${uid()}`;

    /**
     * @desc The life of the behaviour
     * @type {number}
     */
    this.life = life;

    /**
     * @desc The behaviour's decaying trend
     * @type {function}
     */
    this.easing = easing;

    /**
     * @desc The age of the behaviour
     * @type {number}
     */
    this.age = 0;

    /**
     * @desc The energy of the behaviour
     * @type {number}
     */
    this.energy = 1;

    /**
     * Determines if the behaviour is dead or not
     * @type {boolean}
     */
    this.dead = false;
  }

  /**
   * Reset this behaviour's parameters
   *
   * @param {number} [life=DEFAULT_LIFE] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   */
  reset(life = DEFAULT_LIFE, easing = DEFAULT_BEHAVIOUR_EASING) {
    this.life = life;
    this.easing = easing || DEFAULT_BEHAVIOUR_EASING;
  }

  /**
   * Ensures that life is infinity if an invalid value is supplied.
   *
   * @return void
   */
  set life(life) {
    this._life = isNumber(life) ? life : DEFAULT_LIFE;
  }

  /**
   * Gets the behaviour's life.
   *
   * @return {Number}
   */
  get life() {
    return this._life;
  }

  /**
   * Normalize a force by 1:100;
   *
   * @param {Vector3D} force - The force to normalize.
   * @return {Vector3D}
   */
  normalizeForce(force) {
    return force.scalar(MEASURE);
  }

  /**
   * Normalize a value by 1:100;
   *
   * @param {number} value - The value to normalize
   * @return {number}
   */
  normalizeValue(value) {
    return value * MEASURE;
  }

  /**
   * Set the behaviour's initial properties on the particle.
   *
   * @param {Particle} particle
   * @abstract
   */
  initialize(particle) {} // eslint-disable-line

  /**
   * Apply behaviour to the target as a factor of time.
   * Internally calls the mutate method to change properties on the target
   * Will not do so if the behaviour is disabled
   *
   * @abstract
   * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
   * @param {Number} time - the system integration time
   * @param {integer} index - the target index
   * @return mixed
   */
  applyBehaviour(target, time, index) {
    if (!this.isEnabled) {
      return;
    }

    this.mutate(target, time, index);
  }

  /**
   * Change the target's properties according to specific behaviour logic.
   *
   * @abstract
   * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
   * @param {Number} time - the system integration time
   * @return mixed
   */
  mutate(target, time, index) {} // eslint-disable-line

  /**
   * Compares the age of the behaviour vs integration time and determines
   * if the behaviour should be set to dead or not.
   * Sets the behaviour energy as a factor of particle age and life.
   *
   * @param {Particle} particle - The particle to apply the behaviour to
   * @param {Number} time - the system integration time
   * @return void
   */
  energize(particle, time) {
    if (this.dead) {
      return;
    }

    this.age += time;

    if (this.age >= this.life) {
      this.energy = 0;
      this.dead = true;

      return;
    }

    const scale = this.easing(particle.age / particle.life);

    this.energy = Math.max(1 - scale, 0);
  }

  /**
   * Destory this behaviour.
   *
   * @abstract
   */
  destroy() {}

  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @abstract
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Behaviour}
   */
  fromJSON(json) {} // eslint-disable-line
};

/**
 * Behaviour that applies an alpha transition effect to particles.
 *
 */
class Alpha extends Behaviour$1 {
  /**
   * Constructs an Alpha behaviour instance.
   *
   * @param {number} alphaA - The starting alpha value
   * @param {?number} alphaB - The ending alpha value
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(alphaA = 1, alphaB = null, life, easing, isEnabled = true) {
    super(life, easing, BEHAVIOUR_TYPE_ALPHA, isEnabled);

    /**
     * @desc The starting alpha value
     * @type {number|Span}
     */
    this.alphaA = alphaA;

    /**
     * @desc The ending alpha value
     * @type {number|Span}
     */
    this.alphaB = alphaB;

    this.reset(alphaA, alphaB);
  }

  /**
   * Gets the _same property which determines if the alpha are the same.
   *
   * @return {boolean}
   */
  get same() {
    return this._same;
  }

  /**
   * Sets the _same property which determines if the alpha are the same.
   *
   * @param {boolean} same
   * @return {boolean}
   */
  set same(same) {
    /**
     * @type {boolean}
     */
    this._same = same;
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {number} alphaA - the starting alpha value
   * @param {?number} alphaB - the ending alpha value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */
  reset(alphaA = 1, alphaB = null, life, easing) {
    this.same = alphaB === null || alphaB === undefined ? true : false;
    this.alphaA = createSpan(alphaA);
    this.alphaB = createSpan(alphaB);

    life && super.reset(life, easing);
  }

  /**
   * Initializes the behaviour on a particle.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */
  initialize(particle) {
    particle.useAlpha = true;
    particle.transform.alphaA = this.alphaA.getValue();

    particle.transform.alphaB = this.same
      ? particle.transform.alphaA
      : this.alphaB.getValue();
  }

  /**
   * Mutates the target's alpha/opacity property.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    particle.alpha = MathUtils.lerp(
      particle.transform.alphaA,
      particle.transform.alphaB,
      this.energy
    );

    if (particle.alpha < PARTICLE_ALPHA_THRESHOLD) {
      particle.alpha = 0;
    }
  }

  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.alphaA - The starting alpha value
   * @property {number} json.alphaB - The ending alpha value
   * @property {number} json.life - The life of the behaviour
   * @property {string} json.easing - The easing equation to use for transforms
   * @return {Body}
   */
  static fromJSON(json) {
    const { alphaA, alphaB, life, easing, isEnabled = true } = json;

    return new Alpha(alphaA, alphaB, life, getEasingByName(easing), isEnabled);
  }
}

/**
 * Behaviour that causes particles to be attracted to a target position.
 *引力 朝着某个位置靠近
 */
class Attraction extends Behaviour$1 {
  /**
   * Constructs an Attraction behaviour instance.
   *
   * @param {Vector3D} targetPosition - The position the particles will be attracted to
   * @param {number} force - The attraction force scalar multiplier
   * @param {number} radius - The attraction radius
   * @param {number} [life=DEFAULT_LIFE] - The life of the particle
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(
    targetPosition = new Vector3D(),
    force = DEFAULT_ATTRACTION_FORCE_SCALAR,
    radius = DEFAULT_ATTRACITON_RADIUS,
    life = DEFAULT_LIFE,
    easing = DEFAULT_BEHAVIOUR_EASING,
    isEnabled = true
  ) {
    super(life, easing, BEHAVIOUR_TYPE_ATTRACTION, isEnabled);

    /**
     * @desc The position the particles will be attracted to
     * @type {Vector3D}
     */
    this.targetPosition = targetPosition;

    /**
     * @desc The attraction radius
     * @type {number} - the attraction radius
     */
    this.radius = radius;

    /**
     * @desc The attraction force scalar multiplier
     * @type {number}
     */
    this.force = this.normalizeValue(force);

    /**
     * @desc The radius of the attraction squared
     * @type {number}
     */
    this.radiusSq = this.radius * this.radius;

    /**
     * @desc The attraction force in 3D space
     * @type {Vector3D}
     */
    this.attractionForce = new Vector3D();

    /**
     * @desc The linear attraction force
     * @type {number}
     */
    this.lengthSq = 0;
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {Vector3D} targetPosition - the position the particles will be attracted to
   * @param {number} force - the attraction force multiplier
   * @param {number} radius - the attraction radius
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  reset(
    targetPosition = new Vector3D(),
    force = DEFAULT_ATTRACTION_FORCE_SCALAR,
    radius = DEFAULT_ATTRACITON_RADIUS,
    life,
    easing
  ) {
    this.targetPosition = targetPosition;
    this.radius = radius;
    this.force = this.normalizeValue(force);
    this.radiusSq = this.radius * this.radius;
    this.attractionForce = new Vector3D();
    this.lengthSq = 0;

    life && super.reset(life, easing);
  }

  /**
   * Mutates particle acceleration.
   *
   * @param {Particle} particle - the particle to apply the behaviour to
   * @param {number} time - particle engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    this.attractionForce.copy(this.targetPosition);
    this.attractionForce.sub(particle.position);

    this.lengthSq = this.attractionForce.lengthSq();

    if (
      this.lengthSq > PARTICLE_LENGTH_SQ_THRESHOLD &&
      this.lengthSq < this.radiusSq
    ) {
      this.attractionForce.normalize();
      this.attractionForce.scalar(1 - this.lengthSq / this.radiusSq);
      this.attractionForce.scalar(this.force);

      particle.acceleration.add(this.attractionForce);
    }
  }

  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.x - The target position x value
   * @property {number} json.y - The target position y value
   * @property {number} json.z - The target position z value
   * @property {number} json.force - The attraction force scalar multiplier
   * @property {number} json.life - The life of the particle
   * @property {string} json.easing - The behaviour's decaying trend
   * @return {Body}
   */
  static fromJSON(json) {
    const { x, y, z, force, radius, life, easing, isEnabled = true } = json;

    return new Attraction(
      new Vector3D(x, y, z),
      force,
      radius,
      life,
      getEasingByName(easing),
      isEnabled
    );
  }
}

/**
 * Behaviour that causes particles to move away from other particles they collide with.
 * 粒子碰撞之后相互远离
 */
class Collision extends Behaviour$1 {
  /**
   * Constructs a Collision behaviour instance.
   *
   * @param {Emitter} emitter - The emitter containing the particles to detect collisions against
   * @param {boolean} useMass - Determiens whether to use mass or not
   * @param {function} onCollide - Function to call when particles collide
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(emitter, useMass, onCollide, life, easing, isEnabled = true) {
    super(life, easing, BEHAVIOUR_TYPE_COLLISION, isEnabled);

    this.reset(emitter, useMass, onCollide);
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {Emitter} emitter - The emitter containing the particles to detect collisions against
   * @param {boolean} useMass - Determiens whether to use mass or not
   * @param {function} onCollide - Function to call when particles collide
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  reset(emitter, useMass, onCollide, life, easing) {
    this.emitter = emitter;
    this.useMass = useMass;
    this.onCollide = onCollide;
    this.particles = [];
    this.delta = new Vector3D();

    life && super.reset(life, easing);
  }

  /**
   * Detects collisions with other particles and calls the
   * onCollide function on colliding particles.
   *
   * @param {Particle} particle - the particle to apply the behaviour to
   * @param {number} time - particle engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    const particles = this.emitter
      ? this.emitter.particles.slice(index)
      : this.particles.slice(index);

    let otherParticle, lengthSq, overlap, distance, averageMass1, averageMass2;

    let i = particles.length;

    while (i--) {
      otherParticle = particles[i];

      if (otherParticle == particle) {
        continue;
      }

      this.delta.copy(otherParticle.position).sub(particle.position);

      lengthSq = this.delta.lengthSq();
      distance = particle.radius + otherParticle.radius;

      if (lengthSq <= distance * distance) {
        overlap = distance - Math.sqrt(lengthSq);
        overlap += 0.5;

        averageMass1 = this._getAverageMass(particle, otherParticle);
        averageMass2 = this._getAverageMass(otherParticle, particle);

        particle.position.add(
          this.delta
            .clone()
            .normalize()
            .scalar(overlap * -averageMass1)
        );

        otherParticle.position.add(
          this.delta.normalize().scalar(overlap * averageMass2)
        );

        this.onCollide && this.onCollide(particle, otherParticle);
      }
    }
  }

  /**
   * Gets the average mass of both particles.
   *
   * @param {Particle} particleA - The first particle
   * @param {Particle} particleB - The second particle
   * @return {number}
   */
  _getAverageMass(particleA, particleB) {
    return this.useMass
      ? particleB.mass / (particleA.mass + particleB.mass)
      : 0.5;
  }

  // TODO
  fromJSON(json) {} // eslint-disable-line
}

/**
 * A behaviour which mutates the color of a particle over time.
 *
 */
class Color extends Behaviour$1 {
  /**
   * Constructs a Color behaviour instance.
   *
   * @param {number|string} colorA - the starting color
   * @param {number|string} colorB - the ending color
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(colorA, colorB, life, easing, isEnabled = true) {
    super(life, easing, BEHAVIOUR_TYPE_COLOR, isEnabled);

    this.reset(colorA, colorB);
  }

  /**
   * Gets the _same property which determines if the alpha are the same.
   *
   * @return {boolean}
   */
  get same() {
    return this._same;
  }

  /**
   * Sets the _same property which determines if the alpha are the same.
   *
   * @param {boolean} same
   * @return {boolean}
   */
  set same(same) {
    /**
     * @type {boolean}
     */
    this._same = same;
  }

  reset(colorA, colorB, life, easing) {
    this.same = colorB === null || colorB === undefined ? true : false;

    this.colorA = createColorSpan(colorA);
    this.colorB = createColorSpan(colorB);
    life && super.reset(life, easing);
  }

  initialize(particle) {
    particle.transform.colorA = ColorUtil.getRGB(this.colorA.getValue());

    particle.useColor = true;
    particle.transform.colorB = this.same
      ? particle.transform.colorA
      : ColorUtil.getRGB(this.colorB.getValue());
  }

  mutate(particle, time, index) {
    this.energize(particle, time, index);

    if (!this._same) {
      particle.color.r = MathUtils.lerp(
        particle.transform.colorA.r,
        particle.transform.colorB.r,
        this.energy
      );
      particle.color.g = MathUtils.lerp(
        particle.transform.colorA.g,
        particle.transform.colorB.g,
        this.energy
      );
      particle.color.b = MathUtils.lerp(
        particle.transform.colorA.b,
        particle.transform.colorB.b,
        this.energy
      );
    } else {
      particle.color.r = particle.transform.colorA.r;
      particle.color.g = particle.transform.colorA.g;
      particle.color.b = particle.transform.colorA.b;
    }
  }

  /**
   * Creates a Color initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.colorA - The starting color
   * @property {number} json.colorB - The ending color
   * @property {number} json.life - The life of the particle
   * @property {string} json.easing - The behaviour's decaying trend
   * @return {Color}
   */
  static fromJSON(json) {
    const { colorA, colorB, life, easing, isEnabled = true } = json;

    return new Color(colorA, colorB, life, getEasingByName(easing), isEnabled);
  }
}

/**
 * Behaviour that allows for specific functions to be called on particles when
 * they interact with a zone.
 *
 */
class CrossZone extends Behaviour$1 {
  /**
   * Constructs a CrossZone behaviour instance.
   *
   * @param {Zone} zone - the zone used to apply to particles with this behaviour
   * @param {string} [crossType=DEFAULT_CROSS_TYPE] - enum of cross types, valid strings include 'dead', 'bound', 'cross'
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   */
  constructor(zone, crossType, life, easing, isEnabled) {
    super(life, easing, BEHAVIOUR_TYPE_CROSS_ZONE, isEnabled);

    this.reset(zone, crossType);
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {Zone} zone - the zone used to apply to particles with this behaviour
   * @param {string} [crossType=DEFAULT_CROSS_TYPE] - enum of cross types, valid strings include 'dead', 'bound', 'cross'
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   */
  reset(zone, crossType = DEFAULT_CROSS_TYPE, life, easing) {
    /**
     * @desc The zone used to apply to particles with this behaviour
     * @type {Zone}
     */
    this.zone = zone;
    this.zone.crossType = crossType;

    life && super.reset(life, easing);
  }

  /**
   * Applies the behaviour to the particle.
   *
   * @see {@link '../zone/Zone.js'} crossing
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    this.zone.crossing.call(this.zone, particle);
  }

  /**
   * Creates a CrossZone initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @return {CrossZone}
   */
  static fromJSON(json) {
    const {
      zoneType,
      zoneParams,
      crossType,
      life,
      easing,
      isEnabled = true,
    } = json;

    const zone = new Zone[zoneType](...Object.values(zoneParams));

    return new CrossZone(
      zone,
      crossType,
      life,
      getEasingByName(easing),
      isEnabled
    );
  }
}

/**
 * Behaviour that forces particles along a specific axis.
 *
 */
class Force extends Behaviour$1 {
  /**
   * Constructs a Force behaviour instance.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(fx, fy, fz, life, easing, isEnabled = true) {
    super(life, easing, BEHAVIOUR_TYPE_FORCE, isEnabled);

    this.reset(fx, fy, fz);
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   */
  reset(fx, fy, fz) {
    /**
     * @desc The normalized force to exert on the particle in
     * @type {Vector3D}
     */
    this.force = this.normalizeForce(new Vector3D(fx, fy, fz));

    /**
     * @desc The id of the force vector
     * @property {number} this.force.id
     */
    this.force.id = Math.random();
  }

  /**
   * Mutates the particle.acceleration property.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    particle.acceleration.add(this.force);
  }

  /**
   * Creates a Force initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @return {Force}
   */
  static fromJSON(json) {
    const { fx, fy, fz, life, easing, isEnabled = true } = json;

    return new Force(fx, fy, fz, life, getEasingByName(easing), isEnabled);
  }
}

/**
 * Behaviour that forces particles down the y axis.
 *
 */
class Gravity extends Force {
  /**
   * Constructs a Gravity behaviour instance.
   *
   * @param {number} gravity - the force to pull the particle down the y axis
   * @param {number} life - the life of the particle
   * @param {string} easing - the easing equation to use
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(gravity, life, easing, isEnabled = true) {
    super(0, -gravity, 0, life, easing, isEnabled);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = BEHAVIOUR_TYPE_GRAVITY;
  }

  static fromJSON(json) {
    const { gravity, life, easing, isEnabled = true } = json;

    return new Gravity(gravity, life, getEasingByName(easing), isEnabled);
  }
}

/**
 * Behaviour that causes particles to drift to random coordinates in 3D space.
 *或许可以叫他 分子热运动
 */
class RandomDrift extends Behaviour$1 {
  /**
   * Constructs a RandomDrift behaviour instance.
   *
   * @param {number} driftX - x axis drift
   * @param {number} driftY - y axis drift
   * @param {number} driftZ - z axis drift
   * @param {number} [delay=DEFAULT_RANDOM_DRIFT_DELAY] - drift delay
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  constructor(
    driftX,
    driftY,
    driftZ,
    delay = DEFAULT_RANDOM_DRIFT_DELAY,
    life,
    easing,
    isEnabled = true
  ) {
    super(life, easing, BEHAVIOUR_TYPE_RANDOM_DRIFT, isEnabled);

    this.reset(driftX, driftY, driftZ, delay);

    /**
     * @desc Internal time used for calculating drift vs internal delay.
     * @type {number}
     */
    this.time = 0;
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {number} driftX - x axis drift
   * @param {number} driftY - y axis drift
   * @param {number} driftZ - z axis drift
   * @param {number} [delay=DEFAULT_RANDOM_DRIFT_DELAY] - drift delay
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   */
  reset(
    driftX,
    driftY,
    driftZ,
    delay = DEFAULT_RANDOM_DRIFT_DELAY,
    life,
    easing
  ) {
    /**
     * @desc A Vector3D that stores the drift properties.
     * @type {Vector3D}
     */
    this.randomForce = this.normalizeForce(
      new Vector3D(driftX, driftY, driftZ)
    );
    /**
     * @desc A Span containing the delay supplied.
     * @type {Span}
     */
    this.delayPan = createSpan(delay);
    this.time = 0;

    life && super.reset(life, easing);
  }

  /**
   * Mutates the particle.acceleration property.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    this.time += time;

    if (this.time >= this.delayPan.getValue()) {
      const ax = MathUtils.randomAToB(-this.randomForce.x, this.randomForce.x);
      const ay = MathUtils.randomAToB(-this.randomForce.y, this.randomForce.y);
      const az = MathUtils.randomAToB(-this.randomForce.z, this.randomForce.z);

      particle.acceleration.addValue(ax, ay, az);

      this.time = 0;
    }
  }

  static fromJSON(json) {
    const { x, y, z, delay, life, easing, isEnabled = true } = json;

    return new RandomDrift(
      x,
      y,
      z,
      delay,
      life,
      getEasingByName(easing),
      isEnabled
    );
  }
}

/**
 * Behaviour that causes particles to be repelled from a target position.
 *
 */
class Repulsion extends Attraction {
  /**
   * Constructs an Repulsion behaviour instance.
   *
   * @param {Vector3D} targetPosition - The position the particles will be repelled from
   * @param {number} force - The repulsion force scalar multiplier
   * @param {number} radius - The repulsion radius
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  constructor(targetPosition, force, radius, life, easing, isEnabled = true) {
    super(targetPosition, force, radius, life, easing, isEnabled);

    /**
     * @desc Repulsion is attraction with negative force.
     * @type {number}
     */
    this.force *= -1;

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = BEHAVIOUR_TYPE_REPULSION;
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {Vector3D} targetPosition - the position the particles will be attracted to
   * @param {number} force - the attraction force multiplier
   * @param {number} radius - the attraction radius
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  reset(targetPosition, force, radius, life, easing) {
    super.reset(targetPosition, force, radius, life, easing);
    this.force *= -1;
  }

  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.x - The target position x value
   * @property {number} json.y - The target position y value
   * @property {number} json.z - The target position z value
   * @property {number} json.force - The attraction force scalar multiplier
   * @property {number} json.life - The life of the particle
   * @property {string} json.easing - The behaviour's decaying trend
   * @return {Body}
   */
  static fromJSON(json) {
    const { x, y, z, force, radius, life, easing, isEnabled = true } = json;

    return new Repulsion(
      new Vector3D(x, y, z),
      force,
      radius,
      life,
      getEasingByName(easing),
      isEnabled
    );
  }
}

/**
 * Behaviour that rotates particles.
 */
class Rotate extends Behaviour$1 {
  /**
   * Constructs a Rotate behaviour instance.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(x, y, z, life, easing, isEnabled = true) {
    super(life, easing, BEHAVIOUR_TYPE_ROTATE, isEnabled);

    this.reset(x, y, z);
  }

  /**
   * Gets the rotation type.
   *
   * @return {string}
   */
  get rotationType() {
    return this._rotationType;
  }

  /**
   * Sets the rotation type.
   *
   * @param {string}
   * @return void
   */
  set rotationType(rotationType) {
    /**
     * @desc The rotation type. ENUM of ['same', 'set', 'to', 'add'].
     * @type {string}
     */
    this._rotationType = rotationType;
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */
  reset(x, y, z, life, easing) {
    /**
     * @desc X axis rotation.
     * @type {number|Span}
     */
    this.x = x || 0;

    /**
     * @desc Y axis rotation.
     * @type {number|Span}
     */
    this.y = y || 0;

    /**
     * @desc Z axis rotation.
     * @type {number|Span}
     */
    this.z = z || 0;

    if (x === undefined || x == 'same') {
      this.rotationType = 'same';
    } else if (y == undefined) {
      this.rotationType = 'set';
    } else if (z === undefined) {
      this.rotationType = 'to';
    } else {
      this.rotationType = 'add';
      this.x = createSpan(this.x * DR);
      this.y = createSpan(this.y * DR);
      this.z = createSpan(this.z * DR);
    }

    life && super.reset(life, easing);
  }

  /**
   * Initializes the behaviour on a particle.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */
  initialize(particle) {
    switch (this.rotationType) {
      case 'same':
        break;

      case 'set':
        this._setRotation(particle.rotation, this.x);
        break;

      case 'to':
        particle.transform.fR = particle.transform.fR || new Vector3D();
        particle.transform.tR = particle.transform.tR || new Vector3D();
        this._setRotation(particle.transform.fR, this.x);
        this._setRotation(particle.transform.tR, this.y);
        break;

      case 'add':
        particle.transform.addR = new Vector3D(
          this.x.getValue(),
          this.y.getValue(),
          this.z.getValue()
        );
        break;
    }
  }

  /**
   * Sets the particle's rotation prior to the behaviour being applied.
   *
   * NOTE It's hard to see here, but this is mutating the particle's rotation
   * even though the particle is not being passed in directly.
   *
   * NOTE the else if below will never be reached because the value being passed in
   * will never be of type Vector3D.
   *
   * @param {Vector3D} particleRotation - the particle's rotation vector
   * @param {string|number} value - the value to set the rotation value to, if 'random'
   * rotation is randomised
   * @return void
   */
  _setRotation(particleRotation, value) {
    particleRotation = particleRotation || new Vector3D();
    if (value == 'random') {
      var x = MathUtils.randomAToB(-PI, PI);
      var y = MathUtils.randomAToB(-PI, PI);
      var z = MathUtils.randomAToB(-PI, PI);

      particleRotation.set(x, y, z);
    }
    // we can't ever get here because value will never be a Vector3D!
    // consider refactoring to
    //  if (value instance of Span) { vec3.add(value.getValue()); }
    else if (value instanceof Vector3D) {
      particleRotation.copy(value);
    }
  }

  /**
   * Mutates the particle.rotation property.
   *
   * @see http://stackoverflow.com/questions/21622956/how-to-convert-direction-vector-to-euler-angles
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    switch (this.rotationType) {
      // orients the particle in the direction it is moving
      case 'same':
        if (!particle.rotation) {
          particle.rotation = new Vector3D();
        }

        particle.rotation.copy(particle.velocity);
        break;

      case 'set':
        //
        break;

      case 'to':
        particle.rotation.x = MathUtils.lerp(
          particle.transform.fR.x,
          particle.transform.tR.x,
          this.energy
        );
        particle.rotation.y = MathUtils.lerp(
          particle.transform.fR.y,
          particle.transform.tR.y,
          this.energy
        );
        particle.rotation.z = MathUtils.lerp(
          particle.transform.fR.z,
          particle.transform.tR.z,
          this.energy
        );
        break;

      case 'add':
        particle.rotation.add(particle.transform.addR);
        break;
    }
  }

  static fromJSON(json) {
    const { x, y, z, life, easing, isEnabled = true } = json;

    return new Rotate(x, y, z, life, getEasingByName(easing), isEnabled);
  }
}

/**
 * Behaviour that scales particles.
 *
 */
class Scale extends Behaviour$1 {
  /**
   * Constructs a Scale behaviour instance.
   *
   * @param {number} scaleA - the starting scale value
   * @param {?number} scaleB - the ending scale value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(scaleA, scaleB, life, easing, isEnabled = true) {
    super(life, easing, BEHAVIOUR_TYPE_SCALE, isEnabled);

    this.reset(scaleA, scaleB);
  }

  /**
   * Gets the _same property which determines if the scale props are the same.
   *
   * @return {boolean}
   */
  get same() {
    return this._same;
  }

  /**
   * Sets the _same property which determines if the scale props are the same.
   *
   * @param {boolean} same
   * @return {boolean}
   */
  set same(same) {
    /**
     * @type {boolean}
     */
    this._same = same;
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {number} scaleA - the starting scale value
   * @param {?number} scaleB - the ending scale value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */
  reset(scaleA, scaleB, life, easing) {
    this.same = scaleB === null || scaleB === undefined ? true : false;

    /**
     * @desc The starting scale.
     * @type {Span}
     */
    this.scaleA = createSpan(scaleA || 1);

    /**
     * @desc The ending scale.
     * @type {Span}
     */
    this.scaleB = createSpan(scaleB);

    life && super.reset(life, easing);
  }

  /**
   * Initializes the behaviour on a particle.
   * Stores initial values for comparison and mutation in the applyBehaviour method.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */
  initialize(particle) {
    particle.transform.scaleA = this.scaleA.getValue();
    particle.transform.oldRadius = particle.radius;

    particle.transform.scaleB = this.same
      ? particle.transform.scaleA
      : this.scaleB.getValue();
  }

  /**
   * Applies the behaviour to the particle.
   * Mutates the particle's scale and its radius according to this scale.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    particle.scale = MathUtils.lerp(
      particle.transform.scaleA,
      particle.transform.scaleB,
      this.energy
    );

    if (particle.scale < 0.0005) {
      particle.scale = 0;
    }

    particle.radius = particle.transform.oldRadius * particle.scale;
  }

  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Spring}
   */
  static fromJSON(json) {
    const { scaleA, scaleB, life, easing, isEnabled = true } = json;

    return new Scale(scaleA, scaleB, life, getEasingByName(easing), isEnabled);
  }
}

/**
 * Behaviour that causes particles to spring.
 *
 */
class Spring extends Behaviour$1 {
  /**
   * Constructs a Spring behaviour instance.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(x, y, z, spring, friction, life, easing, isEnabled = true) {
    super(life, easing, BEHAVIOUR_TYPE_SPRING, isEnabled);

    this.reset(x, y, z, spring, friction);
  }

  /**
   * Resets the behaviour properties.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @return void
   */
  reset(x, y, z, spring, friction) {
    if (!this.pos) {
      this.pos = new Vector3D(x, y, z);
    } else {
      this.pos.set(x, y, z);
    }

    this.spring = spring || 0.1;
    this.friction = friction || 0.98;
  }

  /**
   * Applies the behaviour to the particle.
   * Mutates the particle's velocity according to this.pos and this.spring.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */
  mutate(particle, time, index) {
    this.energize(particle, time, index);

    particle.velocity.x += (this.pos.x - particle.position.x) * this.spring;
    particle.velocity.y += (this.pos.y - particle.position.y) * this.spring;
    particle.velocity.z += (this.pos.z - particle.position.z) * this.spring;
  }

  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Spring}
   */
  static fromJSON(json) {
    const { x, y, z, spring, friction, life, easing, isEnabled = true } = json;

    return new Spring(
      x,
      y,
      z,
      spring,
      friction,
      life,
      getEasingByName(easing),
      isEnabled
    );
  }
}

var Behaviour = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Alpha: Alpha,
  Attraction: Attraction,
  Behaviour: Behaviour$1,
  Collision: Collision,
  Color: Color,
  CrossZone: CrossZone,
  Force: Force,
  Gravity: Gravity,
  RandomDrift: RandomDrift,
  Repulsion: Repulsion,
  Rotate: Rotate,
  Scale: Scale,
  Spring: Spring
});

/**
 * Makes a rate instance.
 *
 * @param {object} json - The data required to construct a Rate instance
 * @return {Rate}
 */
const makeRate$1 = json => Rate.fromJSON(json);

/**
 * Makes initializers from json items.
 *
 * @param {array<object>} items - An array of objects which provide initializer constructor params
 * @param {object} THREE - The Web GL Api to use
 * @return {array<Initializer>}
 */
const makeInitializers$1 = (items) => {
  const initializers = [];

  items.forEach(data => {
    const { type, properties } = data;

    if (!SUPPORTED_JSON_INITIALIZER_TYPES.includes(type)) {
      throw new Error(
        `The initializer type ${type} is invalid or not yet supported`
      );
    }

    if (INITIALIZER_TYPES_THAT_REQUIRE_THREE.includes(type)) {
      initializers.push(Initializer[type].fromJSON(properties));
    } else {
      initializers.push(Initializer[type].fromJSON(properties));
    }
  });

  return initializers;
};

/**
 * Makes behaviours from json items.
 *
 * @param {array<object>} items - An array of objects which provide behaviour constructor params
 * @return {array<Behaviour>}
 */
const makeBehaviours$1 = items => {
  const behaviours = [];

  items.forEach(data => {
    const { type, properties } = data;

    if (!SUPPORTED_JSON_BEHAVIOUR_TYPES.includes(type)) {
      throw new Error(
        `The behaviour type ${type} is invalid or not yet supported`
      );
    }

    behaviours.push(Behaviour[type].fromJSON(properties));
  });

  return behaviours;
};

/**
 * Creates a System instance from a JSON object.
 *
 * @deprecated Use fromJSONAsync instead.
 *
 * @param {object} json - The JSON to create the System instance from
 * @param {object} THREE - The Web GL Api to use
 * @param {function} System - The system class
 * @param {function} Emitter - The emitter class
 * @param {number} json.preParticles - The predetermined number of particles
 * @param {string} json.integrationType - The integration algorithm to use
 * @param {array<object>} json.emitters - The emitters for the system instance
 * @return {System}
 */
var fromJSON = (json, System, Emitter) => {
  const {
    preParticles = POOL_MAX,
    integrationType = EULER,
    emitters = [],
  } = json;
  const system = new System( preParticles, integrationType);

  emitters.forEach(data => {
    const emitter = new Emitter();
    const {
      rate,
      rotation,
      initializers,
      behaviours,
      emitterBehaviours = [],
      position,
      totalEmitTimes = Infinity,
      life = Infinity,
    } = data;

    emitter
      .setRate(makeRate$1(rate))
      .setRotation(rotation)
      .setInitializers(makeInitializers$1(initializers))
      .setBehaviours(makeBehaviours$1(behaviours))
      .setEmitterBehaviours(makeBehaviours$1(emitterBehaviours))
      .setPosition(position)
      .emit(totalEmitTimes, life);

    system.addEmitter(emitter);
  });

  return system;
};

const DEFAULT_OPTIONS = { shouldAutoEmit: true };

/**
 * Makes a rate instance.
 *
 * @param {object} json - The data required to construct a Rate instance
 * @return {Rate}
 */
const makeRate = json => Rate.fromJSON(json);

/**
 * Makes initializers from json items.
 *
 * @param {array<object>} items - An array of objects which provide initializer constructor params
 * @param {object} THREE - The Web GL Api to use
 * @return {array<Initializer>}
 */
const makeInitializers = (items) =>
  new Promise((resolve, reject) => {
    if (!items.length) {
      return resolve([]);
    }

    const numberOfInitializers = items.length;
    const madeInitializers = [];
    const doNotRequireTextureLoading = items.filter(
      ({ properties }) => !properties.texture
    );
    const doRequireTextureLoading = items.filter(
      ({ properties }) => properties.texture
    );

    doNotRequireTextureLoading.forEach(data => {
      const { type, properties } = data;

      if (!SUPPORTED_JSON_INITIALIZER_TYPES.includes(type)) {
        return reject(
          `The initializer type ${type} is invalid or not yet supported`
        );
      }

      if (INITIALIZER_TYPES_THAT_REQUIRE_THREE.includes(type)) {
        madeInitializers.push(Initializer[type].fromJSON(properties));
      } else {
        madeInitializers.push(Initializer[type].fromJSON(properties));
      }

      if (madeInitializers.length === numberOfInitializers) {
        return resolve(madeInitializers);
      }
    });

    doRequireTextureLoading.forEach(data => {
      const {
        type,
        properties,
        properties: { texture },
      } = data;
      const textureLoader = new TextureLoader();

      if (!SUPPORTED_JSON_INITIALIZER_TYPES.includes(type)) {
        return reject(
          `The initializer type ${type} is invalid or not yet supported`
        );
      }

      textureLoader.load(
        texture,
        loadedTexture => {
          madeInitializers.push(
            Texture.fromJSON(
              {
                ...properties,
                loadedTexture,
              },
            )
          );

          if (madeInitializers.length === numberOfInitializers) {
            return resolve(madeInitializers);
          }
        },
        undefined,
        reject
      );
    });
  });

/**
 * Makes behaviours from json items.
 *
 * @param {array<object>} items - An array of objects which provide behaviour constructor params
 * @return {Promise<array>}
 */
const makeBehaviours = items =>
  new Promise((resolve, reject) => {
    if (!items.length) {
      return resolve([]);
    }

    const numberOfBehaviours = items.length;
    const madeBehaviours = [];

    items.forEach(data => {
      const { type, properties } = data;

      if (!SUPPORTED_JSON_BEHAVIOUR_TYPES.includes(type)) {
        return reject(
          `The behaviour type ${type} is invalid or not yet supported`
        );
      }

      madeBehaviours.push(Behaviour[type].fromJSON(properties));

      if (madeBehaviours.length === numberOfBehaviours) {
        return resolve(madeBehaviours);
      }
    });
  });

const makeEmitters = (emitters, Emitter,  shouldAutoEmit) =>
  new Promise((resolve, reject) => {
    if (!emitters.length) {
      return resolve([]);
    }

    const madeEmitters = [];
    const numberOfEmitters = emitters.length;

    if (!numberOfEmitters) {
      return resolve(madeEmitters);
    }

    emitters.forEach(data => {
      const emitter = new Emitter();
      const {
        rate,
        rotation,
        initializers,
        behaviours,
        emitterBehaviours = [],
        position,
        totalEmitTimes = Infinity,
        life = Infinity,
      } = data;

      emitter
        .setRate(makeRate(rate))
        .setRotation(rotation)
        .setPosition(position);

      makeInitializers(initializers)
        .then(madeInitializers => {
          emitter.setInitializers(madeInitializers);

          return makeBehaviours(behaviours);
        })
        .then(madeBehaviours => {
          emitter.setBehaviours(madeBehaviours);

          return makeBehaviours(emitterBehaviours);
        })
        .then(madeEmitterBehaviours => {
          emitter.setEmitterBehaviours(madeEmitterBehaviours);

          return Promise.resolve(emitter);
        })
        .then(emitter => {
          madeEmitters.push(
            shouldAutoEmit
              ? emitter.emit(totalEmitTimes, life)
              : emitter.setTotalEmitTimes(totalEmitTimes).setLife(life)
          );

          if (madeEmitters.length === numberOfEmitters) {
            return resolve(madeEmitters);
          }
        })
        .catch(reject);
    });
  });

/**
 * Creates a System instance from a JSON object.
 *
 * @param {object} json - The JSON to create the System instance from
 * @param {number} json.preParticles - The predetermined number of particles
 * @param {string} json.integrationType - The integration algorithm to use
 * @param {array<object>} json.emitters - The emitters for the system instance
 * @param {object} THREE - The Web GL Api to use
 * @param {function} System - The system class
 * @param {function} Emitter - The emitter class
 * @param {object} [options={}] - Optional config options
 * @return {Promise<System>}
 */
var fromJSONAsync = (json,  System, Emitter, options = {}) =>
  new Promise((resolve, reject) => {
    const {
      preParticles = POOL_MAX,
      integrationType = EULER,
      emitters = [],
    } = json;
    const system = new System(preParticles, integrationType);
    const { shouldAutoEmit } = { ...DEFAULT_OPTIONS, ...options };

    makeEmitters(emitters, Emitter,  shouldAutoEmit)
      .then(madeEmitters => {
        const numberOfEmitters = madeEmitters.length;

        if (!numberOfEmitters) {
          return resolve(system);
        }

        madeEmitters.forEach(madeEmitter => {
          system.addEmitter(madeEmitter);

          if (system.emitters.length === numberOfEmitters) {
            resolve(system);
          }
        });
      })
      .catch(reject);
  });

/**
 * The core of the three-system particle engine.
 * A System instance can contain multiple emitters, each with their own initializers
 * and behaviours.
 *
 */
class System {
  /**
   * Constructs a System instance.
   *
   * @param {object} THREE - ThreeJs
   * @param {number} [preParticles=POOL_MAX] - The number of particles to start with
   * @param {string} [integrationType=INTEGRATION_TYPE_EULER] - The integration type to use
   * @return void
   */
  constructor(
    preParticles = POOL_MAX,
    integrationType = INTEGRATION_TYPE_EULER
  ) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = CORE_TYPE_SYSTEM;

    /**
     * @desc Determines if the system can update or not. Set to false when destroying
     * to ensure that external calls to update do not throw errors.
     * @type {boolean}
     */
    this.canUpdate = true;

    /**
     * @desc The number of particles to start with.
     * @type {number}
     */
    this.preParticles = preParticles;

    /**
     * @desc The integration algorithm type to use.
     * @param {string}
     */
    this.integrationType = integrationType;

    /**
     * @desc The emitters in the particle system.
     * @type {array<Emitter>}
     */
    this.emitters = [];

    /**
     * @desc The renderers for the system.
     * @type {array<Renderer>}
     */
    this.renderers = [];

    /**
     * @desc A pool used to manage the internal system cache of objects
     * @type {Pool}
     */
    this.pool = new Pool();

    /**
     * @desc Internal event dispatcher
     * @type {EventDispatcher}
     */
    this.eventDispatcher = new EventDispatcher();
  }

  /**
   * Creates a System instance from a JSON object.
   *
   * @param {object} json - The JSON to create the System instance from
   * @param {object} THREE - The Web GL Api to use eg., THREE
   * @return {System}
   *
   * @deprecated use fromJSONAsync instead
   */
  static fromJSON(json, ) {
    return fromJSON(json,  System, Emitter);
  }

  /**
   * Loads a System instance from JSON asynchronously. Ensures all textures are
   * fully loaded before resolving with the instantiated System instance.
   *
   * @param {object} json - The JSON to create the System instance from
   * @param {object} THREE - The Web GL Api to use eg., THREE
   * @param {?object} options - Optional config options
   * @return {Promise<System>}
   */
  static fromJSONAsync(json,  options) {
    return fromJSONAsync(json,  System, Emitter, options);
  }

  /**
   * Proxy method for the internal event dispatcher's dispatchEvent method.
   *
   * @param {string} event - The event to dispatch
   * @param {object<System|Emitter|Particle>} [target=this] - The event target
   */
  dispatch(event, target = this) {
    this.eventDispatcher.dispatchEvent(event, target);
  }

  /**
   * Adds a renderer to the System instance and initializes it.
   *
   * @param {Renderer} renderer - The renderer to add
   * @return {System}
   */
  addRenderer(renderer) {
    this.renderers.push(renderer);
    renderer.init(this);

    return this;
  }

  /**
   * Removes a renderer from the System instance.
   *
   * @param {Renderer} renderer
   * @return {System}
   */
  removeRenderer(renderer) {
    this.renderers.splice(this.renderers.indexOf(renderer), 1);
    renderer.remove(this);

    return this;
  }

  /**
   * Adds an emitter to the System instance.
   * Dispatches the EMITTER_ADDED event.
   *
   * @param {Emitter} emitter - The emitter to add
   * @return {System}
   */
  addEmitter(emitter) {
    const index = this.emitters.length;

    emitter.parent = this;
    emitter.index = index;

    this.emitters.push(emitter);
    this.dispatch(EMITTER_ADDED, emitter);

    return this;
  }

  /**
   * Removes an emitter from the System instance.
   * Dispatches the EMITTER_REMOVED event.
   *
   * @param {Emitter} emitter - The emitter to remove
   * @return {System}
   */
  removeEmitter(emitter) {
    if (emitter.parent !== this) {
      return this;
    }

    emitter.parent = null;
    emitter.index = undefined;

    this.emitters.splice(this.emitters.indexOf(emitter), 1);
    this.dispatch(EMITTER_REMOVED, emitter);

    return this;
  }

  /**
   * Wires up life cycle methods and causes a system's emitters to emit particles.
   * Expects emitters to have their totalEmitTimes and life set already.
   * Inifnite systems will resolve immediately.
   *
   * @param {object} hooks - Functions to hook into the life cycle API
   * @param {function} hooks.onStart - Called when the system starts to emit particles
   * @param {function} hooks.onUpdate - Called each time the system updates
   * @param {function} hooks.onEnd - Called when the system's emitters have all died
   * @return {Promise}
   */
  emit({ onStart, onUpdate, onEnd }) {
    if (onStart) {
      onStart();
    }

    if (onUpdate) {
      this.eventDispatcher.addEventListener(SYSTEM_UPDATE, onUpdate);
    }

    const emitters = this.emitters.map(emitter => {
      const { life } = emitter;

      if (life === Infinity) {
        if (onEnd) {
          onEnd();
        }

        emitter.experimental_emit();

        return Promise.resolve();
      }

      return new Promise(resolve => {
        emitter.addOnEmitterDeadEventListener(() => {
          if (onEnd) {
            onEnd();
          }

          resolve();
        });

        emitter.experimental_emit();
      });
    });

    try {
      return Promise.all(emitters);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Updates the particle system based on the delta passed.
   *
   * @example
   * animate = () => {
   *   threeRenderer.render(threeScene, threeCamera);
   *   system.update();
   *   requestAnimationFrame(animate);
   * }
   * animate();
   *
   * @param {number} delta - Delta time
   * @return {Promise}
   */
  update(delta = DEFAULT_SYSTEM_DELTA) {
    const d = delta || DEFAULT_SYSTEM_DELTA;

    if (this.canUpdate) {
      if (d > 0) {
        let i = this.emitters.length;

        while (i--) {
          const emitter = this.emitters[i];

          emitter.update(d);
          emitter.particles.length && this.dispatch(SYSTEM_UPDATE);
        }
      }

      this.dispatch(SYSTEM_UPDATE_AFTER);
    }

    return Promise.resolve();
  }

  /**
   * Gets a count of the total number of particles in the system.
   *
   * @return {integer}
   */
  getCount() {
    const length = this.emitters.length;

    let total = 0;

    let i;

    for (i = 0; i < length; i++) {
      total += this.emitters[i].particles.length;
    }

    return total;
  }

  /**
   * Destroys all emitters, renderers and the Nebula pool.
   * Ensures that this.update will not perform any operations while the system
   * is being destroyed.
   *
   * @return void
   */
  destroy() {
    const length = this.emitters.length;

    this.canUpdate = false;

    for (let e = 0; e < length; e++) {
      this.emitters[e] && this.emitters[e].destroy();
      delete this.emitters[e];
    }

    for (let r = 0; r < length; r++) {
      if (this.renderers[r] && this.renderers[r].destroy) {
        this.renderers[r].destroy();
        delete this.renderers[r];
      }
    }

    this.emitters.length = 0;
    this.pool.destroy();
    this.canUpdate = true;
  }
}

const DEFAULT_SIZE = 15;
const DEFAULT_POSITION = 0;

/**
 * @exports Debug - methods and helpers for debugging System emitters, zones and particles.
 * @requires THREE - { SphereGeometry, BoxGeometry, MeshBasicMaterial, OctahedronGeometry, Mesh }
 */
var Debug = {
  /**
   * Adds an event listener to the system instance's SYSTEM_UPDATE event.
   *
   * @param {System} system - the system instance
   * @param {function} onSystemUpdated - the function to call when system has been updated
   * @return {Debug}
   */
  addEventListener: function(system, onSystemUpdated) {
    system.eventDispatcher.addEventListener('SYSTEM_UPDATE', onSystemUpdated);

    return this;
  },

  /**
   * Draws a wireframe mesh around the zone for debugging purposes.
   *
   * @param {System} system - the system instance
   * @param {object} container - a three Object3D (usually the scene)
   * @param {Zone} zone - a Zone instance
   * @return void
   */
  drawZone: function( system, container, zone = {}) {
    const color = '#2194ce';
    const wireframe = true;
    const {
      width = DEFAULT_SIZE,
      height = DEFAULT_SIZE,
      depth = DEFAULT_SIZE,
      radius = DEFAULT_SIZE,
      x = DEFAULT_POSITION,
      y = DEFAULT_POSITION,
      z = DEFAULT_POSITION,
    } = zone;

    let geometry;

    if (zone.isPointZone()) {
      geometry = new SphereGeometry(15);
    }

    if (zone.isLineZone()) ;

    if (zone.isBoxZone()) {
      geometry = new BoxGeometry(width, height, depth);
    }

    if (zone.isSphereZone()) {
      geometry = new SphereGeometry(radius, DEFAULT_SIZE, DEFAULT_SIZE);
    }

    if (zone.isMeshZone()) {
      geometry = zone.geometry.geometry
        ? zone.geometry.geometry.clone()
        : zone.geometry.clone();
    }

    if (!geometry) {
      geometry = new BoxGeometry(width, height, depth);
    }

    const material = new MeshBasicMaterial({ color, wireframe });
    // NOTE! geometry.clone is required for UNKNOWN reasons,
    // three does not render the mesh correctly without doing this since r88
    const mesh = new Mesh(geometry.clone(), material);

    container.add(mesh);

    this.addEventListener(system, function() {
      mesh.position.set(x, y, z);
    });
  },

  /**
   * Draws a mesh for each particle emitted in order to help debug particles.
   *
   * @param {object} system - the system instance
   * @param {object} container - a three Object3D (usually the scene)
   * @param {object} emitter - the emitter to debug
   * @param {string} color - the color for the debug mesh material
   * @return void
   */
  drawEmitter: function(THREE, system, container, emitter, color) {
    const geometry = new OctahedronGeometry(DEFAULT_SIZE);
    const material = new MeshBasicMaterial({
      color: color || '#aaa',
      wireframe: true,
    });
    // NOTE! geometry.clone is required for UNKNOWN reasons,
    // three does not render the mesh correctly without doing this since r88
    const mesh = new Mesh(geometry.clone(), material);

    container.add(mesh);

    this.addEventListener(system, function() {
      mesh.position.copy(emitter.position);
      mesh.rotation.set(
        emitter.rotation.x,
        emitter.rotation.y,
        emitter.rotation.z
      );
    });
  },

  /**
   * Renders emitter / particle information into the info element.
   *
   * @param {object} system - the system instance
   * @param {integer} style - style to apply (see the addInfo method's switch statement)
   * @return void
   */
  renderInfo: (function() {
    function getCreatedNumber(type, system) {
      var pool = type == 'material' ? '_materialPool' : '_targetPool';
      var renderer = system.renderers[0];

      return renderer[pool].cID;
    }

    function getEmitterPos(system) {
      var e = system.emitters[0];

      return (
        Math.round(e.p.x) + ',' + Math.round(e.p.y) + ',' + Math.round(e.p.z)
      );
    }

    return function(system, style) {
      this.addInfo(style);
      var str = '';

      switch (this._infoType) {
        case 2:
          str += 'emitter:' + system.emitters.length + '<br>';
          str += 'em speed:' + system.emitters[0].cID + '<br>';
          str += 'pos:' + getEmitterPos(system);
          break;

        case 3:
          str += system.renderers[0].name + '<br>';
          str += 'target:' + getCreatedNumber('target') + '<br>';
          str += 'material:' + getCreatedNumber('material');
          break;

        default:
          str += 'particles:' + system.getCount() + '<br>';
          str += 'pool:' + system.pool.getCount() + '<br>';
          str += 'total:' + (system.getCount() + system.pool.getCount());
      }
      this._infoCon.innerHTML = str;
    };
  })(),

  /**
   * Appends the info element into the dom.
   *
   * @param {integer} style - the style type to apply
   * @return void
   */
  addInfo: (function() {
    return function(style) {
      var self = this;

      if (!this._infoCon) {
        this._infoCon = document.createElement('div');
        this._infoCon.style.cssText = [
          'position:fixed;bottom:0px;left:0;cursor:pointer;',
          'opacity:0.9;z-index:10000;padding:10px;font-size:12px;',
          'width:120px;height:50px;background-color:#002;color:#0ff;',
        ].join('');

        this._infoType = 1;
        this._infoCon.addEventListener(
          'click',
          function() {
            self._infoType++;
            if (self._infoType > 3) self._infoType = 1;
          },
          false
        );

        var bg, color;

        switch (style) {
          case 2:
            bg = '#201';
            color = '#f08';
            break;

          case 3:
            bg = '#020';
            color = '#0f0';
            break;

          default:
            bg = '#002';
            color = '#0ff';
        }

        this._infoCon.style['background-color'] = bg;
        this._infoCon.style['color'] = color;
      }

      if (!this._infoCon.parentNode) document.body.appendChild(this._infoCon);
    };
  })(),
};

/**
 * You can use this emit particles.
 *
 * This method will console.log the fixed number of your info  in updata or requestAnimationFrame
 *
 * use like this log('+12',mc); log 12 times
 *
 * @return void
 */
function log() {
  let once = 0;

  if (window.console && window.console.trace) {
    var arg = Array.prototype.slice.call(arguments);
    var s1 = arguments[0] + '';

    if (s1.indexOf('+') == 0) {
      var n = parseInt(arguments[0]);

      if (once < n) {
        arg.shift();
        console.trace.apply(console, arg);
        once++;
      }
    } else {
      arg.unshift('+15');
      this.apply(console, arg);
    }
  }
}

class FollowEmitter extends Emitter {
  /**
   * The FollowEmitter class inherits from System.Emitter
   *
   * use the FollowEmitter will emit particle when mousemoving
   *
   * @class System.FollowEmitter
   * @constructor
   * @param {Element} mouseTarget mouseevent's target;
   * @param {Number} ease the easing of following speed;
   * @default 0.7
   * @param {Object} pObj the parameters object;
   */
  constructor(mouseTarget, ease, pObj) {
    super(pObj);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = EMITTER_TYPE_FOLLOW;
    this.mouseTarget = Util.initValue(mouseTarget, window);
    this.ease = Util.initValue(ease, 0.7);
    this._allowEmitting = false;
    this.initEventHandler();
  }

  initEventHandler() {
    var self = this;

    this.mousemoveHandler = function(e) {
      self.mousemove.call(self, e);
    };

    this.mousedownHandler = function(e) {
      self.mousedown.call(self, e);
    };

    this.mouseupHandler = function(e) {
      self.mouseup.call(self, e);
    };

    this.mouseTarget.addEventListener(
      'mousemove',
      this.mousemoveHandler,
      false
    );
  }

  /**
   * start emit particle
   * @method emit
   */
  emit() {
    this._allowEmitting = true;
  }

  /**
   * stop emiting
   * @method stopEmit
   */
  stopEmit() {
    this._allowEmitting = false;
  }

  setCameraAndCanvas(camera, canvas) {
    this.camera = camera;
    this.canvas = canvas;
  }

  mousemove(e) {
    if (e.layerX || e.layerX == 0) {
      this.position.x += (e.layerX - this.position.x) * this.ease;
      this.position.y += (e.layerY - this.position.y) * this.ease;
    } else if (e.offsetX || e.offsetX == 0) {
      this.position.x += (e.offsetX - this.position.x) * this.ease;
      this.position.y += (e.offsetY - this.position.y) * this.ease;
    }

    this.position.copy(
      THREEUtil.toSpacePos(this.position, this.camera, this.canvas)
    );

    if (this._allowEmitting) super.emit('once');
  }

  /**
   * Destory this Emitter
   * @method destroy
   */
  destroy() {
    super.destroy();
    this.mouseTarget.removeEventListener(
      'mousemove',
      this.mousemoveHandler,
      false
    );
  }
}

class BaseRenderer {
  constructor(type = RENDERER_TYPE_BASE) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
  }

  init(system) {
    var self = this;

    this.system = system;

    this.system.eventDispatcher.addEventListener(SYSTEM_UPDATE, function(
      system
    ) {
      self.onSystemUpdate.call(self, system);
    });

    this.system.eventDispatcher.addEventListener(PARTICLE_CREATED, function(
      particle
    ) {
      self.onParticleCreated.call(self, particle);
    });

    this.system.eventDispatcher.addEventListener(PARTICLE_UPDATE, function(
      particle
    ) {
      self.onParticleUpdate.call(self, particle);
    });

    this.system.eventDispatcher.addEventListener(PARTICLE_DEAD, function(
      particle
    ) {
      self.onParticleDead.call(self, particle);
    });

    this.logRendererType();
  }

  remove() {
    this.system = null;
  }

  /**
   * @abstract
   */
  onParticleCreated(particle) {} // eslint-disable-line

  /**
   * @abstract
   */
  onParticleUpdate(particle) {} // eslint-disable-line

  /**
   * @abstract
   */
  onParticleDead(particle) {} // eslint-disable-line

  /**
   * @abstract
   */
  onSystemUpdate(system) {} // eslint-disable-line

  /**
   * Logs the renderer type being used when in development mode.
   *
   * @return void
   */
  logRendererType() {
    if (!__DEV__) {
      return;
    }

    console.log(`${this.type}`);
  }
}

class CustomRenderer extends BaseRenderer {
  constructor() {
    super(RENDERER_TYPE_CUSTOM);

    this.targetPool = new Pool();
    this.materialPool = new Pool();
  }

  onSystemUpdate() {}

  onParticleCreated(particle) {} // eslint-disable-line

  onParticleUpdate(particle) {} // eslint-disable-line

  onParticleDead(particle) {} // eslint-disable-line
}

/**
 * @requires THREE - { Mesh, BoxGeometry, MeshLambertMaterial }
 */
class MeshRenderer extends BaseRenderer {
  /**
   * @param {object} container - An Object3D container, usually a Scene
   * @param {object} THREE - THREE Api
   */
  constructor(container) {
    super(RENDERER_TYPE_MESH);

    this.container = container;
    this._targetPool = new Pool();
    this._materialPool = new Pool();
    this._body = new Mesh(
      new BoxGeometry(50, 50, 50),
      new MeshLambertMaterial({ color: '#ff0000' })
    );
  }

  isThreeSprite(particle) {
    return particle.target.isSprite;
  }

  onSystemUpdate() {}

  onParticleCreated(particle) {
    if (!particle.target) {
      //set target
      if (!particle.body) particle.body = this._body;
      particle.target = this._targetPool.get(particle.body);

      //set material
      if (particle.useAlpha || particle.useColor) {
        particle.target.material.__puid = PUID.id(particle.body.material);
        particle.target.material = this._materialPool.get(
          particle.target.material
        );
      }
    }

    if (particle.target) {
      particle.target.position.copy(particle.position);
      this.container.add(particle.target);
    }
  }

  onParticleUpdate(particle) {
    const { target, useAlpha, useColor } = particle;

    if (!target) {
      return;
    }

    target.position.copy(particle.position);

    this.rotate(particle);

    this.scale(particle);

    if (useAlpha) {
      target.material.opacity = particle.alpha;
      target.material.transparent = true;
    }

    if (useColor) {
      target.material.color.copy(particle.color);
    }
  }

  rotate(particle) {
    particle.target.rotation.set(particle.rotation.x, particle.rotation.y, particle.rotation.z);
  }

  scale(particle) {
    particle.target.scale.set(particle.scale, particle.scale, particle.scale);
  }

  onParticleDead(particle) {
    if (particle.target) {
      if (particle.useAlpha || particle.useColor)
        this._materialPool.expire(particle.target.material);

      this._targetPool.expire(particle.target);
      this.container.remove(particle.target);
      particle.target = null;
    }
  }
}

/**
 * @requires THREE - { Mesh, BoxGeometry, MeshLambertMaterial, Sprite, SpriteMaterial }
 */
class SpriteRenderer extends MeshRenderer {
  constructor(container) {
    super(container);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = RENDERER_TYPE_SPRITE;
    this._body = new THREE.Sprite(
      new THREE.SpriteMaterial({ color: 0xffffff })
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

// Primitives
const DEFAULT_MAX_PARTICLES = 10000;
const VECTOR_3_SIZE = ['x', 'y', 'z'].length;
const RGBA_SIZE = ['r', 'g', 'b', 'a'].length;
const FLOAT_BYTE_SIZE = 4;

// Byte sizes
const POSITION_BYTE_SIZE = VECTOR_3_SIZE * FLOAT_BYTE_SIZE;
const ROTATION_BYTE_SIZE = FLOAT_BYTE_SIZE;
const SIZE_BYTE_SIZE = FLOAT_BYTE_SIZE;
const RGBA_BYTE_SIZE = RGBA_SIZE * FLOAT_BYTE_SIZE;
const ALL_BYTE_SIZES = [
  POSITION_BYTE_SIZE,
  ROTATION_BYTE_SIZE,
  SIZE_BYTE_SIZE,
  RGBA_BYTE_SIZE,
];
const PARTICLE_BYTE_SIZE = ALL_BYTE_SIZES.reduce(
  (cur, acc) => cur + acc
);

// Attributes
const POSITION_ATTRIBUTE_BUFFER_SIZE = VECTOR_3_SIZE;
const ROTATION_ATTRIBUTE_BUFFER_SIZE = 1;
const SIZE_ATTRIBUTE_BUFFER_SIZE = 1;
const RGBA_ATTRIBUTE_BUFFER_SIZE = RGBA_SIZE;
const ALPHA_ATTRIBUTE_BUFFER_SIZE = 1;
const TEXID_ATTRIBUTE_BUFFER_SIZE = 2;

const ATTRIBUTE_TO_SIZE_MAP = {
  position: POSITION_ATTRIBUTE_BUFFER_SIZE,
  rotation: ROTATION_ATTRIBUTE_BUFFER_SIZE,
  size: SIZE_ATTRIBUTE_BUFFER_SIZE,
  // THREE.Color does not contain alpha, so we will have separate attributes for these
  color: RGBA_ATTRIBUTE_BUFFER_SIZE,
  alpha: ALPHA_ATTRIBUTE_BUFFER_SIZE,
  texID: TEXID_ATTRIBUTE_BUFFER_SIZE,
};

const DEFAULT_RENDERER_OPTIONS = {
  blending: 'AdditiveBlending',
  baseColor: 0xffffff,
  depthTest: true,
  depthWrite: false,
  transparent: true,
  maxParticles: DEFAULT_MAX_PARTICLES,
  shouldDebugTextureAtlas: false,
  shouldForceDesktopRenderer: false,
  shouldForceMobileRenderer: false,
};

/**
 * Simple class that stores the particle's "target" or "next" state.
 *
 */
class Target {
  constructor() {
    this.position = new Vector3();
    this.rotation = new Vector3();
    this.size = 0;
    this.color = new Color$1();
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

/**
 * Map of particle IDs to integer ids
 */
class UniqueList {
  constructor(max = Infinity) {
    this.max = max;
    this.count = 0;
    this._items = {};
  }

  add(item) {
    if (this._items[item] !== undefined) {
      return;
    }

    this._items[item] = this.count++;
  }

  find(item) {
    return this._items[item];
  }

  destroy() {
    this._items = {};
    this.count = 0;
  }
}

/**
 * Creates and provides performant buffers for mapping particle properties to geometry vertices.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 * @see https://threejs.org/examples/?q=buffe#webgl_buffergeometry_points_interleaved
 * @see https://threejs.org/examples/?q=points#webgl_custom_attributes_points
 */
class ParticleBuffer {
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

    this.interleavedBuffer = new THREE.InterleavedBuffer(
      new Float32Array(arrayBuffer),
      PARTICLE_BYTE_SIZE
    );
    // this.interleavedBuffer.usage = THREE.DynamicDrawUsage;
    
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
    this.geometry = new THREE.BufferGeometry();

    const { interleavedBuffer, geometry } = this;

    Object.keys(ATTRIBUTE_TO_SIZE_MAP).reduce((offset, attribute) => {
      const size = ATTRIBUTE_TO_SIZE_MAP[attribute];

      geometry.setAttribute(
        attribute,
        new THREE.InterleavedBufferAttribute(interleavedBuffer, size, offset)
      );

      return (offset += size);
    }, 0);

    return this;
  }

  /**
   * Gets the publicly accessible interleaved buffer.
   *
   * @return {THREE.InterleavedBuffer} buffers - The interleaved buffer
   */
  get buffer() {
    return this.interleavedBuffer;
  }

  get stride() {
    return PARTICLE_BYTE_SIZE;
  }
}

const DATA_TEXTURE_SIZE = 256;

// 函数实现了一种箱装算法（bin packing algorithm）的变体，具体来说是矩形填充问题的一种解决方案。该函数的目标是以最小的空间浪费，有效地将一组矩形（即“boxes”）装入一个更大的边界矩形中
function potpack(boxes) {

  // calculate total box area and maximum box width
  var area = 0;
  var maxWidth = 0;

  for (var i$1 = 0, list = boxes; i$1 < list.length; i$1 += 1) {
    var box = list[i$1];

    area += box.w * box.h;
    maxWidth = Math.max(maxWidth, box.w);
  }

  // sort the boxes for insertion by height, descending
  boxes.sort(function (a, b) { return b.h - a.h; });

  // aim for a squarish resulting container,
  // slightly adjusted for sub-100% space utilization
  var startWidth = Math.max(Math.ceil(Math.sqrt(area / 0.95)), maxWidth);

  // start with a single empty space, unbounded at the bottom
  var spaces = [{x: 0, y: 0, w: startWidth, h: Infinity}];

  var width = 0;
  var height = 0;

  for (var i$2 = 0, list$1 = boxes; i$2 < list$1.length; i$2 += 1) {
    // look through spaces backwards so that we check smaller spaces first
    var box$1 = list$1[i$2];

    for (var i = spaces.length - 1; i >= 0; i--) {
      var space = spaces[i];

      // look for empty spaces that can accommodate the current box
      if (box$1.w > space.w || box$1.h > space.h) { continue; }

      // found the space; add the box to its top-left corner
      // |-------|-------|
      // |  box  |       |
      // |_______|       |
      // |         space |
      // |_______________|
      box$1.x = space.x;
      box$1.y = space.y;

      height = Math.max(height, box$1.y + box$1.h);
      width = Math.max(width, box$1.x + box$1.w);

      if (box$1.w === space.w && box$1.h === space.h) {
        // space matches the box exactly; remove it
        var last = spaces.pop();

        if (i < spaces.length) { spaces[i] = last; }

      } else if (box$1.h === space.h) {
        // space matches the box height; update it accordingly
        // |-------|---------------|
        // |  box  | updated space |
        // |_______|_______________|
        space.x += box$1.w;
        space.w -= box$1.w;

      } else if (box$1.w === space.w) {
        // space matches the box width; update it accordingly
        // |---------------|
        // |      box      |
        // |_______________|
        // | updated space |
        // |_______________|
        space.y += box$1.h;
        space.h -= box$1.h;

      } else {
        // otherwise the box splits the space into two spaces
        // |-------|-----------|
        // |  box  | new space |
        // |_______|___________|
        // | updated space     |
        // |___________________|
        spaces.push({
          x: space.x + box$1.w,
          y: space.y,
          w: space.w - box$1.w,
          h: box$1.h
        });
        space.y += box$1.h;
        space.h -= box$1.h;
      }
      break;
    }
  }

  return {
    w: width, // container width
    h: height, // container height
    fill: (area / (width * height)) || 0 // space utilization
  };
}

/**
 * Dynamic texture atlas for performant support of systems with multiple emitters and textures.
 *
 */
class TextureAtlas {
  constructor(renderer, shouldDebug) {
    const { type: rendererType } = renderer;
    const data = new Float32Array(DATA_TEXTURE_SIZE * 4);
    const ctx = (this.ctx = document.createElement('canvas').getContext('2d'));
    const { canvas } = ctx;

    this.shouldDebug = shouldDebug;
    this.rendererType = rendererType;
    this.indexData = data;
    this.canvas = canvas;
    this.entries = [];

    if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
      this.atlasIndex = new DataTexture(
        data,
        DATA_TEXTURE_SIZE,
        1,
        RGBAFormat,
        FloatType
      );
    }

    canvas.width = canvas.height = DATA_TEXTURE_SIZE;

    if (shouldDebug) {
      this.debug(canvas, ctx);
    }

    this.atlasTexture = new CanvasTexture(canvas);
    this.atlasTexture.flipY = false;

    renderer.material.uniforms.uTexture.value = this.atlasTexture;

    if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
      renderer.material.uniforms.atlasIndex.value = this.atlasIndex;
    }

    renderer.material.uniformsNeedUpdate = true;
  }

  /**
   * Logs to the console when in dev mode.
   *
   */
  log(...args) {
    if (!__DEV__) {
      return;
    }

    console.log(...args);
  }

  /**
   * Debugs the texture atlas by rendering it to a canvas in the DOM.
   *
   */
  debug() {
    const { canvas, ctx } = this;
    const halfmax = canvas.width;

    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, halfmax, halfmax);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, halfmax, halfmax, halfmax);
    ctx.fillStyle = 'blue';
    ctx.fillRect(halfmax, 0, halfmax, halfmax);
    ctx.fillStyle = 'orange';
    ctx.fillRect(halfmax, halfmax, halfmax, halfmax);
    ctx.fillStyle = 'yellow';
    ctx.font = canvas.width + 'px Verdana';
    ctx.fillText('top row', 100, 500);
    ctx.fillStyle = 'pink';
    ctx.fillText('bottom row', 100, 1500);

    canvas.style.position = 'absolute';
    canvas.style.width = canvas.style.height = '300px';
    canvas.style.left = canvas.style.top = '0px';
    canvas.style.zIndex = 100;

    document.body.appendChild(canvas);
  }

  /**
   * Adds a texture to the texture atlas and flags that the atlas needs to be updated.
   *
   */
  addTexture(texture) {
    this.log('Adding texture to atlas:', texture.uuid);

    texture.textureIndex = this.entries.length;
    this.entries.push({ texture: texture });
    this.needsUpdate = true;
  }

  /**
   * Updates the texture atlas. Will only rebuild the atlas if all images are loaded.
   *
   */
  update() {
    if (!this.needsUpdate) {
      return;
    }

    const {
      entries,
      canvas,
      indexData,
      ctx,
      atlasIndex,
      atlasTexture,
      rendererType,
    } = this;

    for (let i = 0; i < entries.length; i++) {
      if (!entries[i].texture.image) {
        return;
      }
    }

    this.needsUpdate = false;

    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      const { texture } = e;
      const { width, height } = texture.image;

      e.w = width;
      e.h = height;
    }

    const stats = potpack(entries);

    this.log('Rebuilt atlas:', stats);

    if (canvas.width != stats.w || canvas.height != stats.h) {
      canvas.width = stats.w;
      canvas.height = stats.h;
    }

    for (let i = 0; i < entries.length; i++) {
      const e = this.entries[i];
      const ii = e.texture.textureIndex * 4;

      if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
        indexData[ii + 0] = e.x / canvas.width;
        indexData[ii + 1] = e.y / canvas.height;
        indexData[ii + 2] = (e.x + e.w) / canvas.width;
        indexData[ii + 3] = (e.y + e.h) / canvas.height;
      }

      if (rendererType === RENDERER_TYPE_GPU_MOBILE) {
        indexData[ii + 0] = e.x / (canvas.width + 1);
        indexData[ii + 1] = e.y / (canvas.height + 1);
        indexData[ii + 2] = (e.x + e.w) / (canvas.width + 1);
        indexData[ii + 3] = (e.y + e.h) / (canvas.height + 1);
      }

      ctx.drawImage(e.texture.image, e.x, e.y, e.w, e.h);
    }

    if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
      atlasIndex.needsUpdate = true;
    }

    atlasTexture.needsUpdate = true;
  }

  /**
   * Disposes of the textures used by the texture atlas.
   *
   * @return void
   */
  destroy() {
    const { atlasIndex, atlasTexture, canvas } = this;

    atlasTexture.dispose();
    atlasIndex && atlasIndex.dispose();

    if (this.shouldDebug) {
      canvas.remove();
    }

    this.entries = [];
  }
}

const fragmentShader$1 = () => {
  return `
    uniform vec3 baseColor;
    uniform sampler2D uTexture;
    uniform sampler2D atlasIndex;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;
    varying float tileID;

    void main() {
      gl_FragColor = vec4(baseColor * targetColor, targetAlpha);

      vec2 uv = gl_PointCoord;
      uv = mix(tileRect.xy, tileRect.zw, gl_PointCoord);

      float mid = 0.5;
      uv = vec2(
        cos(vRotation) * (uv.x - mid) - sin(vRotation) * (uv.y - mid) + mid,
        cos(vRotation) * (uv.y - mid) + sin(vRotation) * (uv.x - mid) + mid
      );

      gl_FragColor = gl_FragColor * texture2D(uTexture, uv);

    }
`;
};

const SIZE_ATTENUATION_FACTOR = '600.0';

const vertexShader$1 = () => {
  return `
    uniform sampler2D uTexture;
    //atlasIndex is a 256x1 float texture of tile rectangles as r=minx g=miny b=maxx a=maxy
    uniform sampler2D atlasIndex;

    attribute float size;
    attribute vec3 color;
    attribute float alpha;
    attribute float texID;
    attribute float rotation;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;
    varying float tileID;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      targetColor = color;
      targetAlpha = alpha;
      vRotation = rotation;

      tileID = texID;
      //get the tile rectangle from the atlasIndex texture..
      tileRect = texture2D(atlasIndex, vec2((tileID + 0.5) / ${DATA_TEXTURE_SIZE}.0, 0.5));

      gl_PointSize = ((size * ${SIZE_ATTENUATION_FACTOR}) / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
`;
};

/**
 * GPURenderer for devices that support floating point textures.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 */
class DesktopGPURenderer extends BaseRenderer {
  constructor(container, three, options = DEFAULT_RENDERER_OPTIONS) {
    super(RENDERER_TYPE_GPU_DESKTOP);

    const props = { ...DEFAULT_RENDERER_OPTIONS, ...options };
    const {
      camera,
      maxParticles,
      baseColor,
      blending,
      depthTest,
      depthWrite,
      transparent,
      shouldDebugTextureAtlas,
    } = props;
    const particleBuffer = new ParticleBuffer(maxParticles);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        baseColor: { value: new THREE.Color(baseColor) },
        uTexture: { value: null },
        atlasIndex: { value: null },
      },
      vertexShader: vertexShader$1(),
      fragmentShader: fragmentShader$1(),
      blending: THREE[blending],
      depthTest,
      depthWrite,
      transparent,
    });

    this.container = container;
    this.camera = camera;
    this.targetPool = new Pool();
    this.uniqueList = new UniqueList(maxParticles);
    this.particleBuffer = particleBuffer;
    this.buffer = particleBuffer.buffer;
    this.stride = particleBuffer.stride;
    this.geometry = particleBuffer.geometry;
    this.material = material;
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.shouldDebugTextureAtlas = shouldDebugTextureAtlas;

    this.container.add(this.points);
  }

  onSystemUpdate(system) {
    super.onSystemUpdate(system);

    this.buffer.needsUpdate = true;

    this.textureAtlas && this.textureAtlas.update();
  }

  /**
   * Pools the particle target if it does not exist.
   * Updates the target and maps particle properties to the point.
   *
   * @param {Particle}
   */
  onParticleCreated(particle) {
    if (!particle.target) {
      particle.target = this.targetPool.get(Target);
      this.uniqueList.add(particle.id);
    }

    this.updateTarget(particle).mapParticleTargetPropsToPoint(particle);
  }

  /**
   * Maps particle properties to the point if the particle has a target.
   *
   * @param {Particle}
   */
  onParticleUpdate(particle) {
    if (!particle.target) {
      return;
    }

    this.updateTarget(particle).mapParticleTargetPropsToPoint(particle);
  }

  /**
   * Resets and clears the particle target.
   *
   * @param {Particle}
   */
  onParticleDead(particle) {
    if (!particle.target) {
      return;
    }

    particle.target.reset();
    this.mapParticleTargetPropsToPoint(particle);

    particle.target = null;
  }

  /**
   * Maps all mutable properties from the particle to the target.
   *
   * @param {Particle}
   * @return {DesktopGPURenderer}
   */
  updateTarget(particle) {
    const { position, rotation, scale, radius, color, alpha, body, id } = particle;
    const { r, g, b } = color;

    particle.target.position.copy(position);
    particle.target.rotation.copy(rotation);
    particle.target.size = scale * radius;
    particle.target.color.setRGB(r, g, b);
    particle.target.alpha = alpha;
    particle.target.index = this.uniqueList.find(id);

    if (body && body instanceof THREE.Sprite) {
      const { map } = body.material;

      particle.target.texture = map;
      particle.target.textureIndex = this.getTextureID(
        map,
        this.shouldDebugTextureAtlas
      );
    }

    return this;
  }

  /**
   * Entry point for mapping particle properties to buffer geometry points.
   *
   * @param {Particle} particle - The particle containing the properties to map
   * @return {DesktopGPURenderer}
   */
  mapParticleTargetPropsToPoint(particle) {
    this.updatePointPosition(particle)
      .updatePointSize(particle)
      .updatePointRotation(particle)
      .updatePointColor(particle)
      .updatePointAlpha(particle)
      .updatePointTextureIndex(particle);

    return this;
  }

  /**
   * Updates the point's position according to the particle's target position.
   *
   * @param {Particle} particle - The particle containing the target position.
   * @return {DesktopGPURenderer}
   */
  updatePointPosition(particle) {
    const attribute = 'position';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.position.x;
    buffer.array[target.index * stride + offset + 1] = target.position.y;
    buffer.array[target.index * stride + offset + 2] = target.position.z;

    return this;
  }

  /**
   * Updates the point's size relative to the particle's target scale and radius.
   *
   * @param {Particle} particle - The particle containing the target scale.
   * @return {DesktopGPURenderer}
   */
  updatePointSize(particle) {
    const attribute = 'size';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.size;

    return this;
  }

  /**
   * Updates the point's rotation.
   *
   * @param {Particle} particle - The particle containing the target rotation.
   * @return {DesktopGPURenderer}
   */
  updatePointRotation(particle) {
    const attribute = 'rotation';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.rotation.z;

    return this;
  }

  /**
   * Updates the point's color attribute according with the particle's target color.
   *
   * @param {Particle} particle - The particle containing the target color and alpha.
   * @return {DesktopGPURenderer}
   */
  updatePointColor(particle) {
    const attribute = 'color';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.color.r;
    buffer.array[target.index * stride + offset + 1] = target.color.g;
    buffer.array[target.index * stride + offset + 2] = target.color.b;

    return this;
  }

  /**
   * Updates the point alpha attribute with the particle's target alpha.
   *
   * @param {Particle} particle - The particle containing the target alpha.
   * @return {DesktopGPURenderer}
   */
  updatePointAlpha(particle) {
    const attribute = 'alpha';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.alpha;

    return this;
  }

  /**
   * Updates the point texture attribute with the particle's target texture.
   *
   * @param {Particle} particle - The particle containing the target texture.
   * @return {DesktopGPURenderer}
   */
  updatePointTextureIndex(particle) {
    const attribute = 'texID';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.textureIndex;

    return this;
  }

  getTextureID(texture, debug) {
    if (texture.textureIndex === undefined) {
      if (!this.textureAtlas) {
        this.textureAtlas = new TextureAtlas(this, debug);
      }

      this.textureAtlas.addTexture(texture);
    }

    return texture.textureIndex;
  }

  /**
   * Tears down the GPURenderer.
   *
   * @return void
   */
  destroy() {
    const { container, points, textureAtlas, uniqueList } = this;

    container.remove(points);
    uniqueList.destroy();
    textureAtlas && textureAtlas.destroy();
  }
}

const fragmentShader = () => {
  return `
    uniform vec3 baseColor;
    uniform sampler2D uTexture;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;

    void main() {
      gl_FragColor = vec4(baseColor * targetColor, targetAlpha);

      vec2 uv = gl_PointCoord;
      uv = mix(tileRect.xy, tileRect.zw, gl_PointCoord);

      float mid = 0.5;
      uv = vec2(
        cos(vRotation) * (uv.x - mid) - sin(vRotation) * (uv.y - mid) + mid,
        cos(vRotation) * (uv.y - mid) + sin(vRotation) * (uv.x - mid) + mid
      );
      
      gl_FragColor = gl_FragColor * texture2D(uTexture, uv);
    }
`;
};

const vertexShader = () => {
  return `
    uniform sampler2D uTexture;
    uniform vec2 atlasDim;

    attribute float size;
    attribute vec3 color;
    attribute float alpha;
    attribute vec2 texID;
    attribute float rotation;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      targetColor = color;
      targetAlpha = alpha;
      vRotation = rotation;

      vec2 tmin = floor(texID) / atlasDim;
      vec2 tmax = fract(texID);
      tileRect = vec4(tmin,tmax);

      gl_PointSize = ((size * ${SIZE_ATTENUATION_FACTOR}) / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
`;
};

/**
 * GPURenderer for mobile devices that do not support floating point textures.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 */
class MobileGPURenderer extends BaseRenderer {
  constructor(container,  options = DEFAULT_RENDERER_OPTIONS) {
    super(RENDERER_TYPE_GPU_MOBILE);
    const props = { ...DEFAULT_RENDERER_OPTIONS, ...options };
    const {
      camera,
      maxParticles,
      baseColor,
      blending,
      depthTest,
      depthWrite,
      transparent,
      shouldDebugTextureAtlas,
    } = props;
    const particleBuffer = new ParticleBuffer(maxParticles);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        baseColor: { value: new THREE.Color(baseColor) },
        uTexture: { value: null },
        FFatlasIndex: { value: null },
        atlasDim: { value: new THREE.Vector2() },
      },
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      blending: THREE[blending],
      depthTest,
      depthWrite,
      transparent,
    });

    this.camera = camera;
    this.targetPool = new Pool();
    this.uniqueList = new UniqueList(maxParticles);
    this.particleBuffer = particleBuffer;
    this.buffer = particleBuffer.buffer;
    this.stride = particleBuffer.stride;
    this.geometry = particleBuffer.geometry;
    this.material = material;
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.shouldDebugTextureAtlas = shouldDebugTextureAtlas;

    container.add(this.points);
  }

  onSystemUpdate(system) {
    super.onSystemUpdate(system);

    this.buffer.needsUpdate = true;

    const { textureAtlas } = this;

    if (textureAtlas) {
      textureAtlas.update();
      this.material.uniforms.atlasDim.value.set(
        textureAtlas.atlasTexture.image.width,
        textureAtlas.atlasTexture.image.height
      );
    }
  }

  /**
   * Pools the particle target if it does not exist.
   * Updates the target and maps particle properties to the point.
   *
   * @param {Particle}
   */
  onParticleCreated(particle) {
    if (!particle.target) {
      particle.target = this.targetPool.get(Target);
      this.uniqueList.add(particle.id);
    }

    this.updateTarget(particle).mapParticleTargetPropsToPoint(particle);
  }

  /**
   * Maps particle properties to the point if the particle has a target.
   *
   * @param {Particle}
   */
  onParticleUpdate(particle) {
    if (!particle.target) {
      return;
    }

    this.updateTarget(particle).mapParticleTargetPropsToPoint(particle);
  }

  /**
   * Resets and clears the particle target.
   *
   * @param {Particle}
   */
  onParticleDead(particle) {
    if (!particle.target) {
      return;
    }

    particle.target.reset();
    this.mapParticleTargetPropsToPoint(particle);

    particle.target = null;
  }

  /**
   * Maps all mutable properties from the particle to the target.
   *
   * @param {Particle}
   * @return {GPURenderer}
   */
  updateTarget(particle) {
    const { position, rotation, scale, radius, color, alpha, body, id } = particle;
    const { r, g, b } = color;

    particle.target.position.copy(position);
    particle.target.rotation.copy(rotation);
    particle.target.size = scale * radius;
    particle.target.color.setRGB(r, g, b);
    particle.target.alpha = alpha;
    particle.target.index = this.uniqueList.find(id);

    if (body && body instanceof THREE.Sprite) {
      const { map } = body.material;

      particle.target.texture = map;
      particle.target.textureIndex = this.getTextureID(
        map,
        this.shouldDebugTextureAtlas
      );
    }

    return this;
  }

  /**
   * Entry point for mapping particle properties to buffer geometry points.
   *
   * @param {Particle} particle - The particle containing the properties to map
   * @return {GPURenderer}
   */
  mapParticleTargetPropsToPoint(particle) {
    this.updatePointPosition(particle)
      .updatePointSize(particle)
      .updatePointRotation(particle)
      .updatePointColor(particle)
      .updatePointAlpha(particle)
      .updatePointTextureIndex(particle);

    return this;
  }

  /**
   * Updates the point's position according to the particle's target position.
   *
   * @param {Particle} particle - The particle containing the target position.
   * @return {GPURenderer}
   */
  updatePointPosition(particle) {
    const attribute = 'position';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.position.x;
    buffer.array[target.index * stride + offset + 1] = target.position.y;
    buffer.array[target.index * stride + offset + 2] = target.position.z;

    return this;
  }

  /**
   * Updates the point's size relative to the particle's target scale and radius.
   *
   * @param {Particle} particle - The particle containing the target scale.
   * @return {GPURenderer}
   */
  updatePointSize(particle) {
    const attribute = 'size';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.size;

    return this;
  }

  /**
   * Updates the point's rotation.
   *
   * @param {Particle} particle - The particle containing the target rotation.
   * @return {GPURenderer}
   */
  updatePointRotation(particle) {
    const attribute = 'rotation';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.rotation.z;

    return this;
  }

  /**
   * Updates the point's color attribute according with the particle's target color.
   *
   * @param {Particle} particle - The particle containing the target color and alpha.
   * @return {GPURenderer}
   */
  updatePointColor(particle) {
    const attribute = 'color';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.color.r;
    buffer.array[target.index * stride + offset + 1] = target.color.g;
    buffer.array[target.index * stride + offset + 2] = target.color.b;

    return this;
  }

  /**
   * Updates the point alpha attribute with the particle's target alpha.
   *
   * @param {Particle} particle - The particle containing the target alpha.
   * @return {GPURenderer}
   */
  updatePointAlpha(particle) {
    const attribute = 'alpha';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];

    buffer.array[target.index * stride + offset + 0] = target.alpha;

    return this;
  }

  /**
   * Updates the point texture attribute with the particle's target texture.
   *
   * @param {Particle} particle - The particle containing the target texture.
   * @return {GPURenderer}
   */
  updatePointTextureIndex(particle) {
    const attribute = 'texID';
    const { geometry, stride, buffer } = this;
    const { target } = particle;
    const { offset } = geometry.attributes[attribute];
    const id = target.index * stride + offset + 0;

    // eslint-disable-next-line
    {
      let ti = target.textureIndex * 4;
      const ta = this.textureAtlas;
      const ida = ta.indexData;
      const nx = ida[ti++];
      const ny = ida[ti++];
      const px = ida[ti++];
      const py = ida[ti++];

      buffer.array[id] = ((nx * ta.atlasTexture.image.width) | 0) + px;
      buffer.array[id + 1] = ((ny * ta.atlasTexture.image.height) | 0) + py;
    }

    return this;
  }

  getTextureID(texture, debug) {
    if (texture.textureIndex === undefined) {
      if (!this.textureAtlas) {
        this.textureAtlas = new TextureAtlas(this, debug);
      }

      this.textureAtlas.addTexture(texture);
    }

    return texture.textureIndex;
  }

  destroy() {
    const { container, points, textureAtlas, uniqueList } = this;

    container.remove(points);
    uniqueList.destroy();
    textureAtlas && textureAtlas.destroy();
  }
}

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
class GPURenderer extends BaseRenderer {
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

console.log( '%cdev', 'color:#0fff23');

export { Alpha, ArraySpan, Attraction, Behaviour$1 as Behaviour, Body, BodySprite, Box, BoxZone, Collision, Color, ColorSpan, ColorUtil, CrossZone, CustomRenderer, Debug, Emitter, FollowEmitter, Force, GPURenderer, Gravity, INTEGRATION_TYPE_EULER, INTEGRATION_TYPE_RK2, INTEGRATION_TYPE_RK4, INTEGRATION_TYPE_VERLET, InitializerUtil, Life, LineZone, Mass, MathUtils, MeshRenderer, MeshZone, PUID, Particle, PointZone, Polar3D, PolarVelocity, Pool, Position, RadialVelocity, Radius, RandomDrift, Rate, Repulsion, Rotate, Rotation, Scale, ScreenZone, Span, SphereZone, Spring, SpriteRenderer, System, THREEUtil, Texture, Util, Vector3D, VectorVelocity, createArraySpan, createColorSpan, createSpan, System as default, ease, easeInBack, easeInCirc, easeInCubic, easeInExpo, easeInOutBack, easeInOutCirc, easeInOutCubic, easeInOutExpo, easeInOutQuad, easeInOutQuart, easeInOutSine, easeInQuad, easeInQuart, easeInSine, easeLinear, easeOutBack, easeOutCirc, easeOutCubic, easeOutExpo, easeOutQuad, easeOutQuart, easeOutSine, getEasingByName, integrate, log, setEasingByName, withDefaults };
