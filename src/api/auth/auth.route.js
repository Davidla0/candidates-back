const express = require("express");
const { signup, signin } = require("./auth.controller");
const { createUserSchema } = require("../schema/user.schema");
const { validate } = require("../middleware/user.middleware");

const router = express.Router();

router.post('/signup', validate(createUserSchema), signup);
router.post('/signin', signin);

module.exports = router;
