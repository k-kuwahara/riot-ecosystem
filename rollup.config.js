import mout from 'mout'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import sass from 'rollup-plugin-sass'
import nodeResolve from 'rollup-plugin-node-resolve'
import progress from 'rollup-plugin-progress'
import riot from 'rollup-plugin-riot'

const namedExports = {}
mout.object.forOwn(mout, (v, k) => {
  if (!mout.lang.isObject(v)) {
    return
  }
  const key = `node_modules/mout/${k}.js`
  if (!namedExports[key]) {
    namedExports[key] = []
  }
  mout.object.forOwn(v, (v1, k1) => {
    if (mout.lang.isFunction(v1)) {
      namedExports[key].push(k1)
    }
  })
})

// @see https://github.com/rollup/rollup/wiki/JavaScript-API
export default {
  input: 'src/app.js',
  output: {
    file: 'public/js/app.js',
    sourcemap: false,
    exports: 'none',
    format: 'iife',
    strict: true
  },
  context: 'window',
  plugins: [
    json(),
    riot({
      template: 'pug'
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: namedExports
    }),
    buble({
      target: {
        chrome: 52,
        edge: 13
      }
    }),
    progress(),
    sass({
      output: 'bundle.css'
    })
  ]
}
