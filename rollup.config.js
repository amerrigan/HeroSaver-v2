import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'src/saver.js',
    output: {
      name: 'saver',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs({
        namedExports: {
          'file-saver': ['saveAs'],
        }
      }),
      replace({
        ' instanceof BufferGeometry': '.isBufferGeometry',
        ' instanceof Geometry': '.isGeometry'
      }),
      terser({
        compress: {
          arguments: true,
          booleans_as_integers: true,
          drop_console: true,
          hoist_funs: true,
          hoist_vars: true,
          keep_fargs: false,
          toplevel: true,
          unsafe: true,
          unsafe_Function: true,
          passes: 2
        },
        mangle: {
          eval: true,
          toplevel: true,
        }
      })
    ]
  }
];
