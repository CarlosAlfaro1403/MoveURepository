const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
const usuarioRouter = require('./usuario')
const viajeRouter = require('./viaje')
const sedeRouter = require('./sede')

router.get('/',loginController.login);
router.post('/auth',loginController.auth);
router.get('/logout',loginController.logout);
router.get('/dashboard',indexController.dashboard);
router.get('/dashboardT',indexController.dashboardT);
router.get('/dashboardO',indexController.dashboardO);

router.use('/usuarios', usuarioRouter);
router.use('/viajes', viajeRouter);
router.use('/sedes', sedeRouter);
module.exports = router;