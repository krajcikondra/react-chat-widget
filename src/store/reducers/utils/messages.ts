import {CustomCompMessage, Link, Message, Message as MessageI} from "@types";

type MessagesState = (Message | Link | CustomCompMessage);

const compareMessages = (msg1: MessagesState, msg2: MessagesState) => {
    if (msg1.timestamp > msg2.timestamp) return 1;
    if (msg1.timestamp < msg2.timestamp) return -1;
    return 0;
};

export const pushMessage = (messages: MessagesState[], message: MessageI): MessagesState[] => {
    messages.push(message);
    messages.sort(compareMessages);
    return [...messages];
};
