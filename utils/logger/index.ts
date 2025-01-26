import type { LoggerProps, LogData, Logger } from "./types";
import { writeToFile } from "./writeToFile";

export function useLogger({ path, name }: LoggerProps = {}): Logger {
  return {
    info: (data: LogData) =>
      writeToFile({ pathToLogs: path, data, level: "info", name }),
    error: (data: LogData) =>
      writeToFile({ pathToLogs: path, data, level: "error", name }),
    warn: (data: LogData) =>
      writeToFile({ pathToLogs: path, data, level: "warn", name }),
    debug: (data: LogData) =>
      writeToFile({ pathToLogs: path, data, level: "debug", name }),
    critical: (data: LogData) =>
      writeToFile({ pathToLogs: path, data, level: "critical", name }),
  };
}

export * from "./types";
