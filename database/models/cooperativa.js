const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cooperativa', {
    id_cooperativa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_cooperativa: {
      type: DataTypes.CHAR(256),
      allowNull: false
    },
    num_identificacion: {
      type: DataTypes.CHAR(15),
      allowNull: false
    },
    correo_cooperativa: {
      type: DataTypes.CHAR(150),
      allowNull: true
    },
    direccion_cooperativa: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    telefono_cooperativa: {
      type: DataTypes.CHAR(9),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cooperativa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_cooperativa",
        unique: true,
        fields: [
          { name: "id_cooperativa" },
        ]
      },
    ]
  });
};
