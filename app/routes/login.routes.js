module.exports = app => {
    const login = require("../controllers/login.controller.js");

    let router = require("express").Router();

    // Return login page
    router.get("/", login.view);

    // Process login Auth
    router.post("/", login.process);

    // Logout
    router.get("/logout", login.logout);

    app.use("/api/login", router);
}