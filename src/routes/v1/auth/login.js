const router = require('express')();
const authController = require('../../controllers/authController');

router.post('/login', authController.user_authenticate);

module.exports = router;