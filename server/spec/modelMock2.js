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
PaginaWeb.find = function(callback) {
    PaginaWeb.metodoQueBusca = "find";
    if(typeof callback == "object") {
        PaginaWeb.objetoBuscado = arguments[0];
        return PaginaWeb.objetoBuscado;
    }
    if(typeof callback == "undefined") {//fir populate
        PaginaWeb.objetoBuscado = arguments[0];
        return this;
    }
    if(typeof callback == "function") {
        callback(PaginaWeb.errors["find"], PaginaWeb.db);  
    }
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
    PaginaWeb.objetoBuscado = id;
    var found = PaginaWeb.findByProperty ();
    var index = PaginaWeb.db.indexOf(found);
    PaginaWeb.db.splice(index, 1);
    callback(PaginaWeb.errors["findByIdAndRemove"], found);
};
PaginaWeb.prototype.save = function(callback) {
    var index = PaginaWeb.db.indexOf(this);
    if(index === -1)
        PaginaWeb.db.push(this);
    return callback(PaginaWeb.errors["save"], this);
};
PaginaWeb.remove = function(obj, callback) {
    var db;
    if(obj._usuario === undefined){
        db = PaginaWeb.db = [];
    }
    else{       
        for(var i = 0; i < PaginaWeb.db.length; i++) {
            if(PaginaWeb.db[i]._usuario === obj._usuario) {
                db = PaginaWeb.db[i];
                PaginaWeb.db.splice(i, 1);
                break;
            }
        }
    }        
    callback(PaginaWeb.errors["remove"], db);
    
};
PaginaWeb.findByProperty = function() {
    var obj = PaginaWeb.objetoBuscado;
    if(obj == undefined){
        return PaginaWeb.db;
    }
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
    return found;
};

module.exports = PaginaWeb;