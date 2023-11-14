const express = require(`express`);
const router = express.Router();
const Controller = require(`../Controller/users`);
const verifytoken = require(`../Middleware/authrization`);
const UserRole = require(`../utility/UserRole`);
const allowed_to = require(`../Middleware/AllowedTo`);

router.get(`/users`, verifytoken, Controller.all_users);
router.post(`/register`, Controller.register);
router.post(`/login`, Controller.login);

module.exports = router;
