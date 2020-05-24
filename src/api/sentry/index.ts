import { Router } from 'express';
import * as Sentry from '@sentry/node';
const router = Router();
import * as slackClient from '../slack/slackClient';

router.post('/', async (req, res) => {
  try {
    const result = await slackClient.sendMessage({
      channel: 'sentry',
      text: JSON.stringify(req.body),
    });
    return res.status(200).json(result);
  } catch (err) {
    Sentry.captureException(err);
    return res.status(400).json(err);
  }
});

export default router;
