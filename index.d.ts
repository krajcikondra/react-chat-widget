// Type definitions for react-chat-widget v3.0.0
// Project: <https://github.com/Wolox/react-chat-widget>
// Definitions by: Martín Callegari <https://github.com/mcallegari10>

import { ElementType } from 'react';
import {MessageOptions, PostOptions} from "./src/store/actions/types";
export {Sender} from "./src/components/Widget/components/Conversation/components/Sender";
import {Message} from "@types";
import {EmojiSet} from "./src/components/Widget/components/Conversation";

declare const Widget: ElementType;

export function addUserMessage(text: string): void;
export function addUserMessage(text: string, id: string): void;
export function addUserMessage(text: string, id: string, date: Date): void;
export function addUserMessage(text: string, id: string, date: Date, chatId: string): void;
export function addUserMessage(text: string, id: string, date: Date, chatId: string, options: MessageOptions): void;
export function addUserMessage(text: string, id: string, date: Date, chatId: string, options: MessageOptions, post?: PostOptions): void;

export function addResponseMessage(text: string): void;
export function addResponseMessage(text: string, id: string): void;
export function addResponseMessage(text: string, id: string, date: Date): void;
export function addResponseMessage(text: string, id: string, date: Date, chatId: string): void;
export function addResponseMessage(text: string, id: string, date: Date, chatId: string, options: MessageOptions): void;
export function addResponseMessage(text: string, id: string, date: Date, chatId: string, options: MessageOptions, post?: PostOptions): void;

export function addUserAudioMessage(audioLink: string, id?: string, date?: Date, chatId: string, options?: MessageOptions): void;
export function addResponseAudioMessage(audioLink: string, id?: string, date?: Date, chatId?: string, options?: MessageOptions): void;

export function addLinkSnippet(link: { link: string, title: string, target?: string }): void;
export function addLinkSnippet(link: { link: string, title: string, target?: string }, id: string): void;

export function renderCustomComponent(component: ElementType, props: any): void;
export function renderCustomComponent(component: ElementType, props: any, showAvatar: boolean): void;
export function renderCustomComponent(component: ElementType, props: any, showAvatar: boolean, id: string): void;

export function setMaxOpenWidgets(maxOpenWidgets?: number): void;

export function toggleMsgLoader(): void;
export function toggleWidget(chatId?: string): void;
export function toggleInputDisabled(): void;
export function dropMessages(chatId?: string): void;
export function isWidgetOpened(chatId?: string): boolean;
export function getLastResponseMessage(chatId?: string): null|Message;
export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>): void;

export function deleteMessages(count: number): void;
export function deleteMessages(count: number, id: string): void;
export function deleteMessages(count: number, id: string, chatId: string): void;

export function markAllAsRead(): void;
export function markAllAsRead(chatId: string): void;
export function markAsRead(id: string): void;
export function markAsDelivered(id: string, newId?: string): void;
export function setBadgeCount(count: number): void;

export function emojiConvert(sanitizedHTML: string, emojiSet?: EmojiSet): string;
export function emojiBackwardConvert(text: string): string;

export as namespace ReactChatWidget;
