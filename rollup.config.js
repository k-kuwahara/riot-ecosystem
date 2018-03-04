import commonjs from 'rollup-plugin-commonjs'
import buble    from 'rollup-plugin-buble'
import progress from 'rollup0plugin-progress'
import riot     from 'rollup-plugin-riot'

const namedExports = {};

export default {
  input: 'src/app.js',
  output: {
    file: 'src/dist/bundle.js',
    sourcemap: 'false',
    exports: 'none',
    format: 'iife',
    strict: true
  },
  context: 'window',
  plugins: [
    commonjs({
      include: 'node_modules/**',
      namedExports: namedExports
    }),
    buble(),
    progress()
  ]
}
