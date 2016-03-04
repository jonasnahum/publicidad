var response = {
    value: undefined,
    json: function(obj) {
        response.value = obj;
        return JSON.stringify(obj);
    }
};

module.exports = response;