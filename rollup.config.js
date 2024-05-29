// rollup.config.js (building more than one bundle)

// ---cut-start---
/** @type {import('rollup').RollupOptions[]} */
// ---cut-end---
import commonjs from 'rollup-plugin-commonjs';
export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/nebula.js',
      format: 'es'
    },
    plugins: [
        
      commonjs()
    ]
  },
];