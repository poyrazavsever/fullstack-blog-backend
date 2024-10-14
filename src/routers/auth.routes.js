const router = require('express').Router();
const {login, register, me} = require('../controller/auth.controller');
const { tokenCheck } = require('../middlewares/auth');
const authValidatin = require('../middlewares/validations/auth.validation')

router.post('/login', authValidatin.login, login)

router.post('/register', authValidatin.register, register)

router.get('/me', tokenCheck,  me)

module.exports = router