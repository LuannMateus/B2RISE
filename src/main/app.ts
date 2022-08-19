import express, { Application } from 'express';

import ProductRouter from './routes/productRoutes';

export default class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.init();
  }

  private init(): void {
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/api/v1', ProductRouter);
  }

  public get getApp(): Application {
    return this.app;
  }
}
