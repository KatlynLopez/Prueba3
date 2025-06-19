const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');


router.post ('/', teacherController.getTeachersByPassword)

module.exports = router;
