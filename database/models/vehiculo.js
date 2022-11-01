const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class Vehiculo extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

Vehiculo.init({
  id_vehiculo: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_taxista: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'taxista',
      key: 'id_taxista'
    }
  },
  matricula: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  anho: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize: connection.connect(),
  tableName: 'vehiculo',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "pk_vehiculo",
      unique: true,
      fields: [
        { name: "id_vehiculo" },
      ]
    },
  ]
});

module.exports = Vehiculo
