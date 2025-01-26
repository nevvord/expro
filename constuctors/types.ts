export interface CookieParams {
  name: string;
  value: string;
  options: {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
  };
}

export type Cookies = Record<string, CookieParams>;

export interface ClientInfo {
  ip: string;
  port: number;
  protocol: string;
}

export interface Session {
  id: string;
  data: Record<string, any>;
}

type update = (session: Session) => void;
type get = () => Session;
type remove = () => void;

export interface SessionManager {
  update: update;
  get: get;
  remove: remove;
}
