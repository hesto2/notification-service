import { Request, Response, NextFunction } from 'express';
const validator = (req: Request, res: Response, next: NextFunction) => {
  const errorBody: { errors: string[] } = { errors: [] };
  if (!req.body.channel) {
    errorBody.errors.push('channel is required');
  }
  if (!req.body.message) {
    errorBody.errors.push('message is required');
  }

  if (errorBody.errors.length > 0) {
    return res.status(400).json(errorBody);
  }
  next();
};
export default validator;
