var express = {
    routes: {},
    http: function(path) {//ejecuta lo guardado en routes, que es una función que recibe parámetros req,res y next.
        express.routes[path]
        (
            express.handlerParams.req,
            express.handlerParams.res,
            express.handlerParams.next
        );
    },
    middleware: undefined,
    executeMiddleware:function(){
        express.middleware(
            express.handlerParams.req,
            express.handlerParams.res,
            express.handlerParams.next
        );    
    },
    handlerParams: {
        err: undefined,
        req: {
            user: undefined,
            body: {
                access_token: undefined
            },
            params: undefined,
            query: {
                access_token: undefined
            }
        },
        res: {
            numero: undefined,
            text: undefined,
            jsonValue: undefined,
            json: function(config) {
                express.handlerParams.res.jsonValue = config;
            },
            send: function (text) {
                express.handlerParams.res.text = text;
            },       
            status: function(status){
                express.handlerParams.res.numero = status;
                return express.handlerParams.res; 
            }
        },
        next: function(err) {
            express.handlerParams.err = err;
        }
    },
    module: {
        Router: function() {
            var router = {//guarda en routes los parámetros que vienen del controller.
                get: function(path, tokenMiddleware, routeHandler) {
                    express.middleware = tokenMiddleware;
                    express.routes["get" + path] = routeHandler;
                },
                post: function(path, routeHandler) {
                    express.routes["post" + path] = routeHandler;
                },
                put: function(path, tokenMiddleware,  routeHandler) {
                    express.middleware = tokenMiddleware;
                    express.routes["put" + path] = routeHandler;
                },
                delete: function(path, routeHandler) {
                    express.routes["delete" + path] = routeHandler;
                }, 
            };
            
            return router;
        }
    }
};

module.exports = express;