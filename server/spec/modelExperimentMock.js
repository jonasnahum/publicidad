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
    callback(PaginaWeb.getError(PaginaWeb.metodoQueBusca), PaginaWeb.findByProperty());
    //callback(PaginaWeb.errors[PaginaWeb.metodoQueBusca], PaginaWeb.db);
};

/*PaginaWeb.find = function(objetoBuscado) {
    PaginaWeb.metodoQueBusca = "find";
    PaginaWeb.objetoBuscado = objetoBuscado;
    return this;
};
/*/
PaginaWeb.find = function(callback) {
    PaginaWeb.metodoQueBusca = "find";
    if(typeof callback == "object" || typeof callback == "undefined") {//fir populate
        PaginaWeb.objetoBuscado = arguments[0];
        return this;
    }
    if(typeof callback == "function") {
        callback(PaginaWeb.errors["find"], PaginaWeb.db);  
    }
};


/*
PaginaWeb.find = function(callback) {
    //PaginaWeb.metodoQueBusca = "find";
    //callback(PaginaWeb.getError(PaginaWeb.metodoQueBusca), PaginaWeb.findByProperty());
    
    PaginaWeb.metodoQueBusca = "find";
    if(arguments[0] == null) {//fir populate
        return PaginaWeb;
    }
    if(typeof callback == "object") {
        //PaginaWeb.metodoQueBusca = "find";
        //callback(PaginaWeb.getError(PaginaWeb.metodoQueBusca), PaginaWeb.findByProperty());
         var found = undefined;
            for(var i = 0; i < PaginaWeb.db.length; i++) {
                if(PaginaWeb.db[i].id === callback.id) {
                    found = PaginaWeb.db[i];
                    break;
                }
            }
            return found;
    }
    callback(PaginaWeb.errors["find"], PaginaWeb.db);  
};
*/

/*
PaginaWeb.find = function(objetoBuscado) {
    PaginaWeb.metodoQueBusca = "find";
    PaginaWeb.objetoBuscado = objetoBuscado;
    return this;
};
*/


PaginaWeb.findOne = function(objetoBuscado, callback) {
    PaginaWeb.metodoQueBusca = "findOne";
    if(callback) {
        callback(PaginaWeb.getError(PaginaWeb.metodoQueBusca), PaginaWeb.findByProperty());
    }
    else {
        PaginaWeb.objetoBuscado = objetoBuscado;
        return this;
    }
};
/*
PaginaWeb.findOne = function(objetoBuscado) {
    PaginaWeb.metodoQueBusca = "findOne";
    PaginaWeb.objetoBuscado = objetoBuscado;
    return this;
};
*/
PaginaWeb.prototype.save = function(callback) {
    var index = PaginaWeb.db.indexOf(this);
    if(index === -1)
        PaginaWeb.db.push(this);
    
    return callback(PaginaWeb.errors["save"], this);
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

module.exports = PaginaWeb;

/*var ModelExperiment = function() {
};
ModelExperiment.errors = [];
ModelExperiment.db = [];
ModelExperiment._path = undefined;
ModelExperiment.objetoBuscado = undefined;
ModelExperiment.metodoQueBusca = undefined;


ModelExperiment.setError = function(method, err) {
    ModelExperiment.errors[method] = err;
};
ModelExperiment.getError = function(method) {
    return ModelExperiment.errors[method];
};
ModelExperiment.populate = function(_path){
    ModelExperiment._path = _path;
    return this;
};

ModelExperiment.exec = function(callback){
    callback(ModelExperiment.errors["find"], ModelExperiment.db);    
};
/*PaginaWeb.exec = function(callback) {
    callback(PaginaWeb.getError(PaginaWeb.metodoQueBusca), PaginaWeb.findByProperty());
};
PaginaWeb.exec = function(callback) {
    callback(PaginaWeb.errors[PaginaWeb.metodoQueBusca], PaginaWeb.db);
};
*__________________________________________________/


ModelExperiment.find = function(callback) {//puede ser parecido a remove.
    if (arguments[0] == null){//for populate
        return ModelExperiment; 
    }
    if (typeof callback == "object"){
        var found = undefined;
        for(var i = 0; i < ModelExperiment.db.length; i++) {
            if(ModelExperiment.db[i].id === callback.id) {
                found = ModelExperiment.db[i];
                break;
            }
        }
        return found;
    };
    callback(ModelExperiment.errors["find"], ModelExperiment.db);    
};
/*PaginaWeb.find = function(objetoBuscado) {
    PaginaWeb.metodoQueBusca = "find";
    PaginaWeb.objetoBuscado = objetoBuscado;
    return this;
};
*_____________________________________________________________/
ModelExperiment.findOne = function(obj, callback) {
    var found = undefined;
    var valueOfProperty = undefined;//returns el valor de la primera propiedad
    var nameOfProperty = undefined;
    for(var name in obj) {
        nameOfProperty = name;
        valueOfProperty = obj[name];
    }
    for(var i = 0; i < ModelExperiment.db.length; i++) {
        if(ModelExperiment.db[i].nameOfProperty === obj.valueOfProperty) {
            found = ModelExperiment.db[i];
            break;
        }
    }
    callback(ModelExperiment.errors["findOne"], found);    
};

/*
PaginaWeb.findOne = function(objetoBuscado) {
    PaginaWeb.metodoQueBusca = "findOne";
    PaginaWeb.objetoBuscado = objetoBuscado;
    return this;
};

*____________________________________________________________/

ModelExperiment.findByIdAndRemove = function(id, callback) {
    var objId = undefined;
    if (typeof id == "number"){
        objId = {id: id};
    }else{
        objId = id;
    }
    var found = ModelExperiment.findByProperty(objId);
    var index = ModelExperiment.db.indexOf(found);
    ModelExperiment.db.splice(index, 1);
    callback(ModelExperiment.errors["findByIdAndRemove"], found);
};
/*

PaginaWeb.findByIdAndRemove = function(id, callback) {
    PaginaWeb.findById(id, function(err, found) {
        if(err) return callback(err, found);
        var index = PaginaWeb.db.indexOf(found);
        PaginaWeb.db.splice(index, 1);
        callback(PaginaWeb.errors["findByIdAndRemove"], found);
    });
};
*______________________________________________________________________/

ModelExperiment.findByProperty = function(obj) {    
    if(obj == undefined){
        return ModelExperiment.db;
    }
    var found = undefined;
    var valueOfProperty = undefined;//returns el valor de la primera propiedad
    var nameOfProperty = undefined;
    for(var name in obj) {
        nameOfProperty = name;
        valueOfProperty = obj[name];
    }
    for(var i = 0; i < ModelExperiment.db.length; i++) {
        if(ModelExperiment.db[i].nameOfProperty === obj.valueOfProperty) {
            found = ModelExperiment.db[i];
            break;
        }
    }
    return found;
};


*/