import 'react/jsx-runtime';

import ConnectedWidget from './src';
import {
  addUserMessage,
  addUserAudioMessage,
  addResponseMessage,
  addSystemResponseMessage,
  addResponseAudioMessage,
  addResponseImageMessage,
  addUserImageMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  isWidgetMinimalized,
  minimalizeChat,
  setQuickButtons,
  deleteMessages,
  clearChat,
  markAllAsRead,
  setBadgeCount,
  markAsRead,
  markAsDelivered,
  getLastResponseMessage,
  getOldestMessage,
  getMessages
} from './src/store/dispatcher';
import { emojiBackwardConvert, emojiConvert } from './src/utils/emoji';
import { emojiTruncate, EmojiPart } from './src/utils/text-with-emoji-truncate';
import { PostOptions } from './src/store/types';
import Sender from './src/components/Widget/components/Conversation/components/Sender';
import { EmojiPicker as Picker } from './src/components/Picker';

const { textWithEmojiTruncate, strEmojiLen, isEmojiPosition, indexOfAll } = emojiTruncate;

export {
  ConnectedWidget as Widget,
  addUserMessage,
  addUserAudioMessage,
  addResponseMessage,
  addSystemResponseMessage,
  addResponseAudioMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  isWidgetMinimalized,
  minimalizeChat,
  setQuickButtons,
  deleteMessages,
  clearChat,
  markAllAsRead,
  setBadgeCount,
  markAsRead,
  markAsDelivered,
  getLastResponseMessage,
  getOldestMessage,
  getMessages,
  emojiBackwardConvert,
  emojiConvert,
  textWithEmojiTruncate,
  strEmojiLen,
  isEmojiPosition,
  indexOfAll,
  addResponseImageMessage,
  addUserImageMessage,
  emojiTruncate,
  EmojiPart,
  PostOptions,
  Sender,
  Picker
};
