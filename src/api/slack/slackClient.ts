import {
  ChatPostMessageArguments,
  ImageBlock,
  WebClient,
  ActionsBlock,
} from '@slack/web-api';
import { MessageActionsPayload, SendMessagePayload } from './../../types';
const token = process.env.SLACK_API_TOKEN;
const web = new WebClient(token);

const getChannels = async (channel: string) => {
  const result = await web.conversations.list();
  if (!result.ok) {
    throw result.error;
  }
  return result.channels;
};

const getChannelIdByName = async (channel: string): Promise<string | null> => {
  const channels = (await getChannels(channel)) as any;
  const foundChannel = channels.find((c: any) => c.name === channel);
  return foundChannel ? foundChannel.id : null;
};

const joinChannel = async (channelName: string) => {
  const channelId = await getChannelIdByName(channelName);
  console.log(channelId);
  if (!channelId) {
    throw `Unable to find channel with name ${channelName}`;
  }
  const result = await web.conversations.join({ channel: channelId });
  if (!result.ok) {
    throw result.error;
  }
  return result.channel;
};

const convertImageToBlock = (image_url: string, alt_text: string) => ({
  type: 'image' as 'image',
  image_url,
  alt_text,
});

const convertTextToBlock = (text: string) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text,
  },
});

const convertActionToBlock = (
  actionsPayload: MessageActionsPayload
): ActionsBlock => {
  const action_id = `${actionsPayload.senderId}:${actionsPayload.actionId}`;
  const elements = actionsPayload.actions.map((a, i) => ({
    type: 'button',
    text: { type: 'plain_text', text: a.displayValue },
    action_id: `${action_id}:${i}`,
    value: a.value,
  }));

  const action: ActionsBlock = { type: 'actions', elements };
  return action;
};

const formatBlocks = ({
  image,
  actions,
  text,
}: {
  image?: string;
  actions?: MessageActionsPayload;
  text: string;
}): ChatPostMessageArguments['blocks'] => {
  const blocks: ChatPostMessageArguments['blocks'] = [];
  if (image) {
    const blockImage: ImageBlock = convertImageToBlock(image, text);
    blocks.push(blockImage);
  }
  if (actions) {
    const blockActions: ActionsBlock = convertActionToBlock(actions);
    blocks.push(convertTextToBlock(text));
    blocks.push(blockActions);
  }
  return blocks;
};

export const sendMessage = async ({
  image,
  actions,
  text,
  channel,
}: SendMessagePayload) => {
  const joinedChannel: any = await joinChannel(channel);
  const result = await web.chat.postMessage({
    channel: joinedChannel.id as string,
    text: text,
    blocks: formatBlocks({ image, actions, text }),
  });
  return result;
};
