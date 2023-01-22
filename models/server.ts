import express, { Application } from "express";
import userRoutes from "../routes/users";
import cors from "cors";
import db from "../db/connection";

export default class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB online");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  middlewares() {
    //cors
    this.app.use(cors());
    //parse body
    this.app.use(express.json());
    //public folder
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server online on port ${this.port}`)
    );
  }
}
