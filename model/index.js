const Sequelize = require("sequelize");
const config = require("../config/index.json")["development"];
console.log(process.env.DB_PASSWORD);
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  // config.password,
  // config
  process.env.DB_PASSWORD,
  config
  // { ...config, password: process.env.DB_PASSWORD }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.comment = require("./Comment")(sequelize, Sequelize);
db.notebook = require("./Notebook")(sequelize, Sequelize);
db.user = require("./User")(sequelize, Sequelize);

db.user.hasMany(db.notebook, { foreignKey: "email" });
db.notebook.belongsTo(db.user, { foreignKey: "email" });

db.notebook.hasMany(db.comment, { foreignKey: "noteId" });
db.comment.belongsTo(db.notebook, { foreignKey: "noteId" });

db.user.hasMany(db.comment, { foreignKey: "email" });
db.comment.belongsTo(db.user, { foreignKey: "email" });

module.exports = db;
