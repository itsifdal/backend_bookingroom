const db = require("../models");
const Room = db.rooms;
const Op = db.Sequelize.Op;

// Return Room Page.
exports.list = (req, res) => {
    const room_id  = req.query.room_id;
    let condition  = room_id ? { room_id: { [Op.like]: `%${room_id}%` } } : null;

    Room.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Error occured while find Booking List"
            });
        });
};

// Create and Save a new Room
exports.create = (req, res) => {
    //Validate request
    //console.log('fucek' + req.body.room_name);
    // Create a Room
    const room = {
        room_code: req.body.room_code,
        room_name: req.body.room_name,
        meeting_category: req.body.meeting_category
    };

    // Save Room in the database
    Room.create(room)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Room."
            })
        });
};

// Retrieve all Rooms from the database.
exports.findAll = (req, res) => {
    const room_code = req.query.room_code;
    let condition = room_code ? { room_code: { [Op.like]: `%${room_code}%` } } : null;

    Room.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find Room"
            });
        });
};

// Find a single Room with an id
exports.findOne = (req, res) => {
    const room_id = req.params.room_id;

    Room.findByPk(room_id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: "Error retrieving Room with id=" + room_id
            });
        });
};

// Update a Room by the id in the request
exports.update = (req, res) => {
    const room_id = req.params.room_id;

    Room.update(req.body, {
        where: { room_id: room_id }
    }).then((result) => {
        if ( result == 1 ) {
            res.send({
                message: "Room was updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update Room with id=${room_id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating Room with id=" + room_id
        })
    });
};

// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
    const room_id = req.params.room_id;

    Room.destroy({
        where: { room_id: room_id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "Room was deleted successfully"
            })
            //res.redirect('http://localhost:8080/api/room');
        } else {
            res.send({
                message: `Cannot delete Room with id=${room_id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Room with id=" + room_id
        })
    });
};
