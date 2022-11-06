const {
  Model, DataTypes
} = require('sequelize')

//verificamos la conexion a la base
const connection = require('../conexion.js')

class Queja extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
  }
}

Queja.init({
  id_queja: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cliente',
      key: 'id_cliente'
    }
  },
  id_viaje: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'viaje',
      key: 'id_viaje'
    }
  },
  id_taxista: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'taxista',
      key: 'id_taxista'
    }
  },
  nombre_queja: {
    type: DataTypes.CHAR(150),
    allowNull: false
  },
  descripcion_queja: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  id_sede: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'sede_cooperativa',
      key: 'id_sede'
    }
  }
}, {
  sequelize: connection.connect(),
  tableName: 'queja',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "pk_queja",
      unique: true,
      fields: [
        { name: "id_queja" },
      ]
    },
  ]
});

module.exports = Queja;
