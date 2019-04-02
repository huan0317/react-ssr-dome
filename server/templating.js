import fs from 'fs';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import RouterConfig from '../app/router'
import React from 'react';
import path from 'path';
import { Provider } from 'react-redux'; //+
import createStore from '../app/redux/store'; //+

// 匹配模板中的{{}}
function templating(props) {
    const template = fs.readFileSync(path.join(__dirname, '../template/server.html'), 'utf-8');
    return template.replace(/{{([\s\S]*?)}}/g, (_, key) => props[ key.trim() ]);
}

export default function(ctx, next) {
    try {
        ctx.render = (data = {}) => { // +
            const store = createStore(data); //+
            const html = renderToString(
                <Provider store={ store }>
                    <StaticRouter location={ ctx.url }>
                        <RouterConfig/>
                    </StaticRouter>
                </Provider>
            );
            const body = templating({
                html,
                store: JSON.stringify(data, null, 4), // +
            });
            ctx.body = body;
            ctx.type = 'text/html';
        }
    }
    catch (err) {
        ctx.body = templating({ html: err.message });
        ctx.type = 'text/html';
    }
    ctx.type = 'text/html';
    // 这里必须是return next() 不然异步路由是404
    return next();
}
