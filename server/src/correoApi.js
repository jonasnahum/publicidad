/*var CorreoApi = (function() {
    var CorreoApi = function(nodemailer) {
        this.nodemailer = nodemailer.module;
        this.mg = nodemailer.module2;
    };
    CorreoApi.prototype.send = function(req, res, next){
        var that = this;
        
        var auth = {
              auth: {
                api_key: '',
                domain: ''
              }
            };
        
        var nodemailerMailgun = that.nodemailer.createTransport(that.mg(auth));
        var html = '<p><b>Nombre:</b> ' + req.body.name +'</p>'+
               '<p><b>Email:</b> ' + req.body.email +'</p>'+
               '<p><b>Teléfono:</b> ' + req.body.phone +'</p>'+
               '<p><b>Mensage:</b> ' + req.body.message +'</p>';

        nodemailerMailgun.sendMail({
          from: req.body.email,
          to: req.body.to, // An array if you have multiple recipients.
          subject: "Páginas Web Uruapan",
          html: html,
          //You can use "text:" to send plain-text content. It's oldschool!
          text: req.body.message,
        }, function (err, info) {
          if (err) {
            console.log('Error: desde correoApi.js ' + err);
          }
          else {
            console.log('Response: ' + info);
          }
        });
    };                       
    return CorreoApi;
})();

module.exports = CorreoApi; 
*/
var CorreoApi = (function() {
    var CorreoApi = function(nodemailer) {
        this.nodemailer = nodemailer.module;
        this.smtpTransport = nodemailer.module2;
    };
    CorreoApi.prototype.send = function(req, res, next){
        var that = this;
        
        var transporter = that.nodemailer.createTransport({
            service: 'Mailgun',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
         var html = '<p><b>Nombre:</b> ' + req.body.name +'</p>'+
               '<p><b>Email:</b> ' + req.body.email +'</p>'+
               '<p><b>Teléfono:</b> ' + req.body.phone +'</p>'+
               '<p><b>Mensage:</b> ' + req.body.message +'</p>';
        var mailOptions = {
            from: "weburuapan@gmail.com",
            to: req.body.to,
            subject: "Páginas Web Uruapan",
            text: req.body.message,
            html: html
        };
        transporter.sendMail(mailOptions, function(error, info){
            console.log("ERROR " + error);
            if(error){
                console.log("------------------------------error en archivo correoApi metodo sendMail");
                console.log(error);
                return;
            }
            res.json({ success: true });
        });
    };                       
    return CorreoApi;
})();
module.exports = CorreoApi; 