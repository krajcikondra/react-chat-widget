import 'react/jsx-runtime';

import ConnectedWidget from './src';
import {
  addUserMessage,
  addResponseMessage,
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

export {
  ConnectedWidget as Widget,
  addUserMessage,
  addResponseMessage,
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
  emojiConvert
};
