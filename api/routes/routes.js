const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
const usuarioRouter = require('./usuario')

router.get('/',loginController.login);
router.post('/auth',loginController.auth);
router.get('/logout',loginController.logout);
router.get('/dashboard',indexController.dashboard);

router.use('/usuarios', usuarioRouter);
module.exports = router;