import { Sequelize } from "sequelize";

const db = new Sequelize("rest-server-node", "root", "mysql", {
  host: "localHost",
  dialect: "mysql",
});

export default db;
