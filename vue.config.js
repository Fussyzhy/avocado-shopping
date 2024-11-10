const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true

  // devServer: {
  //   proxy: {
  //     '/server': {
  //       target: 'http://localhost:3000/',
  //       changeOrgin: true
  //     }
  //   }
  // }

})
