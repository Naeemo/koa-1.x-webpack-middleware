/**
 * Edit by naeemo on 16/7/20 e-mail: 370552604@qq.com
 *
 * 将webpack的两个中间件改成了koa1.x可用的generator形式
 * dev中间件实现watch、compile and serve
 * hot中间件实现hot-module-replacement
 *
 */
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


function middleware(doIt, req, res) {
    var originalEnd = res.end;
    return function (done) {
        res.end = function () {
            originalEnd.apply(this, arguments);
            done(null, 0);
        };
        doIt(req, res, function () {
            done(null, 1);
        });
    };
}


module.exports = {

    // dev
    koaWebpackDev: function (compiler, option) {
        var doIt = webpackDevMiddleware(compiler, option);
        return function*(next) {
            var ctx = this;
            var req = this.req;
            var runNext = yield middleware(doIt, req, {
                end: function (content) {
                    ctx.body = content;
                },
                setHeader: function () {
                    ctx.set.apply(ctx, arguments);
                }
            });
            if (runNext) {
                yield *next;
            }
        };
    },


    // hot
    koaWebpackHot: function (compiler, option) {
        var action = webpackHotMiddleware(compiler, option);
        return function*(next) {
            var nextStep = yield middleware(action, this.req, this.res);
            if (nextStep && next) {
                yield* next;
            }
        };
    }

};
