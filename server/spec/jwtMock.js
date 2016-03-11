var Jwt = {
    usuario : {},
    getForwardDate : function(){
        // get the current date & time
        var dateObj = Date.now();

        // Add 3 days to the current date & time
        // I'd suggest using the calculated static value instead of doing inline math
        // I did it this way to simply show where the number came from
        dateObj += 1000 * 60 * 60 * 24 * 3;
        // create a new Date object, using the adjusted time
        dateObj = new Date(dateObj);
    return dateObj;
    },
    module : {
        decode : function(token, calveSecreta){
            var exp = Jwt.getForwardDate();
               
            var iss = Jwt.usuario;
            var obj = {}
            obj.exp = exp;
            obj.iss = iss;
            return obj;
        }
    }
};
module.exports = Jwt;