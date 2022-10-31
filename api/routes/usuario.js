const Router = require('express').Router
const router = Router()
const UsuarioController = require('../controllers/usuarioController')

// redirecciones
router.get('/crear', UsuarioController.create);
router.get('/edit/:id', UsuarioController.edit);
// metodos
router.get('/', UsuarioController.showAll);
router.post('/', UsuarioController.store);
router.post('/editar/:id', UsuarioController.update);
router.get('/eliminar/:id', UsuarioController.delete);

module.exports = router
