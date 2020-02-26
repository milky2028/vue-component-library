import rimraf from 'rimraf';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

rimraf.sync('dist');

const extensions = ['.ts', '.tsx'];
const plugins = [
  resolve({ extensions }),
  commonjs(),
  typescript(),
  vue(),
  babel({
    extensions,
    exclude: ['node_modules/**'],
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: '3',
          useBuiltIns: 'usage',
          targets: '> 1%, not dead'
        }
      ]
    ],
    plugins: [],
    runtimeHelpers: true
  }),
  terser({
    output: {
      comments: false
    }
  })
];

export default [
  {
    external: ['vue', '@vue/composition-api'],
    input: {
      main: 'src/main.ts'
    },
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name]-[hash].js',
      sourcemap: true
    },
    plugins
  }
];
