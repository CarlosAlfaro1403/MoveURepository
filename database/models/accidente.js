const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accidente', {
    id_accidente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehiculo',
        key: 'id_vehiculo'
      }
    },
    costo_accidente: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    descripcion_accidente: {
      type: DataTypes.CHAR(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'accidente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_accidente",
        unique: true,
        fields: [
          { name: "id_accidente" },
        ]
      },
    ]
  });
};
