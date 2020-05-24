# Message format:

```
{
  "channel": "slack-channel",
  "message": "some text here",
  "image": "https://image_url.png",
  "actions": {
    "senderId": "owlet-worker",
    "actionId": "snooze",
    "actions": [{"value": "1-hour", "displayValue": "1 Hour"}]
  }
}
```

# Configuration

## Slack App

Your slack appneeds the following scopes for the app: `files:write` `chat:write`
`channels:join` `channels:read` `groups:read` `im:read` `mpim:read`

You also need to enable events for the app and post the url this is hosted at as
the target url.

Once you have created the app, be sure to @mention the app in the channel you
want it to listen in on so it will receieve events for that.

To enable interactions in your messages you will need to enable interactions and
then specify the url in the slack app configuration

## Environment variables

`SLACK_API_TOKEN`: The endpoint that the slack integration should send messages
to

`SLACK_SIGNING_SECRET`: The secret used to verify slack webhook requests

`SLACK_LISTEN_CHANNEL_ID`: the channel id that the webhook should listen to

`SLACK_BOT_NAME`: the name of the bot so we make sure that we don't let messages
this bot sends trigger the webhook causing an infinite loop of slack messages
being sent

`RING_QUEUE_URL`: the queue url that slack webhook events should be sent to

## /v1/api...

### Slack

POST: `/api/slack`: channel, message, image (optional)

Webhooks: `/api/slack/events`: receives a payload anytime a subscribed channel
is used

Interactions: `/api/slack/interactions`: receives callback data from sent
actions to slack

### Sentry

POST: `/api/sentry` for use with sentry internal webhook integration.
