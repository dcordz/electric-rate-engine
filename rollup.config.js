import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import pkg from './package.json' with { type: "json" };
import { statSync } from 'fs';

const logBundleSize = () => {
  return {
    name: 'log-bundle-size',
    writeBundle(options) {
      const { file } = options;
      if (file) {
        const size = statSync(file).size / 1024; // Convert to KB
        console.log(`${file} size ${size.toFixed(2)} KB`);
      }
    },
  };
};

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
      logBundleSize()
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
