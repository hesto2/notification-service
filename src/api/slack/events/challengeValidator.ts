import { Request, Response } from 'express';
const challengeValidator = (req: Request, res: Response) => {
  return res.status(200).json({ challenge: req.body.challenge });
};
export default challengeValidator;
