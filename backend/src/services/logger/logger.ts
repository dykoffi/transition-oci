import { FluentClient } from "@fluent-org/logger";
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();
const logger = new FluentClient("gpsihm", {
  socket: {
    host: config.get<string>('FLUENTD_HOST'),
    port: config.get<number>('FLUENTD_PORT') || 30002,
    timeout: config.get<number>('FLUENTD_TIMEOUT') || 3000, // 3 seconds
  }
});



export default logger;