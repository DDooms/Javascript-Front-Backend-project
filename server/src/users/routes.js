const {Router} = require('express')
const controller =  require('./controller')

const router = Router()

router.get('/', controller.getUsers)
router.get('/:username', controller.getUserByUsername)
router.post('/', controller.addUser)
// router.put('/:id', controller.updateUser)
router.delete('/:username', controller.deleteUser)
router.post('/login', controller.loginUser)
router.post('/register', controller.registerUser)

module.exports = router