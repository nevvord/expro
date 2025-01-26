import type { WriteToFileProps } from "./types";
import { basePath } from "./constants";
import { formatDate } from "./helpers";

export async function writeToFile({
  pathToLogs = "",
  data,
  level,
  name = "default",
}: WriteToFileProps) {
  const date = await formatDate();
  const path = `${basePath}${
    pathToLogs ? "/" + pathToLogs : ""
  }/${date}/${name}/${level}.log.json`;
  const file = Bun.file(path);

  const logEntry = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  let logs = [];
  if (await file.exists()) {
    logs = JSON.parse(await file.text());
    if (!Array.isArray(logs)) logs = [];
  }

  logs.push(logEntry);
  await Bun.write(file, JSON.stringify(logs, null, 2), { createPath: true });
}
