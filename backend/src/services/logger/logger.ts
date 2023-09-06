import { FluentClient } from "@fluent-org/logger";
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();
const logger = new FluentClient("gpsihm", {
  socket: {
    host: config.get<string>('FLUENTD_HOST') || "35.193.85.128",
    port: config.get<number>('FLUENTD_PORT') || 30002,
    timeout: config.get<number>('FLUENTD_TIMEOUT') || 3000, // 3 seconds
  }
});



export default logger;