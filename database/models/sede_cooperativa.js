const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sede_cooperativa', {
    id_sede: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cooperativa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cooperativa',
        key: 'id_cooperativa'
      }
    },
    nombre_sede: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    direccion_sede: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sede_cooperativa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_sede_cooperativa",
        unique: true,
        fields: [
          { name: "id_sede" },
        ]
      },
    ]
  });
};
