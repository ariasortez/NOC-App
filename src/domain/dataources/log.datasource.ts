import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLeveL: LogSeverityLevel): Promise<LogEntity[]>;
}
