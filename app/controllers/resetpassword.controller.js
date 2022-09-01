const db = require("../models");
const User = db.users;
const Op   = db.Sequelize.Op;


//view
exports.view = (req, res) => {
	res.render('resetpasswordejs', {
		url : 'http://localhost:8080/',
		title: 'Reset Password Page',
		token: req.query.token
	});
};

// Process login 
exports.updatepassword = (req, res) => {
	var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
	User.update(
		{
			password: hash,
		},
		{
			where: { token: req.body.token },
		}
	).then((data) => {
        if ( data > 0 ) {
            res.redirect('http://localhost:8080/api/login');
        }else{
            res.send({
                message: `Error updating password`
            })
        }
    })
    
};

