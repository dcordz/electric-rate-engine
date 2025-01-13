import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json'  with { type: "json"};

export default [
  {
    input: './src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.build.json", declaration: false }),
      // terser()
    ],
  },

  {
    input: './src/index.ts',
    output: [
      { file: "./lib/index.d.ts", format: "es" },
    ],
    plugins: [
      dts({ tsconfig: "./tsconfig.build.json", emitDeclarationOnly: true }),
    ],
  },
];
