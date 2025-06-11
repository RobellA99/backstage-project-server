import { UserPayload } from "..";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
