const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes');
const Database = require('./database/Database');

// Testa a conexão com o banco de dados ao iniciar o servidor
const database = new Database();
database.testConnection()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Rotas da API
app.use('/api/v1', routes);


// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
   
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message
    });
  }
   
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
}); 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);



  // Log das rotas disponíveis
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`Route: ${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(`Route: ${Object.keys(handler.route.methods)} ${handler.route.path}`);
        }
      });
    }
  });
});

module.exports = app;