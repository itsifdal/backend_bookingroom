const db = require("../models");
const Booking = db.bookings;
const Room    = db.rooms;
const User    = db.users;
const Op = db.Sequelize.Op;


// Return Booking Page.
exports.list = (req, res) => {
    const booking_id = req.query.booking_id;
    let condition    = booking_id ? { booking_id: { [Op.like]: `%${booking_id}%` } } : null;

    Booking.findAll({ where: condition })
        .then((data) => {

            //ngambil data room yang id nya ada di booking
            Room.findAll({
                where:{
                    room_id: data[0].room_id
                },
                raw:true,
                nest:true,
            }).then((dataroom) => {
                room_id   = dataroom[0].room_id;
                room_name = dataroom[0].room_name;
            })

            //ngambil data user yang id nya ada di booking
            User.findAll({
                where:{
                    user_id: data[0].user_id
                },
                raw:true,
                nest:true,
            }).then((datauser) => {
                user_id   = datauser[0].user_id;
                user_name = datauser[0].name;
                
            })
            //render bookinglist page
            // res.render('bookinglist', {
            //     url : 'http://localhost:8080/',
            //     name: req.session.name,
            //     data: data,
            //     room_name: room_name,
            //     user_name: user_name
            // });
            
            res.send({room_name, user_name, data});
            //res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Error occured while find Booking List"
            });
        });
};

//Find a single Booking with an id
exports.findById = (req, res) => {
    const booking_id = req.params.booking_id;

    Booking.findByPk(booking_id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: "Error retrieving Booking data with id=" + booking_id
            });
        });
};


//Find a single Booking with Code
exports.findByCode = (req, res) => {
    const booking_code = req.params.booking_code;

    Booking.findAll({
        where:{
            booking_code: booking_code
        },
        raw:true,
        nest:true,
    }).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: "Error retrieving Booking data with code=" + booking_code
            });
        });
};


// Create and Save a new Booking
exports.create = (req, res) => {
    // Validate request
    if (!req.body.meeting_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return ;
    }
    //define booking code
    let booking_code = req.body.room_id + req.body.user_id + req.body.time_start;

    // Create a Booking data
    const booking = {
        room_id: req.body.room_id,
        user_id: req.body.user_id,
        booking_code: booking_code,
        meeting_name: req.body.meeting_name,
        meeting_category: req.body.meeting_category,
        time_start: req.body.time_start,
        time_end: req.body.time_end
    };

    // Save Booking in the database
    Booking.create(booking)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while create Booking."
            })
        });
};


// Update a Room by the id in the request
exports.update = (req, res) => {
    const booking_id = req.params.booking_id;

    Booking.update(req.body, {
        where: { booking_id: booking_id }
    }).then((data) => {
        if ( data > 0 ) {
            res.send({
                message: "Your booking data updated succesfully!"
            });
        } else {
            res.send({
                message: `Cannot update booking data with id = ${booking_id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating booking data with id=" + booking_id
        })
    });
};

// // Delete a Room with the specified id in the request
exports.delete = (req, res) => {
    const booking_id = req.params.booking_id;

    Booking.destroy({
        where: { booking_id: booking_id }
    }).then((data) => {
        if ( data > 0 ) {
            res.send({
                message: "1 Booking data deleted successfully"
            })
        } else {
            res.send({
                message: `Cannot delete booking data with id = ${booking_id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Error deleting booking data with id = ${booking_id}.`
        })
    });
};
