import 'react/jsx-runtime';

import ConnectedWidget from './src';
import {
  addUserMessage,
  addUserAudioMessage,
  addResponseMessage,
  addResponseAudioMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  setQuickButtons,
  deleteMessages,
  markAllAsRead,
  setBadgeCount,
  markAsRead,
  markAsDelivered,
  getLastResponseMessage
} from './src/store/dispatcher';
import { emojiBackwardConvert, emojiConvert } from './src/utils/emoji';
import {PostOptions} from './src/store/types';
import Sender from './src/components/Widget/components/Conversation/components/Sender';

export {
  ConnectedWidget as Widget,
  addUserMessage,
  addUserAudioMessage,
  addResponseMessage,
  addResponseAudioMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  setQuickButtons,
  deleteMessages,
  markAllAsRead,
  setBadgeCount,
  markAsRead,
  markAsDelivered,
  getLastResponseMessage,
  emojiBackwardConvert,
  emojiConvert,
  PostOptions,
  Sender
};
