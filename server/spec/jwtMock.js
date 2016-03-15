var Jwt = {
    usuario : {},
    fecha : undefined,
    getDate : function(){
        return Jwt.fecha;
    },
    module : {
        decode : function(token, calveSecreta){
            var exp = Jwt.getDate();
               
            var iss = Jwt.usuario;
            var obj = {}
            obj.exp = exp;
            obj.iss = iss;
            return obj;
        }
    }
};
module.exports = Jwt;