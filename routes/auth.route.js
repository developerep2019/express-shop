const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignUp);

router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogOut);
router.post('/signup', authController.postSignUp);

module.exports = router;
