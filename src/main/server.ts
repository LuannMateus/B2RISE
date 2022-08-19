import { logger } from '../util/pino';
import App from './app';

const app = new App().getApp;

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on PORT ${process.env.PORT || 3000} `);
});
