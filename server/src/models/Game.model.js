const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Game', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    released: {
      type: DataTypes.STRING,
      set(value) {
        if(!value.length) {
          return this.setDataValue('released', 'Not released');
        }
        this.setDataValue('released', value);
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      set(value) {
        if(typeof value.rating === "string" && !value.length) {
          return this.setDataValue('rating', 1.00);
        }
        this.setDataValue('rating', parseFloat(value));
      },
      validate: {
        isFloat: true,
        max: 5,
        min: 0
      },
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      // defaultValue: [],
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      set(value) {
        if(!value.length) {
          return this.setDataValue('image', 'https://i.ibb.co/mGWK9DK/No-image-available.jpg')
        }
        this.setDataValue('image', value)
      },
      validate: {
        isUrl: true,
      },
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },{
    tableName: "games",
    timestamps: false,
    createdAt: false
  });
};
