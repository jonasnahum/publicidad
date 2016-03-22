var Nodemailer = {
    service: undefined,
    user: undefined,
    pass: undefined,
    mailOptions: undefined,
    callback: undefined,
    errors : [],
    setError : function(method, err) {
        Nodemailer.errors[method] = err;
    },
    getError : function(method) {
        return Nodemailer.errors[method];
    },
    module :{
        createTransport: function(config){
            Nodemailer.service= config.service;
            Nodemailer.user= config.auth.user;
            Nodemailer.pass= config.auth.pass;
            return Nodemailer.module;
        },
        sendMail: function(mailOptions, callback){
            Nodemailer.mailOptions= mailOptions;
            Nodemailer.callback= callback;
            callback(Nodemailer.errors["send"], {}); 
        }
    },    
};
module.exports = Nodemailer;