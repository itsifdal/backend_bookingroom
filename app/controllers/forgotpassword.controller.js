var nodemailer = require('nodemailer');
var randtoken  = require('rand-token');

const db = require("../models");
const User = db.users;
const Op   = db.Sequelize.Op;

// Process login 
exports.view = (req, res) => {
    res.render('forgotpassword', {
		url : 'http://localhost:8080/'
	});
};

// Process login 
exports.emailsent = (req, res) => {
    res.render('emailsent', {
		url : 'http://localhost:8080/'
	});
};

// Send link to email
exports.sendemailrecover = (req, res) => {
    User.findAll({
        where:{
            email: req.body.email
        },
        raw:true,
        nest:true,
    }).then((data) => {
        console.log(data[0]);
        email = data[0].email;
        if(data.length > 0) {
			var token = randtoken.generate(20);
			var sent  = sendEmail(email, token);
			if (sent != '0') {
                User.update(
                    {
                        token: token,
                    },
                    {
                    where: { email: req.body.email },
                    }
                );
				res.redirect('http://localhost:8080/api/forgotpassword/emailsent')
				// res.send({
				// 	message :'The reset password link has been sent to ' + req.body.email
				// })
			}else{
				res.send({
					message :'Not sent, error!'
				})	
			}
		} else {
			console.log('2');
			type = 'error';
			msg = 'The Email is not registered with us';
		}
    }).catch((err) => {
        res.status(500).send({
            message: "Tak ada email itu di database" 
        });
    });
    
};

//funtion kirim email
function sendEmail(email, token) {
	var email = email;
	var token = token;
	var transporter  = nodemailer.createTransport({
		host: 'smtp.gmail.com',
      	port: 465,
      	secure: true,
		auth: {
			user: 'ifdaltry@gmail.com', // Your email id
			pass: 'lqvmbfmcuudaucgw' // Your password
		}
	});
	var mailOptions = { 
		from: 'ifdaltry@gmail.com',
		to: email,
		subject: 'Reset Password Link - Quatro Booking Room',
		html:'<p>Anda meminta link reset password, klik <a href="http://localhost:8080/api/resetpassword?token=' + token + '">link</a> reset password quatro booking<br>by LDC Dev</p>'
	};
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}

