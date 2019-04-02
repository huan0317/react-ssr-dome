/* 1
// const Koa = require('koa');

// const app = new Koa();

// app.use(ctx => {
//     ctx.body = <App/>
// })

// app.listen(9000, () => {
//     console.log(`node服务已经启动, 请访问localhost:9000`)
// })
*/

/* 2
// jsx编译之后会用到React对象, 所以需要引入
import React from 'react';
import Koa from 'koa';
import { renderToString } from "react-dom/server";

const app = new Koa();

const App = () => <div>Hello Koa SSR</div>

app.use(ctx => {
    ctx.body = renderToString(<App/>);
})

app.listen(9000, () => {
    console.log(`node服务已经启动, 请访问localhost:9000`)
})
*/

import Koa from 'koa';
import routes from './router';
import templating from './templating'

const app = new Koa();

app.use(templating);
app.use(routes.routes(), routes.allowedMethods());

app.listen(9000, () => {
    console.log(`node服务已经启动, 请访问localhost:9000`)
})