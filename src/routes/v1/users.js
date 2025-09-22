const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'User list retrieved successfully',
        data: []  // Teste
    });
});

module.exports = router;