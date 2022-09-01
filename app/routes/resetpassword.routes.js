module.exports = app => {
    const resetpassword = require("../controllers/resetpassword.controller.js");

    let router = require("express").Router();

    // Return login page
    router.get("/", resetpassword.view);

    // Process login Auth
    router.post("/", resetpassword.updatepassword);

    app.use("/api/resetpassword", router);
}