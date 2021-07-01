const router = require('express').Router();
const userController = require('../controllers/userController')

router.post('/createUser', userController.createUser)

router.get('/getAllUser', userController.getAll)
router.delete('/deleteUser/:id', userController.deleteUser)
router.patch('/updateUser/:id', userController.updateUser)

module.exports = router 