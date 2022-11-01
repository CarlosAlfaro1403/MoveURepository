const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class TipoUsuario extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

TipoUsuario.init({
  id_tipo_usuario: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre_tipo_usuario: {
    type: DataTypes.CHAR(150),
    allowNull: true
  },
}, {
  sequelize: connection.connect(),
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

module.exports = TipoUsuario;
