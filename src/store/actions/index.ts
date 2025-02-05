import { ElementType } from 'react';

import * as actionsTypes from './types';
import { LinkParams, ImageState } from '../types';
import {AddResponseSystemMessage, MessageOptions, MINIMALIZE_CHAT, MinimalizeChat, PostOptions} from "./types";

export function toggleChat(chatId?: string): actionsTypes.ToggleChat {
  return {
    type: actionsTypes.TOGGLE_CHAT,
    chatId,
  };
}

export function minimalizeChat(value: boolean, chatId?: string): actionsTypes.MinimalizeChat {
  return {
    type: actionsTypes.MINIMALIZE_CHAT,
    chatId,
    value,
  };
}

export function setMaxOpenChats(maxOpenedChats?: number): actionsTypes.SetMaxOpenChats {
  return {
    type: actionsTypes.SET_MAX_OPEN_CHATS,
    maxOpenedChats,
  };
}

export function toggleInputDisabled(): actionsTypes.ToggleInputDisabled {
  return {
    type: actionsTypes.TOGGLE_INPUT_DISABLED
  };
}

export function addUserMessage(
    text: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
    post?: PostOptions,
): actionsTypes.AddUserMessage {
  return {
    type: actionsTypes.ADD_NEW_USER_MESSAGE,
    text,
    id,
    date,
    chatId,
    options,
    post,
  };
}

export function addUserAudioMessage(
    audioLink: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
): actionsTypes.AddUserMessage {
  return {
    type: actionsTypes.ADD_NEW_USER_MESSAGE,
    text: '',
    id,
    date,
    chatId,
    audioLink,
    options,
  };
}

export function addUserImageMessage(
    imageLink: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
): actionsTypes.AddUserMessage {
  return {
    type: actionsTypes.ADD_NEW_USER_MESSAGE,
    text: '',
    id,
    date,
    chatId,
    imageLink,
    options,
  };
}

export function addResponseMessage(
    text: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
    post?: PostOptions,
): actionsTypes.AddResponseMessage {
  return {
    type: actionsTypes.ADD_NEW_RESPONSE_MESSAGE,
    text,
    id,
    date,
    chatId,
    options,
    post,
  };
}

export function addSystemResponseMessage(
    text: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
    post?: PostOptions,
): actionsTypes.AddResponseSystemMessage {
  return {
    type: actionsTypes.ADD_NEW_SYSTEM_RESPONSE_MESSAGE,
    text,
    id,
    date,
    chatId,
    options,
    post,
  };
}

export function addResponseAudioMessage(
    audioLink: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
): actionsTypes.AddResponseMessage {
  return {
    type: actionsTypes.ADD_NEW_RESPONSE_MESSAGE,
    text: '',
    audioLink,
    id,
    date,
    chatId,
    options,
  };
}

export function addResponseImageMessage(
    imageLink: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
): actionsTypes.AddResponseMessage {
  return {
    type: actionsTypes.ADD_NEW_RESPONSE_MESSAGE,
    text: '',
    imageLink,
    id,
    date,
    chatId,
    options,
  };
}

export function toggleMsgLoader(): actionsTypes.ToggleMsgLoader {
  return {
    type: actionsTypes.TOGGLE_MESSAGE_LOADER
  }
}

export function addLinkSnippet(link: LinkParams, id?: string): actionsTypes.AddLinkSnippet {
  return {
    type: actionsTypes.ADD_NEW_LINK_SNIPPET,
    link,
    id
  };
}

export function renderCustomComponent(
  component: ElementType,
  props: any,
  showAvatar: boolean,
  id?: string
): actionsTypes.RenderCustomComponent {
  return {
    type: actionsTypes.ADD_COMPONENT_MESSAGE,
    component,
    props,
    showAvatar,
    id
  };
}

export function dropMessages(chatId?: string): actionsTypes.DropMessages {
  return {
    type: actionsTypes.DROP_MESSAGES,
    chatId,
  };
}

export function hideAvatar(index: number): actionsTypes.HideAvatar {
  return {
    type: actionsTypes.HIDE_AVATAR,
    index
  };
}

export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>): actionsTypes.SetQuickButtons {
  return {
    type: actionsTypes.SET_QUICK_BUTTONS,
    buttons
  }
}

export function deleteMessages(count: number, id?: string): actionsTypes.DeleteMessages {
  return {
    type: actionsTypes.DELETE_MESSAGES,
    count,
    id
  }
}

export function clearChat(chatId: string): actionsTypes.ClearChat {
  return {
    type: actionsTypes.CLEAR_CHAT,
    chatId,
  }
}

export function setBadgeCount(count: number): actionsTypes.SetBadgeCount {
  return {
    type: actionsTypes.SET_BADGE_COUNT,
    count
  }
}

export function markAllMessagesRead(chatId?: string): actionsTypes.MarkAllMessagesRead {
  return {
    type: actionsTypes.MARK_ALL_READ,
    chatId,
  }
}

export function markAsRead(id: string): actionsTypes.MarkRead {
  return {
    type: actionsTypes.MARK_READ,
    id,
  }
}

export function markAsDelivered(id: string, newId?: string): actionsTypes.MarkDelivered {
  return {
    type: actionsTypes.MARK_DELIVERED,
    id,
    newId,
  }
}

export function openFullscreenPreview(payload: ImageState): actionsTypes.FullscreenPreviewActions {
  return {
    type: actionsTypes.OPEN_FULLSCREEN_PREVIEW,
    payload
  };
}

export function closeFullscreenPreview(): actionsTypes.FullscreenPreviewActions {
  return {
    type: actionsTypes.CLOSE_FULLSCREEN_PREVIEW
  };
}
