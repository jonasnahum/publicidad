var TokenMiddleware = (function() {
    var TokenMiddleware = function(models, jwt) {
        this.models = models;
        this.jwt = jwt.module;
    };
    
    TokenMiddleware.prototype.validate = function(req, res, next) {
        var that = this;
        return next();
    }
    return TokenMiddleware;
})();

module.exports = TokenMiddleware;

