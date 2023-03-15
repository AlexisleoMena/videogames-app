require("dotenv").config(); //Acceso a variables de entorno (designadas en .env)

module.exports = {
  dbUser: process.env.DB_USER || 'postgres',
  dbName: process.env.DB_NAME || 'videogames',
  dbPort: process.env.DB_PORT || 5432,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPassword: process.env.DB_PASSWORD || 1234,
  Host: process.env.HOST || 'localhost',
  Port: process.env.PORT || 3001,
  apiKey: process.env.API_KEY
}