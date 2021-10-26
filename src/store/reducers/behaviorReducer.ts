import { createReducer } from '../../utils/createReducer';
import { BehaviorState } from '../types';

import {
  BehaviorActions,
  TOGGLE_CHAT,
  TOGGLE_INPUT_DISABLED,
  TOGGLE_MESSAGE_LOADER
} from '../actions/types';

const initialState = {
  showChat: [],
  disabledInput: false,
  messageLoader: false
};

const behaviorReducer = {
  [TOGGLE_CHAT]: (state: BehaviorState, {chatId}) => {
    const chId = chatId ?? 'default';
    if (state.showChat.includes(chId)) {
      state.showChat = state.showChat.filter(name => name !== chId);
    } else {
      state.showChat.push(chId);
    }

    return {
      ...state,
      showChat: [...state.showChat],
    };
  },

  [TOGGLE_INPUT_DISABLED]: (state: BehaviorState) => ({ ...state, disabledInput: !state.disabledInput }),

  [TOGGLE_MESSAGE_LOADER]: (state: BehaviorState) => ({ ...state, messageLoader: !state.messageLoader })
};

export default (state: BehaviorState = initialState, action: BehaviorActions) => createReducer(behaviorReducer, state, action);
