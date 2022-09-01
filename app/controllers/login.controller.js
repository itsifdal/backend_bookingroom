//const db  = require("../config/db.config");
const jwt = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const { signupValidation, loginValidation } = require('../config/validation');
const { validationresult, Result } = require('express-validator');

const db = require("../models");
const User = db.users;
const Op   = db.Sequelize.Op;

// Process login 
exports.view = (req, res) => {
    res.render('loginpage', {
		url : 'http://localhost:8080/'
	});
};

// Process login 
exports.process = (req, res) => {
    User.findAll({
        where:{
            email: req.body.email
        },
        raw:true,
        nest:true,
    }).then((data) => {
        bcrypt.compare( req.body.password, data[0].password,
            (bErr, bResult) => {
                // wrong password
                if (bErr) { throw bErr;
                    return res.status(401).send({
                        message: 'Email or password is incorrect!'
                    });
                }
                if (bResult && data.length > 0) {
                    const token = jwt.sign({user_id:data[0].user_id},'the-super-strong-secrect',{ expiresIn: '1h' });
                    //db.query(`UPDATE users SET last_login = now() WHERE user_id = '${data[0].user_id}'`);
                    req.session.loggedin = true;
                    req.session.user_id  = data[0].user_id;
                    req.session.name     = data[0].name;
                    res.redirect('http://localhost:8080/api/booking');
                    // res.send({
                    //     message: "Session created,you're logged in as " + req.session.name 
                    // });
                }else{
                    res.send({
                        message: 'Email or password is incorrect!'
                    });
                }
                // res.send({
                //     message: 'Email or password is incorrect!'
                // });
            }
        );
    }).catch((err) => {
        res.status(500).send({
            message: "Error bangsat nda ada -> " + email
        });
    });
    
};

// Process login 
exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect('http://localhost:8080/api/login/');
};

  



