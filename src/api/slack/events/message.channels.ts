import { Request, Response } from 'express';
import pingQueue from './pingQueue';
const targetChannel = process.env.SLACK_LISTEN_CHANNEL_ID;
const botName = process.env.SLACK_BOT_NAME;
const handleMessageChannels = async (req: Request, res: Response) => {
  if (
    req.body.event.channel === targetChannel &&
    req.body.event?.bot_profile?.name !== botName
  ) {
    console.log('queue currently disabled');
    // const result = await pingQueue();
    return res.status(200).send();
  }
};
export default handleMessageChannels;
