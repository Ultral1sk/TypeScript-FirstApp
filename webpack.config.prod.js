// uses javascript and nodejs syntax
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin')
module.exports = {
      mode : 'production',
      entry : './src/app.ts',
      output : {
            filename : 'bundle.js',
            path : path.resolve(__dirname, 'dist')
      },

      devtool : 'none', // to not generate any  map files (which in source in are .ts files)
      module: {
            rules : [
              {
                  test : /\.ts$/,
                  use: 'ts-loader',
                  exclude: /node_modules/
              }
            ]
      },
      resolve : {
            // right now webpack will look for files with these extensions and it'll bundle them together at the end
            extensions : ['.ts', '.js']
      },
      // plugins is added to the general workflow whereas module and rules are added per a file level 
      plugins : [
            //this will tell webpack that before it writes something into the dist folder where the path is, to clear everything inside
            new CleanPlugin.CleanWebpackPlugin()
      ]

};