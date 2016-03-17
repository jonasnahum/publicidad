var Jwt = {
    usuario : {},
    tokenEncodeado: undefined,
    fecha : undefined,
    getDate : function(){
        return Jwt.fecha;
    },
    module : {
        decode : function(token, calveSecreta){
            var exp = Jwt.getDate();
               
            var iss = Jwt.usuario;
            var obj = {};
            obj.exp = exp;
            obj.iss = iss;
            return obj;
        },
        encode : function(objeto, calveSecreta){
            objeto.calveSecreta = calveSecreta;
            Jwt.tokenEncodeado = objeto;
            return objeto;
        },
    }
};
module.exports = Jwt;