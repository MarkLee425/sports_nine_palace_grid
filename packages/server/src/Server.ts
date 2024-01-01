import express from "express";
import https from "https";
import http from "http";
import type { Server as HTTPServer } from "http";
import { readFile } from "fs/promises";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";

config();

export class Server {
  protected app: express.Application;
  protected protocol: string;
  protected server: HTTPServer | undefined;
  protected ssl_cert?: string;
  protected ssl_key?: string;
  constructor() {
    this.app = express();
    // For security reasons
    this.app.disable("x-powered-by");
    this.protocol = process.env.SERVER_PROTOCOL || "";
    this.ssl_cert = process.env.SSL_CERT;
    this.ssl_key = process.env.SSL_KEY;
  }

  private setupMiddlewares() {
    this.app.use(compression());
    this.app.use(
      cors({
        origin: [
          process.env.CLIENT_DEV_URL || "http://localhost:3000",
          process.env.CLIENT_PRODUCTION_URL || "",
        ],
        credentials: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  async init() {
    const { app: expressApp, protocol, ssl_cert, ssl_key } = this;
    this.server =
      protocol === "https" && ssl_cert && ssl_key
        ? https.createServer(
            {
              key: await readFile(ssl_key, "utf8"),
              cert: await readFile(ssl_cert, "utf8"),
            },
            expressApp
          )
        : http.createServer(expressApp);

    this.server.on("error", (err: Error) => {
      console.error(err);
      process.exit(1);
    });

    await new Promise<void>((resolve) =>
      this.server!.listen(process.env.SERVER_PORT || 5000, () => {
        console.log("listening on port " + process.env.SERVER_PORT);
        resolve();
      })
    );
  }

  async start() {
    this.setupMiddlewares();
    this.init();
  }

  async onShutdown(): Promise<void> {
    if (!this.server) {
      return;
    }

    console.debug(`Shutting down ${this.protocol} server`);

    this.server.close((error) => {
      if (error) {
        console.error(`Error while shutting down ${this.protocol} server`, {
          error,
        });
      }

      console.debug(`${this.protocol} server shut down`);
    });
  }
}
