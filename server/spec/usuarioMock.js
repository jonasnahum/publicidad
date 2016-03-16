var Usuario = function() {
};
Usuario.errors = [];
Usuario.db = [];

Usuario.setError = function(method, err) {
    Usuario.errors[method] = err;
};
Usuario.getError = function(method) {
    return Usuario.errors[method];
};

Usuario.find = function(callback) {//puede ser parecido a remove.
    if (typeof callback == "object"){
        var found = undefined;
        for(var i = 0; i < Usuario.db.length; i++) {
            if(Usuario.db[i].id === callback.id) {
                found = Usuario.db[i];
                break;
            }
        }
        return found;
    };
    callback(Usuario.errors["find"], Usuario.db);    
};
Usuario.findById = function(id, callback) {
    var found = undefined;
    for(var i = 0; i < Usuario.db.length; i++) {
        if(Usuario.db[i].id === id) {
            found = Usuario.db[i];
            break;
        }
    }
    callback(Usuario.errors["findById"], found);
};
Usuario.prototype.save = function(callback) {
    var index = Usuario.db.indexOf(this);
    if(index === -1)
        Usuario.db.push(this);
    
    return callback(Usuario.errors["save"], this);
};
Usuario.findByIdAndRemove = function(id, callback) {
    Usuario.findById(id, function(err, found) {
        if(err) return callback(err, found);
        var index = Usuario.db.indexOf(found);
        Usuario.db.splice(index, 1);
        callback(Usuario.errors["findByIdAndRemove"], found);
    });
};
Usuario.remove = function(obj, callback) {
    if(obj.length === undefined){
        Usuario.db = [];
    }
    callback(Usuario.errors["remove"], Usuario.db);
};

module.exports = Usuario;