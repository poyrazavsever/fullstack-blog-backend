const router = require('express').Router();

const auth = require('./auth.routes');
const post = require('./post.routes')
const categories = require('./category.routes')

router.use(auth)
router.use(post)
router.use(categories)

module.exports = router