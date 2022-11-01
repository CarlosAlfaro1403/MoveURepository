const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class SedeCooperativa extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

SedeCooperativa.init({
  id_sede: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_cooperativa: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cooperativa',
      key: 'id_cooperativa'
    }
  },
  nombre_sede: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  direccion_sede: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
}, {
  sequelize: connection.connect(),
  tableName: 'sede_cooperativa',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "pk_sede_cooperativa",
      unique: true,
      fields: [
        { name: "id_sede" },
      ]
    },
  ]
});

module.exports = SedeCooperativa;
