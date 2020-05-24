import { Request, Response } from 'express';
import challengeValidator from './challengeValidator';
import messageChannels from './message.channels';
import * as Sentry from '@sentry/node';
const handleEvent = async (req: Request, res: Response) => {
  try {
    if (!req.body.type) {
      throw 'type is required';
    }
    const type =
      req.body.type === 'url_verification'
        ? req.body.type
        : req.body.event.type;
    console.log(req.body);
    console.log('type ', type);
    switch (type) {
      case 'url_verification':
        return challengeValidator(req, res);
        break;
      case 'message':
        return messageChannels(req, res);
        break;
      default:
        return res.status(200).send();
        break;
    }
  } catch (err) {
    console.error(err);
    Sentry.captureException(err);
    return res.status(400).json(err);
  }
};

export default handleEvent;
