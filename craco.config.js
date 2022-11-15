const CracoLessPlugin = require('craco-less')
const path = require('path')



module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#4e6ef2' },
              javascriptEnabled: true
            }
          }
        }
      }
    ],
    webpack: {
      alias: {
        '@': path.resolve(__dirname, 'src/components')
      }
    }
  }
  