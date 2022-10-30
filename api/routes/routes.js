const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
const UsuarioController = require('../controllers/usuarioController');

router.get('/',loginController.login);
router.post('/auth',loginController.auth);
router.get('/logout',loginController.logout);
router.get('/usuarios',UsuarioController.user);
router.get('/usuarios-index',UsuarioController.showAll);

router.get('/dashboard',indexController.dashboard);

module.exports = router;