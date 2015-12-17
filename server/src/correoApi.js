
var CorreoApi = (function() {
    var CorreoApi = function(nodemailer) {
        this.nodemailer = nodemailer.module;
    };
//curl -i -H "Content-Type: application/json" -d '{"from":"jonasnahum@gmail.com","pass":"jonasoctubre","subject":"este es subject","text":"jonasoctubre este es el texto"}' http://localhost:3000/correo 
    CorreoApi.prototype.send = function(req, res, next){
        var that = this;
        var transporter = that.nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || "jonasnahum@gmail.com",
                pass: process.env.EMAIL_PASS || "jonasoctubre"
            }
        });
         var html = '<p><b>Nombre:</b> ' + req.body.name +'</p>'+
               '<p><b>Email:</b> ' + req.body.email +'</p>'+
               '<p><b>Teléfono:</b> ' + req.body.phone +'</p>'+
               '<p><b>Mensage:</b> ' + req.body.message +'</p>';
        var mailOptions = {
            from: req.body.email,
            to: req.body.to,
            subject: "correo de cliente",
            text: req.body.message,
            html: html
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log(mailOptions);
            res.json({ success: true });
        });
    };                       
    return CorreoApi;
})();

module.exports = CorreoApi; 
