module.exports = app => {
    const forgotpassword = require("../controllers/forgotpassword.controller.js");

    let router = require("express").Router();

    // Return Forgotpassword page
    router.get("/", forgotpassword.view);

    // Send Link Email 
    router.post("/", forgotpassword.sendemailrecover);

    // Email sent
    router.get("/emailsent", forgotpassword.emailsent);

    app.use("/api/forgotpassword", router);
}