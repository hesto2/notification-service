import AWS from 'aws-sdk';
import * as Sentry from '@sentry/node';
const sns = new AWS.SNS();
const topicArn = process.env.INTERACTION_TOPIC_ARN;

interface TopicPayload {
  receiverId: string;
  actionId: string;
  actionValue: string;
}
const postToTopic = async ({
  receiverId,
  actionId,
  actionValue,
}: TopicPayload) => {
  try {
    const result = await sns
      .publish({
        MessageAttributes: {
          receiver: {
            DataType: 'String',
            StringValue: receiverId,
          },
          action: {
            DataType: 'String',
            StringValue: actionId,
          },
          value: {
            DataType: 'String',
            StringValue: actionValue,
          },
        },
        Message: actionValue,
        TopicArn: topicArn,
      })
      .promise();
    console.log(result);
  } catch (err) {
    Sentry.captureException(err);
    console.error('failed to send to topic', err);
  }
};

export default postToTopic;
