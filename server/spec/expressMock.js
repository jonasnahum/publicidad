var express = {
    routes: {},
    http: function(path) {
        express.routes[path]
        (
            express.handlerParams.req,
            express.handlerParams.res,
            express.handlerParams.next
        );
    },
    handlerParams: {
        err: undefined,
        req: {
            body: undefined,
            params: undefined
        },
        res: {
            jsonValue: undefined,
            json: function(config) {
                express.handlerParams.res.jsonValue = config;
            } 
        },
        next: function(err) {
            express.handlerParams.err = err;
        }
    },
    module: {
        Router: function() {
            var router = {
                get: function(path, routeHandler) {
                    express.routes["get" + path] = routeHandler;
                },
                post: function(path, routeHandler) {
                    express.routes["post" + path] = routeHandler;
                },
                put: function(path, routeHandler) {
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