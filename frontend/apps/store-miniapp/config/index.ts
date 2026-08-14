import { defineConfig, type UserConfigExport } from '@tarojs/cli'

const config: UserConfigExport = {
  projectName: 'heimijiejie-store-miniapp',
  date: '2026-08-14',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  compiler: 'webpack5',
  plugins: [],
  defineConstants: {},
  copy: { patterns: [], options: {} },
  mini: {
    postcss: {
      pxtransform: { enable: true, config: {} },
      cssModules: { enable: false },
    },
  },
}

export default defineConfig(config)
