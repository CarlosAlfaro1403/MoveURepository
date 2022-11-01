const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class Cooperativa extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

Cooperativa.init({
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
  },
}, {
  sequelize: connection.connect(),
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


module.exports = Cooperativa
