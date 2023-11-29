import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import apiRouter from "./routes/api";
import ClientError from "./utils/ClientError";

const { PORT = 8000 } = process.env;
const PUBLIC_DIR = path.join(__dirname, "public");

class Server {
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:5173",
      })
    );

    this.app.use("/api", apiRouter);

    // Handle not found errors
    this.app.use(this.notFoundHandler);

    // Handle other errors
    this.app.use(this.errorHandler);
  }

  private notFoundHandler(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({
      message: "Not found",
    });
  }

  private errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err.stack);

    if (err instanceof ClientError) {
      const error = err as ClientError;
      return res.status(error?.code).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }

  public run() {
    this.app.listen(PORT, () => {
      console.log("Server running on http://localhost:%s", PORT);
    });
  }
}

new Server().run();
