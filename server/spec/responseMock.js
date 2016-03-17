var response = {
    value: undefined,
    json: function(obj) {
        response.value = obj;
        return JSON.stringify(obj);
    },
    numero: undefined,
    text: undefined,
    send: function (text) {
        response.text = text;
    },       
    status: function(status){
        response.numero = status;
        return response; 
    },
    sendStatus:function(status){        
        response.numero = status;
    }
};

module.exports = response;