import type { Cookies } from "../types";
import type { Body, Method } from "../method/types";

export type Plugin = () => void;

export interface MethodConfig<T extends Body = {}, C extends Cookies = {}> {
  method: Method<T, C>;
  plugins?: Plugin[];
}

export interface ModuleConstructorConfig {
  methods: MethodConfig[] | Method[];
  defaults?: {
    plugins?: Plugin[];
  };
}

export interface ModuleCallbackContext {}

export type ModuleCallback<T extends Body, C extends Cookies> = (
  context?: ModuleCallbackContext
) => ModuleConstructorConfig;

export interface Module<T extends Body, C extends Cookies> {
  name: string;
  callback: ModuleCallback<T, C>;
}
