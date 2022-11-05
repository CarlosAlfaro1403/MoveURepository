const Router = require('express').Router
const router = Router()
const TaxistaController = require('../controllers/taxistaController')

// redirecciones
router.get('/crear', TaxistaController.create);
router.get('/edit/:id', TaxistaController.edit);
// metodos
router.get('/', TaxistaController.showAll);
router.post('/', TaxistaController.store);
router.post('/editar/:id', TaxistaController.update);
router.get('/eliminar/:id', TaxistaController.delete);

module.exports = router