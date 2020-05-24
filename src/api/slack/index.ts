import { Router } from 'express';
import validator from './validator';
const router = Router();
import * as slackClient from './slackClient';
import * as Sentry from '@sentry/node';
import events from './events';
import interactions from './interaction';
import verifySignedSecret from './events/verifySignedSecret';

router.post('/', validator, async (req, res) => {
  try {
    const result = await slackClient.sendMessage({
      ...req.body,
      text: req.body.message,
    });
    return res.status(200).json(result);
  } catch (err) {
    Sentry.captureException(err);
    return res.status(400).json(err);
  }
});

router.post('/events', verifySignedSecret, events);
router.post('/interactions', interactions);

export default router;
