const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class Taxista extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

Taxista.init({
  id_taxista: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_sede: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'sede_cooperativa',
      key: 'id_sede'
    }
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
  },
}, {
  sequelize: connection.connect(),
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

module.exports = Taxista;
