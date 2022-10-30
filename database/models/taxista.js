const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('taxista', {
    id_taxista: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_taxista: {
      type: DataTypes.CHAR(256),
      allowNull: false
    },
    apellido_taxista: {
      type: DataTypes.CHAR(256),
      allowNull: false
    },
    dui_taxista: {
      type: DataTypes.CHAR(9),
      allowNull: false
    },
    num_circulacion: {
      type: DataTypes.CHAR(18),
      allowNull: false
    },
    edad_taxista: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    telefono_taxista: {
      type: DataTypes.CHAR(9),
      allowNull: true
    },
    posee_auto: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'taxista',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_taxista",
        unique: true,
        fields: [
          { name: "id_taxista" },
        ]
      },
    ]
  });
};
