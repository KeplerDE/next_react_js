// Импортируем модули для работы с JWT
const jwt = require('express-jwt'); 
const jwksRsa = require('jwks-rsa');

// Middleware для проверки JWT токена
exports.checkJwt = jwt({

  // Используем jwksRsa для получения  
  // публичного ключа из Auth0
  secret: jwksRsa.expressJwtSecret({ 
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, 
    jwksUri: 'https://dev-ypotovbkxufo3abq.us.auth0.com/.well-known/jwks.json'
  }),
  
  // Проверяем аудиторию токена
  audience: 'https://dev-ypotovbkxufo3abq.us.auth0.com/api/v2/',  

  // Проверяем эмитента токена
  issuer: 'https://dev-ypotovbkxufo3abq.us.auth0.com/',   

  // Проверяем алгоритм подписи токена
  algorithms: ['RS256']

});