import { ElementType } from 'react';

import { LinkParams, FullscreenPreviewState } from '../types';

export const TOGGLE_CHAT = 'BEHAVIOR/TOGGLE_CHAT';
export const TOGGLE_INPUT_DISABLED = 'BEHAVIOR/TOGGLE_INPUT_DISABLED';
export const SET_MAX_OPEN_CHATS = 'BEHAVIOR/SET_MAX_OPEN_CHATS';
export const TOGGLE_MESSAGE_LOADER = 'BEHAVIOR/TOGGLE_MSG_LOADER';
export const SET_BADGE_COUNT = 'BEHAVIOR/SET_BADGE_COUNT';
export const ADD_NEW_USER_MESSAGE = 'MESSAGES/ADD_NEW_USER_MESSAGE';
export const ADD_NEW_RESPONSE_MESSAGE = 'MESSAGES/ADD_NEW_RESPONSE_MESSAGE';
export const ADD_NEW_SYSTEM_RESPONSE_MESSAGE = 'MESSAGES/ADD_NEW_SYSTEM_RESPONSE_MESSAGE';
export const GET_LAST_RESPONSE_MESSAGE = 'MESSAGES/GET_LAST_RESPONSE_MESSAGE';
export const ADD_NEW_LINK_SNIPPET = 'MESSAGES/ADD_NEW_LINK_SNIPPET';
export const ADD_COMPONENT_MESSAGE = 'MESSAGES/ADD_COMPONENT_MESSAGE';
export const DROP_MESSAGES = 'MESSAGES/DROP_MESSAGES';
export const HIDE_AVATAR = 'MESSAGES/HIDE_AVATAR';
export const DELETE_MESSAGES = 'MESSAGES/DELETE_MESSAGES';
export const CLEAR_CHAT = 'MESSAGES/CLEAR_CHAT';
export const MARK_ALL_READ = 'MESSAGES/MARK_ALL_READ';
export const MARK_DELIVERED = 'MESSAGES/MARK_DELIVERED';
export const MARK_READ = 'MESSAGES/MARK_READ';
export const SET_QUICK_BUTTONS = 'SET_QUICK_BUTTONS';
export const OPEN_FULLSCREEN_PREVIEW = 'FULLSCREEN/OPEN_PREVIEW';
export const CLOSE_FULLSCREEN_PREVIEW = 'FULLSCREEN/CLOSE_PREVIEW';

export interface MessageOptions {
  read?: boolean,
  delivered?: boolean,
}

export interface PostOptions {
  title?: string,
  link: string,
  text?: string,
  imgLink?: string,
}

export interface ToggleChat {
  type: typeof TOGGLE_CHAT;
  chatId?: string;
}

export interface ToggleInputDisabled {
  type: typeof TOGGLE_INPUT_DISABLED;
}

export interface SetMaxOpenChats {
  type: typeof SET_MAX_OPEN_CHATS;
  maxOpenedChats?: number;
}

export interface AddUserMessage {
  type: typeof ADD_NEW_USER_MESSAGE;
  text: string;
  id?: string;
  chatId?: string;
  date?: Date;
  options?: MessageOptions,
  post?: PostOptions;
  audioLink?: string;
}

export interface GetLastResponseMessage {
  type: typeof GET_LAST_RESPONSE_MESSAGE;
}

export interface AddResponseMessage {
  type: typeof ADD_NEW_RESPONSE_MESSAGE;
  text?: string;
  audioLink?: string;
  id?: string;
  chatId?: string;
  date?: Date;
  options?: MessageOptions,
  post?: PostOptions;
}

export interface AddResponseSystemMessage {
  type: typeof ADD_NEW_SYSTEM_RESPONSE_MESSAGE;
  text?: string;
  audioLink?: string;
  id?: string;
  chatId?: string;
  date?: Date;
  options?: MessageOptions,
  post?: PostOptions;
}

export interface ToggleMsgLoader {
  type: typeof TOGGLE_MESSAGE_LOADER;
}

export interface AddLinkSnippet {
  type: typeof ADD_NEW_LINK_SNIPPET;
  link: LinkParams;
  id?: string;
}

export interface RenderCustomComponent {
  type: typeof ADD_COMPONENT_MESSAGE;
  component: ElementType;
  props: any;
  showAvatar: boolean;
  id?: string;
}

export interface DropMessages {
  type: typeof DROP_MESSAGES;
  chatId?: string;
}

export interface HideAvatar {
  type: typeof HIDE_AVATAR;
  index: number;
}

export interface DeleteMessages {
  type: typeof DELETE_MESSAGES;
  count: number;
  id?: string;
}

export interface ClearChat {
  type: typeof CLEAR_CHAT;
  chatId: string;
}

export interface SetQuickButtons {
  type: typeof SET_QUICK_BUTTONS;
  buttons: Array<{ label: string, value: string | number }>;
}

export interface SetBadgeCount {
  type: typeof SET_BADGE_COUNT;
  count: number;
}

export interface MarkAllMessagesRead {
  type: typeof MARK_ALL_READ;
  chatId?: string;
}

export interface MarkDelivered {
  type: typeof MARK_DELIVERED;
  id: string;
  newId?: string;
}

export interface MarkRead {
  type: typeof MARK_READ;
  id: string;
}

export type BehaviorActions = ToggleChat | ToggleInputDisabled | ToggleMsgLoader | SetMaxOpenChats;

export type MessagesActions = AddUserMessage | AddResponseMessage | AddLinkSnippet | RenderCustomComponent
                              | DropMessages | HideAvatar | DeleteMessages | MarkAllMessagesRead | SetBadgeCount
                              | MarkDelivered | MarkRead | ClearChat | AddResponseSystemMessage;

export type QuickButtonsActions = SetQuickButtons;

export interface openFullscreenPreview {
  type: typeof OPEN_FULLSCREEN_PREVIEW;
  payload: FullscreenPreviewState
}

export interface closeFullscreenPreview {
  type: typeof CLOSE_FULLSCREEN_PREVIEW;
}

export type FullscreenPreviewActions = openFullscreenPreview | closeFullscreenPreview;
