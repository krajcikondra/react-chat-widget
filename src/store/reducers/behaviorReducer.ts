import { createReducer } from '../../utils/createReducer';
import { BehaviorState } from '../types';

import {
  BehaviorActions, MINIMALIZE_CHAT, SET_MAX_OPEN_CHATS, SetMaxOpenChats,
  TOGGLE_CHAT,
  TOGGLE_INPUT_DISABLED,
  TOGGLE_MESSAGE_LOADER
} from '../actions/types';

const initialState = {
  showChat: [],
  minimalizedChat: [],
  disabledInput: false,
  messageLoader: false,
  maxOpenChats: undefined,
};

const behaviorReducer = {
  [TOGGLE_CHAT]: (state: BehaviorState, {chatId}) => {
    const chId = chatId ?? 'default';
    if (state.showChat.includes(chId)) {
      state.showChat = state.showChat.filter(name => name !== chId);
    } else {
      state.showChat.push(chId);
    }

    if (state.maxOpenChats !== undefined && state.showChat.length > state.maxOpenChats) {
      state.showChat = state.showChat.slice(-1 * state.maxOpenChats);
    }

    return {
      ...state,
      showChat: [...state.showChat],
      minimalizedChat: [...state.minimalizedChat.filter(name => state.showChat.includes(name))],
    };
  },
  [MINIMALIZE_CHAT]: (state: BehaviorState, {chatId, value}) => {
    const chId = chatId ?? 'default';
    if (value) {
      state.minimalizedChat.push(chId);
    } else {
      state.minimalizedChat = state.minimalizedChat.filter(name => name !== chId);
    }

    return {
      ...state,
      minimalizedChat: [...state.minimalizedChat],
    };
  },

  [TOGGLE_INPUT_DISABLED]: (state: BehaviorState) => ({ ...state, disabledInput: !state.disabledInput }),
  [TOGGLE_INPUT_DISABLED]: (state: BehaviorState) => ({ ...state, disabledInput: !state.disabledInput }),
  [SET_MAX_OPEN_CHATS]: (state: BehaviorState, action: SetMaxOpenChats) => ({ ...state, maxOpenChats: action.maxOpenedChats }),

  [TOGGLE_MESSAGE_LOADER]: (state: BehaviorState) => ({ ...state, messageLoader: !state.messageLoader })
};

export default (state: BehaviorState = initialState, action: BehaviorActions) => createReducer(behaviorReducer, state, action);
