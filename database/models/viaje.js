const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class Viaje extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

Viaje.init({
  id_viaje: {
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
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cliente',
      key: 'id_cliente'
    }
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios',
      key: 'id_usuario'
    }
  },
  tiempo_servicio: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  costo_servicio: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  estado_viaje: {
    type: DataTypes.CHAR(10),
    allowNull: true
  },
  destino_viaje: {
    type: DataTypes.CHAR(256),
    allowNull: true
  },
}, {
  sequelize: connection.connect(),
  tableName: 'viaje',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "pk_viaje",
      unique: true,
      fields: [
        { name: "id_viaje" },
      ]
    },
  ]
});

module.exports = Viaje
