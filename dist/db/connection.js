"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("rest-server-node", "root", "mysql", {
    host: "localHost",
    dialect: "mysql",
});
exports.default = db;
//# sourceMappingURL=connection.js.map