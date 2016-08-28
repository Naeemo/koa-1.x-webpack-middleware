# koa-1.x-webpack-middleware
"webpack-dev-middleware for koa1.x with HMR(hot module replacement) supports."

> This is just a npm wrapper of the two middlewares for koa1.x folks: [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware), [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware).

> repo [koa-webpack-dev-middleware](https://github.com/yiminghe/koa-webpack-dev-middleware) will take credit for the codes. Thanks.


## install 

  ```$ npm i koa-1.x-webpack-middleware -D``` 
  
## Usage
``` javascript
if(DEBUG) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    const compiler = webpack(webpackConfig);
    const koaWM = require('koa-1.x-webpack-middleware');

    app.use(koaWM.koaWebpackDev(compiler, {
        noInfo: false,
        quiet: false,
        watchOptions: {
            aggregateTimeout: 300
        },
        hot: false,
        stats: {
            colors: true
        }
    })).use(koaWM.koaWebpackHot(compiler))
}
```

## same thing for koa2

  ```$ npm i koa-webpack-middleware -D``` 
  Its repo: [koa-webpack-middleware](https://github.com/leecade/koa-webpack-middleware)
