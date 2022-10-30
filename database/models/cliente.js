const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_cliente: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    apellido_cliente: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    dui_cliente: {
      type: DataTypes.CHAR(9),
      allowNull: false
    },
    telefono_cliente: {
      type: DataTypes.CHAR(9),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cliente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_cliente",
        unique: true,
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
};
