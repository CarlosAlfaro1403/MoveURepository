const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('queja', {
    id_queja: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'id_cliente'
      }
    },
    id_viaje: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'viaje',
        key: 'id_viaje'
      }
    },
    id_taxista: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'taxista',
        key: 'id_taxista'
      }
    },
    nombre_queja: {
      type: DataTypes.CHAR(150),
      allowNull: false
    },
    descripcion_queja: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'queja',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_queja",
        unique: true,
        fields: [
          { name: "id_queja" },
        ]
      },
    ]
  });
};
