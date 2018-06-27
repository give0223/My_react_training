var path = require('path');

module.exports = {
  entry:'./React_list/js/list_main.js',
  output:{
    filename:'list_bundle.js',
    path: path.resolve(__dirname,'./React_list/dist/')
  },
  module:{
    rules:[
      {test:/\.js$/, exclude:/node_modules/, loader: 'babel-loader'}
    ]
  }
}