var CorreoApi = (function() {
    var CorreoApi = function(nodemailer) {
        this.nodemailer = nodemailer.module;
        this.smtpTransport = nodemailer.module2;
    };
    CorreoApi.prototype.send = function(req, res, next){
        var that = this;
        
        var transporter = that.nodemailer.createTransport(that.smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || "weburuapan@gmail.com",
                pass: process.env.EMAIL_PASS || "monsejonasrodrigo"
            }
        }));
         var html = '<p><b>Nombre:</b> ' + req.body.name +'</p>'+
               '<p><b>Email:</b> ' + req.body.email +'</p>'+
               '<p><b>Teléfono:</b> ' + req.body.phone +'</p>'+
               '<p><b>Mensage:</b> ' + req.body.message +'</p>';
        var mailOptions = {
            from: req.body.email,
            to: req.body.to,
            subject: "Páginas Web Uruapan",
            text: req.body.message,
            html: html
        };
        transporter.sendMail(mailOptions, function(error, info){
            console.log("ERROR " + error);
            if(error){
                return next(error);
            }
            res.json({ success: true });
        });
    };                       
    return CorreoApi;
})();

module.exports = CorreoApi; 