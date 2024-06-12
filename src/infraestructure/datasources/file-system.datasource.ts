import fs from 'fs';
import { LogDataSource } from '../../domain/dataources/log.datasource';

import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-low.log';
  private readonly mediumPath = 'logs/logs-medium.log';
  private readonly highPath = 'logs/logs-high.log';

  constructor() {}

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumPath, this.highPath].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
      }
    });
  };

  saveLog(log: LogEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getLogs(severityLeveL: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.');
  }
}
