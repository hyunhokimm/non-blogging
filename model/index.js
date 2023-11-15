const Sequelize = require("sequelize");
const config = require("../config/index.json");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.notebook = require("./Notebook")(sequelize, Sequelize);

db.user.hasMany(db.notebook, {
  foreignKey: "email",
  sourceKey: "email",
});

db.notebook.belongsTo(db.user, {
  foreignKey: "email",
  targetKey: "email",
});

module.exports = db;
