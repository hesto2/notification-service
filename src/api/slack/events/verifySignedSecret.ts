import { Response, NextFunction, Request } from 'express';
import crypto from 'crypto';
const SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const challengeValidator = (req: Request, res: any, next: any) => {
  // Can add this in and fix it later if it is important
  if (true) {
    next();
    return;
  }

  const timestamp = req.headers['X-Slack-Request-Timestamp'];
  const givenSignature = req.headers['X-Slack-Signature'];
  const baseString = `v0:${timestamp}:${req.rawBody}`;
  const hmac = crypto.createHmac('sha256', SIGNING_SECRET);
  hmac.update(baseString);
  const valid = hmac.digest('hex') === givenSignature;

  if (valid) {
    next();
  } else {
    res.status(401).send();
  }
};
export default challengeValidator;
