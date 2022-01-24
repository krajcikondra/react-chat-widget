import { ElementType } from 'react';

import store from '.';
import * as actions from './actions';
import {LinkParams, ImageState, Message} from './types';
import {MessageOptions} from "./actions/types";

export function addUserMessage(text: string, id?: string, date?: Date, chatId?: string, options?: MessageOptions) {
  store.dispatch(actions.addUserMessage(text, id, date, chatId, options));
}

export function addResponseMessage(text: string, id?: string, date?: Date, chatId?: string) {
  store.dispatch(actions.addResponseMessage(text, id, date, chatId));
}

export function addLinkSnippet(link: LinkParams, id?: string) {
  store.dispatch(actions.addLinkSnippet(link, id));
}

export function toggleMsgLoader() {
  store.dispatch(actions.toggleMsgLoader());
}

export function renderCustomComponent(component: ElementType, props: any, showAvatar = false, id?: string) {
  store.dispatch(actions.renderCustomComponent(component, props, showAvatar, id));
}

export function toggleWidget(chatId?: string) {
  store.dispatch(actions.toggleChat(chatId));
}

export function setMaxOpenWidgets(maxOpenedChats?: number) {
  store.dispatch(actions.setMaxOpenChats(maxOpenedChats));
}

export function toggleInputDisabled() {
  store.dispatch(actions.toggleInputDisabled());
}

export function dropMessages(chatId?: string) {
  store.dispatch(actions.dropMessages(chatId));
}

export function isWidgetOpened(chatId?: string): boolean {
  return store.getState().behavior.showChat.includes(chatId ?? 'default');
}

export function getLastResponseMessage(chatId?: string): null|Message {
  let messages = store.getState().messages.messages;

  if (chatId !== undefined) {
    messages = messages.filter(m => m.chatId === chatId);
  }

  if (messages.length === 0) {
    return null;
  }

  return messages[messages.length - 1];
}

export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>) {
  store.dispatch(actions.setQuickButtons(buttons));
}

export function deleteMessages(count: number, id?: string) {
  store.dispatch(actions.deleteMessages(count, id));
}

export function markAllAsRead(chatId?: string) {
  store.dispatch(actions.markAllMessagesRead(chatId));
}

export function markAsRead(id: string) {
  store.dispatch(actions.markAsRead(id));
}

export function markAsDelivered(id: string, newId?: string) {
  store.dispatch(actions.markAsDelivered(id, newId));
}

export function setBadgeCount(count: number) {
  store.dispatch(actions.setBadgeCount(count));
}

export function openFullscreenPreview(payload: ImageState) {
  store.dispatch(actions.openFullscreenPreview(payload));
}

export function closeFullscreenPreview() {
  store.dispatch(actions.closeFullscreenPreview());
}
