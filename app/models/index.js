"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// setup connection database
let sequelize;
if (process.env.NODE_ENV == "development") {
  console.log(process.env.DATABASE_PRODUCTION_NAME);
  sequelize = new Sequelize(process.env.DATABASE_PRODUCTION_NAME, process.env.PRODUCTION_USER, process.env.PRODUCTION_PASSWORD, config);
} else {
  sequelize = new Sequelize(process.env.DATABASE_DEVELOPMENT_NAME, process.env.DEVELOPMENT_USER, process.env.DEVELOPMENT_PASSWORD, config);
}
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// define class model
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// setup relations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
