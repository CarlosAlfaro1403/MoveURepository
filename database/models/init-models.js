var DataTypes = require("sequelize").DataTypes;
var _accidente = require("./accidente");
var _cliente = require("./cliente");
var _cooperativa = require("./cooperativa");
var _queja = require("./queja");
var _sede_cooperativa = require("./sede_cooperativa");
var _taxista = require("./taxista");
var _tipo_usuario = require("./tipo_usuario");
var _usuarios = require("./usuarios");
var _vehiculo = require("./vehiculo");
var _viaje = require("./viaje");

function initModels(sequelize) {
  var accidente = _accidente(sequelize, DataTypes);
  var cliente = _cliente(sequelize, DataTypes);
  var cooperativa = _cooperativa(sequelize, DataTypes);
  var queja = _queja(sequelize, DataTypes);
  var sede_cooperativa = _sede_cooperativa(sequelize, DataTypes);
  var taxista = _taxista(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var vehiculo = _vehiculo(sequelize, DataTypes);
  var viaje = _viaje(sequelize, DataTypes);

  queja.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(queja, { as: "quejas", foreignKey: "id_cliente"});
  viaje.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(viaje, { as: "viajes", foreignKey: "id_cliente"});
  sede_cooperativa.belongsTo(cooperativa, { as: "id_cooperativa_cooperativa", foreignKey: "id_cooperativa"});
  cooperativa.hasMany(sede_cooperativa, { as: "sede_cooperativas", foreignKey: "id_cooperativa"});
  usuarios.belongsTo(sede_cooperativa, { as: "id_sede_sede_cooperativa", foreignKey: "id_sede"});
  sede_cooperativa.hasMany(usuarios, { as: "usuarios", foreignKey: "id_sede"});
  queja.belongsTo(taxista, { as: "id_taxista_taxistum", foreignKey: "id_taxista"});
  taxista.hasMany(queja, { as: "quejas", foreignKey: "id_taxista"});
  vehiculo.belongsTo(taxista, { as: "id_taxista_taxistum", foreignKey: "id_taxista"});
  taxista.hasMany(vehiculo, { as: "vehiculos", foreignKey: "id_taxista"});
  viaje.belongsTo(taxista, { as: "id_taxista_taxistum", foreignKey: "id_taxista"});
  taxista.hasMany(viaje, { as: "viajes", foreignKey: "id_taxista"});
  usuarios.belongsTo(tipo_usuario, { as: "id_tipo_usuario_tipo_usuario", foreignKey: "id_tipo_usuario"});
  tipo_usuario.hasMany(usuarios, { as: "usuarios", foreignKey: "id_tipo_usuario"});
  viaje.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(viaje, { as: "viajes", foreignKey: "id_usuario"});
  accidente.belongsTo(vehiculo, { as: "id_vehiculo_vehiculo", foreignKey: "id_vehiculo"});
  vehiculo.hasMany(accidente, { as: "accidentes", foreignKey: "id_vehiculo"});
  queja.belongsTo(viaje, { as: "id_viaje_viaje", foreignKey: "id_viaje"});
  viaje.hasMany(queja, { as: "quejas", foreignKey: "id_viaje"});

  return {
    accidente,
    cliente,
    cooperativa,
    queja,
    sede_cooperativa,
    taxista,
    tipo_usuario,
    usuarios,
    vehiculo,
    viaje,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
