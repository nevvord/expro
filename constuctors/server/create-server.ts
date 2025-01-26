import { useLogger } from "../../utils/logger";
import type { Module, Plugin } from "../module/types";
import type { Cookies } from "../types";

type useModule = (module: any) => void;
type usePlugin = (plugin: any) => void;

interface CreateServerCallbackPayload {
  useModule: useModule;
  usePlugin: usePlugin;
}

interface CreateServerCallbackReturn {
  port: number;
}

type CreateServerCallback = (
  payload: CreateServerCallbackPayload
) => CreateServerCallbackReturn;

export function CreateServer(
  name: string,
  callback: CreateServerCallback = () => ({ port: 3000 })
) {
  const modules: Module<any, Cookies>[] = [];
  const plugins: Plugin[] = [];

  const logger = useLogger({ name });

  const useModule: useModule = (module) => {
    modules.push(module);
  };

  const usePlugin: usePlugin = (plugin) => {
    plugins.push(plugin);
  };

  const response = callback({ useModule, usePlugin });

  const server = Bun.serve({
    port: response.port,
    async fetch(req) {
      if (req.method !== "POST") {
        return new Response("Only POST requests are allowed", { status: 405 });
      }

      const url = new URL(req.url);
      const pathname = url.pathname;

      const pathParts = pathname.slice(1).split(".");
      if (pathParts.length !== 2) {
        return new Response(
          "Invalid route format. Expected: /moduleName.method",
          { status: 400 }
        );
      }

      const [moduleName, methodName] = pathParts;
      const module = modules.find((module) => module.name === moduleName);

      if (!module) {
        return new Response("Module not found", { status: 404 });
      }

      const moduleResult = module.callback();

      if (!moduleResult) {
        return new Response("Module not found", { status: 404 });
      }

      const method = moduleResult.methods.find((config) => {
        if ("name" in config && config.name === methodName) {
          return config;
        } else if ("validate" in config.method && config.method.name === methodName) {
          return config.method;
        }

        return false;
      });

      if (!method) {
        return new Response("Method not found", { status: 404 });
      }

      return new Response(JSON.stringify(method.));
    },
  });

  logger.info({ message: `Server ${name} created`, port: response.port });

  return {
    server,
    port: response.port,
  };
}
