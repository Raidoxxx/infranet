const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    req.version = 'v1';
    next();
});

// Rotas de saúde
router.use('/health', require('./v1/health').healthRouter);

// Rota raiz
router.use('/users', require('./v1/users'));

 
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: [
            'API is running', 'Available routes: GET /api/health'
        ]
    });
});

module.exports = router;