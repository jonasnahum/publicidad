var PaginaWeb = function() {
};
PaginaWeb.errors = [];
PaginaWeb.db = [];
PaginaWeb.objetoBuscado = undefined;
PaginaWeb._path = undefined;
PaginaWeb.metodoQueBusca = undefined;

PaginaWeb.setError = function(method, err) {
    PaginaWeb.errors[method] = err;
};
PaginaWeb.getError = function(method) {
    return PaginaWeb.errors[method];
};
PaginaWeb.populate = function(_path) {
    PaginaWeb._path = _path;
    return this;
};
PaginaWeb.exec = function(callback) {
    callback(PaginaWeb.errors[PaginaWeb.metodoQueBusca], PaginaWeb.db);
};
PaginaWeb.find = function(objetoBuscado) {
    PaginaWeb.metodoQueBusca = "find";
    PaginaWeb.objetoBuscado = objetoBuscado;
    return this;
};
PaginaWeb.findOne = function(obj, callback) {
    var found = undefined;
    var valueOfProperty = undefined;//returns el valor de la primera propiedad
    var nameOfProperty = undefined;
    for(var name in obj) {
        nameOfProperty = name;
        valueOfProperty = obj[name];
    }
    for(var i = 0; i < PaginaWeb.db.length; i++) {
        if(PaginaWeb.db[i].nameOfProperty === obj.valueOfProperty) {
            found = PaginaWeb.db[i];
            break;
        }
    }
    callback(PaginaWeb.errors["findOne"], found);    
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
/*
Usuario.findByIdAndRemove = function(id, callback) {
    var objId = undefined;
    if (typeof id == "number"){
        objId = {id: id};
    }else{
        objId = id;
    }
    var found = Usuario.findByProperty(objId);
    var index = Usuario.db.indexOf(found);
    Usuario.db.splice(index, 1);
    callback(Usuario.errors["findByIdAndRemove"], found);
};

*/
PaginaWeb.prototype.save = function(callback) {
    var index = PaginaWeb.db.indexOf(this);
    if(index === -1)
        PaginaWeb.db.push(this);
    
    return callback(PaginaWeb.errors["save"], this);
};

module.exports = PaginaWeb;