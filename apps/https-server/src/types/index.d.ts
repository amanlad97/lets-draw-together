import { JwtPayload } from "jsonwebtoken";

export {};

declare global {
  namespace Express {
    export interface Request {
      id?: string;
      user?: JwtPayload | string;
      token?: string;
    }
  }
}
