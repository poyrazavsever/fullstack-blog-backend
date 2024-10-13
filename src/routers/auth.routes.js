const router = require('express').Router();
const {login, register} = require('../controller/auth.controller')
const authValidatin = require('../middlewares/validations/auth.validation')

router.post('/login', login)

router.post('/register', authValidatin.register, register)

module.exports = router