export type LogLevel = "info" | "error" | "warn" | "debug" | "critical";
export type LogData = Record<string, any>;

export interface LoggerProps {
  path?: string;
  name?: string;
}

export interface WriteToFileProps {
  pathToLogs?: string;
  data: LogData;
  level: LogLevel;
  name?: string;
}

export interface Logger {
  info: (data: LogData) => Promise<void>;
  error: (data: LogData) => Promise<void>;
  warn: (data: LogData) => Promise<void>;
  debug: (data: LogData) => Promise<void>;
  critical: (data: LogData) => Promise<void>;
}
