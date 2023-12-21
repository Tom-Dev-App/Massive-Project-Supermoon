const Router = require("express").Router();

app.get("/"); // get user data payments
app.get("/:uuid"); // get user's uuid for getting user informations
app.put("/:uuid"); // for updating payment status

module.exports = Router;
