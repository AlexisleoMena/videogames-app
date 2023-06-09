const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { dbUser, dbPassword, dbHost, dbName, dbPort } = require('./utils/config');

// Defino los parametros de conexión con la base de datos mediante una instancia de Sequelize
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: dbName,
        dialect: "postgres",
        host: dbHost,
        port: dbPort,
        username: dbUser,
        password: dbPassword,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
        { logging: false, native: false }
      )
;

// Pruebo si la conexión está bien.
( async () => {
  try {
    await sequelize.authenticate();
    console.log("The connection to the database has been established successfully."); 
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
})();

// Requiero e introduzco cada funcion de modelo en el array "modelDefiners".
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter( (file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') )
  .forEach( (file) => { modelDefiners.push(require(path.join(__dirname, '/models', file))) } )
;

// Defino cada modelo pasandole el parametro "sequelize" a cada funcion de modelo.
modelDefiners.forEach(model => model(sequelize));

// Renombro cada modelo en formato PascalCase.
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Extraigo cada modelo.
const { Game, Genre } = sequelize.models;

// Seteo relaciones entre modelos.
Game.belongsToMany(Genre, { through: "game_genre", as: "genres" });
Genre.belongsToMany(Game, { through: "game_genre", as: "games" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,    
};
