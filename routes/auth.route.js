const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignUp);
router.get('/reset', authController.getReset);
router.get('/reset/:token', authController.getNewPassword);

router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogOut);
router.post('/signup', authController.postSignUp);
router.post('/reset-password', authController.postReset);

module.exports = router;
