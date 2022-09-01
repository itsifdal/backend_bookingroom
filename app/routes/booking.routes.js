module.exports = app => {
    const booking = require("../controllers/booking.controller.js");

    let router = require("express").Router();

    // Get Booking List 
    router.get("/", booking.list);

    // Get Booking By Id
    router.get("/:booking_id", booking.findById);

    // Get Booking By Code
    router.get("/:booking_code", booking.findByCode);

    // Create booking 
    router.post("/", booking.create);

    // Update booking 
    router.put("/:booking_id", booking.update);

    // Delete booking 
    router.delete("/:booking_id", booking.delete);
    
    app.use("/api/booking", router);
}