const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isDocker = process.env.DOCKER_BUILD === 'true';

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: isDocker 
    ? path.resolve(__dirname, 'dist') // Docker 빌드 시 vue-starter/dist
    : isProduction 
      ? path.resolve(__dirname, '../backend/dist') // 로컬 프로덕션 빌드 시 백엔드 dist
      : path.resolve(__dirname, 'dist'), // 개발 빌드 시 vue-starter/dist    
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
