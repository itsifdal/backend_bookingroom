module.exports = app => {
    const room = require("../controllers/room.controller.js");

    let router = require("express").Router();

    // Retrieve all room
    router.get("/", room.list);
    
    // Create a new post
    router.post("/", room.create);

    // Retrieve single post
    router.get("/:room_id", room.findOne);

    // Update post
    router.put("/:room_id", room.update);

    // Delete single post
    router.delete("/:room_id", room.delete);


    app.use("/api/room", router);
}