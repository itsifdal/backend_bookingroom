module.exports = app => {
    const user = require("../controllers/user.controller.js");

    let router = require("express").Router();

    // Retrieve all userss
    router.get("/", user.list);

    // Create a new post
    router.post("/", user.create);

    // // Retrieve all userss
    // router.get("/", user.findAll);

    // Retrieve single post
    router.get("/:user_id", user.findOne);

    // Update post
    router.put("/:user_id", user.update);

    // Delete single post
    router.delete("/:user_id", user.delete);


    app.use("/api/user", router);
}