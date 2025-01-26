// import type { User } from "@prisma/client";
// import { type Request, type Response } from "express";
// import type { AnySchema, InferType } from "yup";

import type { AnySchema } from "yup";
import type { Cookies } from "../types";
import { ErrorCodes } from "./error-codes";
import type { Body, Method, MethodContext, MethodResponseData } from "./types";

// // Типы для методов
// type MethodHandler<T> = (
//   payload: IMethodPayload<T>
// ) => Promise<IMethodResponseData | void>;
// type ValidatedHandler<T extends AnySchema> = MethodHandler<InferType<T>>;
// type InvalidatedHandler = MethodHandler<unknown>;

// // Основная функция
// export function MethodConstructor<T extends AnySchema>(
//   schemaOrCallback: T | InvalidatedHandler,
//   callback?: ValidatedHandler<T>
// ): (req: Request, res: Response) => Promise<Response | void> {
//   return async (req: Request, res: Response) => {
//     try {
//       const payload = await createPayload(req);
//       const handler = determineHandler(schemaOrCallback, callback);
//       const result = await handler(payload);

//       return sendResponse(res, result);
//     } catch (error: any) {
//       return handleError(res, error);
//     }
//   };
// }

// // Вспомогательные функции
// async function createPayload(req: Request): Promise<IMethodPayload<any>> {
//   return {
//     body: req.body,
//     clientInfo: extractClientInfo(req),
//     user: req.user,
//     session: req.session,
//     auth: createAuthMethods(req),
//   };
// }

// function extractClientInfo(req: Request): IClientInfo {
//   const clientIp = req.ip === "::1" ? "127.0.0.1" : req.ip;

//   return {
//     userAgent: req.headers["user-agent"],
//     device: JSON.stringify(req.headers["sec-ch-ua-platform"]),
//     ip: clientIp,
//   };
// }

// function createAuthMethods(req: Request): IAuthMethods {
//   return {
//     signOut: () =>
//       new Promise<boolean>((resolve) => {
//         req.logOut((err) => resolve(!err));
//       }),
//   };
// }

// function determineHandler<T extends AnySchema>(
//   schemaOrCallback: T | InvalidatedHandler,
//   callback?: ValidatedHandler<T>
// ): MethodHandler<any> {
//   if ("validate" in schemaOrCallback) {
//     return async (payload) => {
//       const validatedBody = await schemaOrCallback.validate(payload.body, {
//         stripUnknown: true,
//       });
//       return callback!({ ...payload, body: validatedBody });
//     };
//   }
//   return schemaOrCallback;
// }

// function sendResponse(
//   res: Response,
//   result: IMethodResponseData | void
// ): Response {
//   if (!result) return res.json({ result: {} });
//   return res.json(result);
// }

// function handleError(res: Response, error: Error): Response {
//   return res.status(400).json({
//     error: {
//       code: "VALIDATION_ERROR",
//       message: error.message,
//     },
//   });
// }

// // Интерфейсы остаются без изменений
// export interface IClientInfo {
//   userAgent?: string;
//   device?: string;
//   ip?: string;
// }

// interface IAuthMethods {
//   signOut: () => Promise<boolean>;
// }

// export interface IMethodPayload<Body> {
//   body: Body;
//   clientInfo: IClientInfo;
//   user?: User;
//   session?: Request["session"];
//   auth: IAuthMethods;
// }

export function CreateMethod<T extends Body = {}, C extends Cookies = {}>(
  name: string,
  method: (context: MethodContext<T, C>) => MethodResponseData,
  validation?: AnySchema
): Method<T, C> {
  return {
    name,
    method,
    validation,
  };
}
