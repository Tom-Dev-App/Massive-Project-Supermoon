const Router = require("express").Router();
const {
  getRegister,
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  getImage,
  uploadImage,
  replaceImage,
  deleteImage,
} = require("../controllers/auth.controller");
const validateRegistrationFields = require("../validation/validateRegistration");
const validateLogin = require("../validation/validateLogin");

Router.get("/", getRegister); // get data before register
Router.post("/", [validateRegistrationFields, register]); // save data when registering user
// Router.get('/:uuid') // get user's uuid for getting user informations
// Router.put('/:uuid') // for updating user information
// Router.delete('/:uuid') // for soft delete user account

// For handling user profile image
// Router.get('/image') // get information about image
// Router.post('/image') // for uploading new image
// Router.put('/image') // replace image
// Router.delete('/image') // for deleting image

// authenticate users
Router.post("/login", [validateLogin, login]); // login for getting token
// LOGOUT is handle in frontend to set JWT time

module.exports = Router;
