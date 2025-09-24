const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "success": true,
    "data": {
      "status": "ok",
      "uptime": process.uptime(),
      "timestamp": Date.now()
    },
    "message": "Operação realizada com sucesso"
  });
});

module.exports = { healthRouter: router };
