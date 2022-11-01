const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class Cliente extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

Cliente.init({
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
  },
}, {
  sequelize: connection.connect(),
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


module.exports = Cliente
