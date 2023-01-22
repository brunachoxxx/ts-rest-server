import { DataType, DataTypes } from "sequelize";
import db from "../db/connection";

const user = db.define("user", {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  state: { type: DataTypes.BOOLEAN },
});

export default user;
