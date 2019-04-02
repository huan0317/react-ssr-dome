// import Router from 'koa-router';
// import RouterConfig from '../../app/router0';
// import { StaticRouter } from 'react-router-dom';
// import { renderToString } from "react-dom/server";
// import React from 'react';

// const routes = new Router();

// routes.get('/', (ctx, next) => {
//     ctx.body = renderToString(
//         <StaticRouter location={ctx.url}>
//             <RouterConfig/>
//         </StaticRouter>
//     )
//     next();
// })

// routes.get('/list', (ctx, next) => {
//     ctx.body = renderToString(
//         <StaticRouter location={ctx.url}>
//             <RouterConfig/>
//         </StaticRouter>
//     )
//     next();
// })

// export default routes;

// 一下看不懂没关系，听我来解释
// 首先我们用koa-router注册了/ /list 两个路由，并且使用renderToString将组件转成html。
// 那这个StaticRouter是干嘛的呢？和BrowserRouter有什么区别？
// 其实很简单，在浏览器上我们可以使用js获取到location，但是在node环境却获取不到，所以react-router提供了StaticRouter来让我们自己设置location。

// 现在你也许会有另外一个疑问，这两个路由设置写的代码不是都一样的么，
// 为什么还要去区分路由？这是应为在生成html之前我们还需要获取对应的数据，所以必须要分开。后面我会继续讲ssr如何处理数据

import Router from 'koa-router';
import React from 'react';

const routes = new Router();

routes.get('/', (ctx, next) => {
    ctx.render({
        home: {
            title: '我是从node中获取的数据'
        }
    });
    next();
})

routes.get('/list', (ctx, next) => {
    ctx.render({
        list: {
            list: [
                '我是从node中获取的数据',
                '感觉还不错',
                '测试成功',
            ]
        }
    });
    next();
})

export default routes;
