import { ElementType } from 'react';

import { Message as MessageI, Link, CustomCompMessage, LinkParams } from '../store/types';

import Message from '../components/Widget/components/Conversation/components/Messages/components/Message';
import Snippet from '../components/Widget/components/Conversation/components/Messages/components/Snippet';
import QuickButton from '../components/Widget/components/Conversation/components/QuickButtons/components/QuickButton';

import { MESSAGES_TYPES, MESSAGE_SENDER, MESSAGE_BOX_SCROLL_DURATION } from '../constants';
import {MessageOptions, PostOptions} from '../store/actions/types';
import {stripHtmlTags} from './strip-html-tags';

export function createNewMessage(
  text: string,
  sender: string,
  id?: string,
  date?: Date,
  chatId?: string,
  options?: MessageOptions,
  post?: PostOptions,
  audioLink?: string,
  isSystemMessage = false,
  imageLink?: string,
): MessageI {


  const read = options?.read === undefined ? false : options.read
  const delivered = options?.delivered === undefined ? sender === MESSAGE_SENDER.RESPONSE : options.delivered

  return {
    type: MESSAGES_TYPES.TEXT,
    component: Message,
    text: stripHtmlTags(text),
    sender,
    timestamp: date ? date : new Date(),
    showAvatar: !isSystemMessage,
    customId: id,
    unread: !read,
    chatId,
    delivered,
    post,
    audioLink,
    imageLink,
    isSystemMessage,
  };
}

export function createLinkSnippet(link: LinkParams, id?: string) : Link {
  return {
    type: MESSAGES_TYPES.SNIPPET.LINK,
    component: Snippet,
    title: link.title,
    link: link.link,
    target: link.target || '_blank',
    sender: MESSAGE_SENDER.RESPONSE,
    timestamp: new Date(),
    showAvatar: true,
    customId: id,
    unread: true,
    delivered: false,
  };
}

export function createComponentMessage(component: ElementType, props: any, showAvatar: boolean, id?: string): CustomCompMessage {
  return {
    type: MESSAGES_TYPES.CUSTOM_COMPONENT,
    component,
    props,
    sender: MESSAGE_SENDER.RESPONSE,
    timestamp: new Date(),
    showAvatar,
    customId: id,
    unread: true,
    delivered: false,
  };
}

export function createQuickButton(button: { label: string, value: string | number }) {
  return {
    component: QuickButton,
    label: button.label,
    value: button.value
  };
}

// TODO: Clean functions and window use for SSR

function sinEaseOut(timestamp: any, begining: any, change: any, duration: any) {
  return change * ((timestamp = timestamp / duration - 1) * timestamp * timestamp + 1) + begining;
}

/**
 *
 * @param {*} target scroll target
 * @param {*} scrollStart
 * @param {*} scroll scroll distance
 */
function scrollWithSlowMotion(target: any, scrollStart: any, scroll: number) {
  if (typeof window === 'undefined') {
    return;
  }

  const raf = window?.requestAnimationFrame;
  let start = 0;
  const step = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    let stepScroll = sinEaseOut(timestamp - start, 0, scroll, MESSAGE_BOX_SCROLL_DURATION);
    let total = scrollStart + stepScroll;
    target.scrollTop = total;
    if (total < scrollStart + scroll) {
      raf(step);
    }
  }
  raf(step);
}

export function scrollToBottom(messagesDiv: HTMLDivElement | null) {
  if (!messagesDiv) return;
  const screenHeight = messagesDiv.clientHeight;
  const scrollTop = messagesDiv.scrollTop;
  const scrollOffset = messagesDiv.scrollHeight - (scrollTop + screenHeight);
  if (scrollOffset) scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
  scrollBottomTo(messagesDiv, scrollTop, scrollOffset);
}

export function scrollBottomTo(messagesDiv: HTMLDivElement | null, scrollTop: number, scrollOffset: number) {
  if (!messagesDiv) return;
  if (scrollOffset) scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
}
