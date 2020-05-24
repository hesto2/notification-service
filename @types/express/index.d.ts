export {};
declare global {
  namespace Express {
    export interface Request {
      rawBody: string;
    }
  }
}
