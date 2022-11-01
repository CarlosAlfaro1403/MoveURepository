const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class Accidente extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

Accidente.init({
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
      model: 'Vehiculo',
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
  sequelize: connection.connect(),
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
})

module.exports = Accidente
