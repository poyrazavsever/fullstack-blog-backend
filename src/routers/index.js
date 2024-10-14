const router = require('express').Router();

const auth = require('./auth.routes');
const post = require('./post.routes')

router.use(auth)
router.use(post)

module.exports = router