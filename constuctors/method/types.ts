import type { AnySchema } from "yup";
import type { ClientInfo, SessionManager } from "../types";
import type { Cookies } from "../types";
import type { ErrorCodes } from "./error-codes";
import type { Logger } from "../../utils/logger";

export type Body = Record<string, any>;

export interface MethodSuccessResponseData {
  result: object;
}

export interface MethodErrorResponseData {
  error: {
    code: ErrorCodes;
    message: string;
  };
}

export type MethodResponseData =
  | MethodSuccessResponseData
  | MethodErrorResponseData;

export interface MethodContext<T extends Body, C extends Cookies> {
  body: T;
  cookies: C;
  client: ClientInfo;
  session: SessionManager;
  name: string;
  logger: Logger;
}

type Validation = AnySchema;

export interface Method<T extends Body = {}, C extends Cookies = {}> {
  name: string;
  method: (context: MethodContext<T, C>) => MethodResponseData;
  validation?: Validation;
}
