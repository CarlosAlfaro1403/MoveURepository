const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehiculo', {
    id_vehiculo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_taxista: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'taxista',
        key: 'id_taxista'
      }
    },
    matricula: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    anho: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'vehiculo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_vehiculo",
        unique: true,
        fields: [
          { name: "id_vehiculo" },
        ]
      },
    ]
  });
};
