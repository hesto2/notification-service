enum ActionSender {
  OWLET_WORKER = 'owlet-worker',
}

interface MessageAction {
  value: string;
  displayValue: string;
}

export interface MessageActionsPayload {
  actions: MessageAction[];
  senderId: ActionSender;
  actionId: string;
}

export interface SendMessagePayload {
  channel: string;
  text: string;
  image?: string;
  actions?: MessageActionsPayload;
}

export interface SlackInteractionPayload {
  actions: {
    action_id: string; // Is senderId:actionId
    value: string;
  }[];
}
