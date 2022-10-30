const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_usuario',
        key: 'id_tipo_usuario'
      }
    },
    id_sede: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sede_cooperativa',
        key: 'id_sede'
      }
    },
    nombre_usuario: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    apellido_usuario: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    estado_usuario: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_usuario",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
