const express = require('express');
const router = express.Router();

const { getMe, updateMe } = require("../controllers/user");
const protect = require("../middleware/authmiddleware");

const { signup } = require('../controllers/signup');
const { signin } = require('../controllers/signin');

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
