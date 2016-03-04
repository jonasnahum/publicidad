var response = {
    value: undefined,
    json: function(obj) {
        console.log("sd-------------------------------");
        console.log(obj);
        response.value = obj;
        return JSON.stringify(obj);
    }
};

module.exports = response;