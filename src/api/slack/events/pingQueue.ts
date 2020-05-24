import AWS from 'aws-sdk';
import * as Sentry from '@sentry/node';
const sqs = new AWS.SQS();
const url = process.env.RING_QUEUE_URL;
const pingQueue = async () => {
  try {
    const result = await sqs
      .sendMessage({
        MessageBody: `${new Date().getTime()}`,
        QueueUrl: url,
      })
      .promise();
    console.log('result', result);
  } catch (err) {
    Sentry.captureException(err);
    console.error('failed to send to queue', err);
  }
};

export default pingQueue;
