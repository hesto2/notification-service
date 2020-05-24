import { SlackInteractionPayload } from './../../../types';
import { Request, Response } from 'express';
import postToTopic from '../../../interactions/postToTopic';
import * as Sentry from '@sentry/node';
const handleInteraction = async (req: Request, res: Response) => {
  const { payload } = req.body;
  try {
    const parsedBody: SlackInteractionPayload = JSON.parse(payload);
    const p = parsedBody.actions.map((a) => {
      const [receiverId, actionId] = a.action_id.split(':');
      return postToTopic({ receiverId, actionId, actionValue: a.value });
    });
    const result = await Promise.all(p);
    return res.status(200).send();
  } catch (err) {
    Sentry.captureException(err);
    console.error(err);
    return res.status(200).json(err);
  }
};

export default handleInteraction;
