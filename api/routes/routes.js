const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
const usuarioRouter = require('./usuario')
const viajeRouter = require('./viaje')
const sedeRouter = require('./sede')
const taxistaRouter = require('./taxistas')
const tipoUsuarioRouter = require('./tipoUsuario')
const accidenteRouter = require('./accidente')
const quejaRouter = require('./queja')
const vehiculoRouter = require('./vehiculo')
const cooperativaRouter = require('./cooperativa')
const clienteRouter = require('./cliente')

router.get('/',loginController.login);
router.post('/auth',loginController.auth);
router.get('/logout',loginController.logout);
router.get('/dashboard',indexController.dashboard);
router.get('/dashboardT',indexController.dashboardT);
router.get('/dashboardO',indexController.dashboardO);

router.use('/usuarios', usuarioRouter);
router.use('/viajes', viajeRouter);
router.use('/sedes', sedeRouter);
router.use('/taxistas', taxistaRouter);
router.use('/tipoUsuarios', tipoUsuarioRouter);
router.use('/accidentes', accidenteRouter);
router.use('/quejas', quejaRouter);
router.use('/vehiculos', vehiculoRouter);
router.use('/cooperativas', cooperativaRouter);
router.use('/clientes', clienteRouter);
module.exports = router;