const Router = require('express').Router
const router = Router()
const UsuarioController = require('../controllers/usuarioController')

router.get('/', UsuarioController.showAll)
// router.get('/:id', UsuarioController.show)

module.exports = router
