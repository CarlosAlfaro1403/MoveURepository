const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_usuario', {
    id_tipo_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_tipo_usuario: {
      type: DataTypes.CHAR(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipo_usuario",
        unique: true,
        fields: [
          { name: "id_tipo_usuario" },
        ]
      },
    ]
  });
};
