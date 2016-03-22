var PaginaWeb = function() {
};
PaginaWeb.errors = [];
PaginaWeb.db = [];

PaginaWeb.setError = function(method, err) {
    PaginaWeb.errors[method] = err;
};
PaginaWeb.getError = function(method) {
    return PaginaWeb.errors[method];
};

PaginaWeb.find = function(callback) {
    callback(PaginaWeb.errors["find"], PaginaWeb.db);    
};
PaginaWeb.findById = function(id, callback) {
    var found = undefined;
    for(var i = 0; i < PaginaWeb.db.length; i++) {
        if(PaginaWeb.db[i].id === id) {
            found = PaginaWeb.db[i];
            break;
        }
    }
    callback(PaginaWeb.errors["findById"], found);
};
PaginaWeb.findByIdAndRemove = function(id, callback) {
    PaginaWeb.findById(id, function(err, found) {
        if(err) return callback(err, found);
        var index = PaginaWeb.db.indexOf(found);
        PaginaWeb.db.splice(index, 1);
        callback(PaginaWeb.errors["findByIdAndRemove"], found);
    });
};
PaginaWeb.prototype.save = function(callback) {
    var index = PaginaWeb.db.indexOf(this);
    if(index === -1)
        PaginaWeb.db.push(this);
    
    return callback(PaginaWeb.errors["save"], this);
};

module.exports = PaginaWeb;