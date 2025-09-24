const express = require('express');
const router = express.Router();

const healthRouter = require('./v1/health')
const usersRouter = require('./v1/users')

// Middleware para definir a versão da API
router.use((req, res, next) => {
    req.version = 'v1';
    next();
});


// Rotas de saúde 
router.use('/health', healthRouter.healthRouter);

// Rota usuer
router.use('/users', usersRouter);

// Rota anuncios

 
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: [
            'API is running', 'Available routes: GET /api/health'
        ]
    });
});

module.exports = router;