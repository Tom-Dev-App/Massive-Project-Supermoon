const Router = require("express").Router();

app.get("/"); // get data before register
app.post("/"); // save data when registering user
app.get("/:uuid"); // get user's uuid for getting user informations
app.put("/:uuid"); // for updating user information
app.delete("/:uuid"); // for soft delet user account

module.exports = Router;
