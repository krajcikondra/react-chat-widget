import { MessagesState } from '../types';

import { createReducer } from '../../utils/createReducer';
import { createNewMessage, createLinkSnippet, createComponentMessage } from '../../utils/messages';
import { MESSAGE_SENDER } from '../../constants';
import {
  MessagesActions,
  ADD_NEW_USER_MESSAGE,
  ADD_NEW_RESPONSE_MESSAGE,
  ADD_NEW_LINK_SNIPPET,
  ADD_COMPONENT_MESSAGE,
  DROP_MESSAGES,
  HIDE_AVATAR,
  DELETE_MESSAGES,
  CLEAR_CHAT,
  MARK_ALL_READ,
  MARK_READ,
  MARK_DELIVERED,
  SET_BADGE_COUNT,
} from '../actions/types';
import {pushMessage} from "./utils/messages";

const initialState = {
  messages: [],
  badgeCount: 0
};

const messagesReducer = {
  [ADD_NEW_USER_MESSAGE]: (state: MessagesState, { text, showClientAvatar, id, date, chatId, options, post, audioLink }) =>
    ({ ...state, messages: pushMessage(state.messages, createNewMessage(
        text,
        MESSAGE_SENDER.CLIENT,
        id,
        date,
        chatId,
        options,
        post,
        audioLink,
      ))}),
  [ADD_NEW_RESPONSE_MESSAGE]: (state: MessagesState, { text, id, date, chatId, options, post, audioLink }) =>
    ({ ...state, messages: pushMessage(state.messages, createNewMessage(
        text,
        MESSAGE_SENDER.RESPONSE,
        id,
        date,
        chatId,
        options,
        post,
        audioLink,
      )), badgeCount: state.badgeCount + 1 }),

  [ADD_NEW_LINK_SNIPPET]: (state: MessagesState, { link, id }) =>
    ({ ...state, messages: [...state.messages, createLinkSnippet(link, id)] }),

  [ADD_COMPONENT_MESSAGE]: (state: MessagesState, { component, props, showAvatar, id }) =>
    ({ ...state, messages: [...state.messages, createComponentMessage(component, props, showAvatar, id)] }),

  [DROP_MESSAGES]: (state: MessagesState, { chatId }) => {
    return { ...state, messages:  chatId === undefined ? [] : state.messages.filter(m => m.chatId !== chatId)};
  },

  [HIDE_AVATAR]: (state: MessagesState, { index }) => state.messages[index].showAvatar = false,

  [DELETE_MESSAGES]: (state: MessagesState, { count, id }) =>
  ({
    ...state,
    messages: id
      ? state.messages.filter((_, index) => {
        const targetMsg = state.messages.findIndex(tMsg => tMsg.customId === id)
        return index < targetMsg - count + 1 || index > targetMsg
      })
      : state.messages.slice(0, state.messages.length - count)
  }),

  [CLEAR_CHAT]: (state: MessagesState, { chatId }) =>
  ({
    ...state,
    messages: state.messages.filter(tMsg => tMsg.chatId !== chatId),
  }),

  [SET_BADGE_COUNT]: (state: MessagesState, { count }) => ({ ...state, badgeCount: count }),

  [MARK_ALL_READ]: (state: MessagesState, { chatId }) => {
    if (chatId) {
      return {
        ...state,
        messages: state
            .messages
            .map(message => message.chatId === chatId ? ({ ...message, unread: false }) : message), badgeCount: 0
      };
    }

    return { ...state, messages: state.messages.map(message => ({ ...message, unread: false })), badgeCount: 0 };
  },

  [MARK_READ]: (state: MessagesState, { id }) => {
    const message = state.messages.find(m => m.customId === id);
    if (message) {
      message.unread = false;
      const pos = state.messages.indexOf(message);

      // mark older messages as read
      state.messages.slice(0, pos).forEach(m => {
        m.unread = false;
      });
    }
    return { ...state, messages: [...state.messages] };
  },

  [MARK_DELIVERED]: (state: MessagesState, { id, newId }) => {
    const message = state.messages.find(m => m.customId === id);
    if (message) {
      message.delivered = true;
      if (newId) {
        message.customId = newId;
      }
    }
    return { ...state, messages: [...state.messages] };
  },


}

export default (state = initialState, action: MessagesActions) => createReducer(messagesReducer, state, action);
