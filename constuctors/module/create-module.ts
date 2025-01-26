// export type TMethod = (req: Request, res: Response) => void;

import { CreateMethod } from "../method/create-method";
import type { Cookies } from "../types";
import type { Module, ModuleCallback } from "./types";

// export type TMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => void;

// export interface IMethodOptions {
//   middlewares?: TMiddleware[];
//   method: TMethod;
// }

// export type TMethodsItem = IMethodOptions | TMethod;

// export interface IMethods {
//   [key: string]: TMethodsItem;
// }

// export interface IModuleConstructorConfig {
//   methods: IMethods;
//   defaults?: {
//     middlewares?: TMiddleware[];
//   };
// }

// export function CreateModule(
//   name: string,
//   moduleConstructorCallback: () => IModuleConstructorConfig
// ) {
//   return () => {
//     const module = moduleConstructorCallback();

//     const router = Router();

//     for (const method in module.methods) {
//       const item = module.methods[method];
//       const isOptions = typeof item === "object" && "method" in item;
//       const middlewares = isOptions
//         ? item.middlewares || module.defaults?.middlewares || []
//         : [];
//       const currentMethod = isOptions ? item.method : item;

//       router.post(`/${name}.${method}`, ...middlewares, currentMethod);
//     }

//     return router;
//   };
// }

export function CreateModule<T extends Body, C extends Cookies>(
  name: string,
  callback: ModuleCallback<T, C>
): Module<T, C> {
  return {
    name,
    callback,
  };
}

const method = CreateMethod("test", () => {
  return {
    result: {
      data: "test",
    },
  };
});

export const module = CreateModule("test", () => ({
  methods: [method],
}));
