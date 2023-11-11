const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.userTable = require("./User")(sequelize, Sequelize);
db.postTable = require("./Post")(sequelize, Sequelize);
module.exports = db;