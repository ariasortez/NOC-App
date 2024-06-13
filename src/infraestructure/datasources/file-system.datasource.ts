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

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) {
      return;
    }

    if (newLog.level === LogSeverityLevel.medim) {
      fs.appendFileSync(this.mediumPath, logAsJson);
    } else {
      fs.appendFileSync(this.highPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    const stringLogs = content
      .split('\n')
      .map((log) => LogEntity.fromJson(log));

    return stringLogs;
  };

  async getLogs(severityLeveL: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLeveL) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medim:
        return this.getLogsFromFile(this.mediumPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highPath);
      default:
        throw new Error(`${severityLeveL} not implemented`);
    }
  }
}
