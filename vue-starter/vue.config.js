const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: isProduction 
    ? path.resolve(__dirname, '../backend/dist') // 빌드 시 백엔드 dist
    : path.resolve(__dirname, 'dist'),    
  css: {
    extract: {
      ignoreOrder: true,
    },
  },
  filenameHashing: false,
  devServer: {
    allowedHosts: 'all',
    port: 8080,
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  },
  //devServer: {
  //  allowedHosts: 'all',
  //},
});
