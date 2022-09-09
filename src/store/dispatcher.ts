import { ElementType } from 'react';

import store from '.';
import * as actions from './actions';
import {LinkParams, ImageState, Message} from './types';
import {MessageOptions, PostOptions} from "./actions/types";
import {MESSAGE_SENDER} from "../constants";

export function addUserMessage(
    text: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
    post?: PostOptions,
) {
  store.dispatch(actions.addUserMessage(text, id, date, chatId, options, post));
}

export function addUserAudioMessage(
    audioLink: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
) {
  store.dispatch(actions.addUserAudioMessage(audioLink, id, date, chatId, options));
}

export function addResponseMessage(
    text: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
    post?: PostOptions,
) {
  store.dispatch(actions.addResponseMessage(text, id, date, chatId, options, post));
}

export function addSystemResponseMessage(
    text: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
    post?: PostOptions,
) {
  store.dispatch(actions.addSystemResponseMessage(text, id, date, chatId, options, post));
}

export function addResponseAudioMessage(
    audioLink: string,
    id?: string,
    date?: Date,
    chatId?: string,
    options?: MessageOptions,
) {
  store.dispatch(actions.addResponseAudioMessage(audioLink, id, date, chatId, options));
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

export function minimalizeChat(value: boolean, chatId?: string): void {
  store.dispatch(actions.minimalizeChat(value, chatId));
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

export function isWidgetMinimalized(chatId?: string): boolean {
  return store.getState().behavior.minimalizedChat.includes(chatId ?? 'default');
}

export function getLastResponseMessage(chatId?: string): null|Message {
  const isClient = (m) => m.sender === MESSAGE_SENDER.CLIENT;
  let messages = store.getState().messages.messages.filter(m => !isClient(m));

  if (chatId !== undefined) {
    messages = messages.filter(m => m.chatId === chatId);
  }

  if (messages.length === 0) {
    return null;
  }

  return messages[0];
}

export function getMessages(chatId?: string): Message[] {
  let messages = store.getState().messages.messages;

  if (chatId !== undefined) {
    messages = messages.filter(m => m.chatId === chatId);
  }

  return messages;
}

export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>) {
  store.dispatch(actions.setQuickButtons(buttons));
}

export function deleteMessages(count: number, id?: string) {
  store.dispatch(actions.deleteMessages(count, id));
}

export function clearChat(chatId: string) {
  store.dispatch(actions.clearChat(chatId));
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
