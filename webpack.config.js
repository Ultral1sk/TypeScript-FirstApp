// uses javascript and nodejs syntax
const path = require('path');
module.exports = {
      mode: 'development',   // <-- here we are building for development mode and we will have fewer optimizations, make debugging easier etc..
      // this is when our program starts which file to look for first
      entry : './src/app.ts',
      // this is an object where we first of all specify the filename which will 
      //be produced in the end when the program ends compiling
      output: {
            filename : 'bundle.js',
            // the path is where the file should be created at the end
            // and it should match with the outDir Key in the ts.json config
            // but webpack wants an apsolute path which we provide with the build in module "path" whichi will provide us with the asbsolute path 
            path : path.resolve(__dirname, 'dist'),
            publicPath: 'dist' // <- additional configuration for webpack to understand where the output is written to  and where it is relative to the index.html file
      },

      devtool: 'inline-source-map',
      //with the module file we tell webpack what to do with the files that is going to find. ex : like translating ts into js etc..
      module: {
            //multiple rules are allowed
            rules : [
              {
                  //this describes that webpack will performa test on any file it finds
                  //to find out whether this rule here applies to that file or not
                  test : /\.ts$/,
                  // we tell webpack that anyfile it finds here should be handled by the typescript loader
                  use: 'ts-loader',
                  exclude: /node_modules/
              }
            ]
      },
      // here we tell webpack which file extensions it adds to the imports it finds. By default it'll add .js files\
      // and here we want webpack to look for .ts files
      resolve: {
            // right now webpack will look for files with these extensions and it'll bundle them together at the end
            extensions : ['.ts', '.js']
      }

};