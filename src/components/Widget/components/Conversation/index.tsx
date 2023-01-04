import React, {ReactElement, ReactNode} from 'react';
import { useRef, useState, useEffect } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import cn from 'classnames';

import Header from './components/Header';
import Messages, {IMessagesRef} from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';
import {isWidgetOpened, toggleWidget} from "../../../../../index";
import {useDispatch, useSelector} from "react-redux";
import {GlobalState} from "@types";
import {minimalizeChat, setBadgeCount} from "@actions";

interface ISenderRef {
  onSelectEmoji: (event: any) => void;
}

export type EmojiSet = 'apple' | 'google' | 'twitter' | 'facebook';
export type Emoji = {
  shortcodes: string,
  emoticons: any[],
  id: string,
  name: string,
  native: string,
  short_names: string[],
  skin: any|null,
  unified: string,
};

type Props = {
  chatId: string;
  title: string|ReactElement;
  subtitle: string;
  senderPlaceHolder: string;
  showCloseButton: boolean;
  showMinimalizeButton?: boolean;
  disabledInput: boolean;
  autofocus: boolean;
  className: string;
  sendMessage: AnyFunction;
  sendAudio?: AnyFunction;
  toggleChat: AnyFunction;
  profileAvatar?: string|ReactElement;
  profileClientAvatar?: string|ReactElement;
  titleAvatar?: string;
  onQuickButtonClicked?: AnyFunction;
  onTextInputChange?: (event: any) => void;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  resizable?: boolean;
  emojis?: boolean;
  emojiSet?: EmojiSet;
  micAllowed?: boolean;
  uploadAudioUrl?: string;
  headerBeginElement?: ReactElement;
  sendIcon?: ReactNode;
  smileIcon?: ReactNode;
  onScrollTop(): void;
  onFocus?(chatId?: string): void;
  onImageClick?(url: string): void;
  isShowEmoji: boolean;
  isShowFileUploader: boolean;
};

function Conversation({
  title,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  showMinimalizeButton,
  disabledInput,
  autofocus,
  className,
  sendMessage,
  sendAudio,
  toggleChat,
  profileAvatar,
  profileClientAvatar,
  titleAvatar,
  onQuickButtonClicked,
  onTextInputChange,
  sendButtonAlt,
  showTimeStamp,
  resizable,
  emojis,
  chatId,
  emojiSet,
  onScrollTop,
  onFocus,
  micAllowed,
  uploadAudioUrl,
  headerBeginElement,
  smileIcon,
  sendIcon,
  isShowFileUploader = false,
  isShowEmoji = true,
  onImageClick,
}: Props) {
  const [containerDiv, setContainerDiv] = useState<HTMLElement | null>();
  let startX, startWidth;

  useEffect(() => {
    const containerDiv = document.getElementById('rcw-conversation-container-' + chatId);
    setContainerDiv(containerDiv);
  }, []);

  const initResize = (e) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (resizable) {
      startX = e.clientX;
      if (document.defaultView && containerDiv){
        startWidth = parseInt(document.defaultView.getComputedStyle(containerDiv).width);
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
      }
    }
  }

  const resize = (e) => {
    if (containerDiv) {
      containerDiv.style.width = (startWidth - e.clientX + startX) + 'px';
    }
  }

  const stopResize = (e) => {
    if (typeof window === 'undefined') {
      return;
    }
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
  }

  const [pickerOffset, setOffset] = useState(0)
  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  const senderRef = useRef<ISenderRef>(null!);
  const [pickerStatus, setPicket] = useState(false)

  const onSelectEmoji = (emoji: Emoji) => {
    senderRef.current?.onSelectEmoji(emoji);
  }

  const togglePicker = () => {
    setPicket(prevPickerStatus => !prevPickerStatus)
  }

  const handlerSendMsn = (event) => {
    sendMessage(event)
    if(pickerStatus) setPicket(false)
  }

  const escapePressed = () => {
    if (isWidgetOpened(chatId)) {
      toggleWidget(chatId);
    }
  };

  const handlerOnFocus = () => {
    onFocus?.(chatId);
    setPicket(false);
  };
  const messagesRef = useRef<IMessagesRef>(null!);
  const dispatch = useDispatch();
  const minimalize = (value: boolean) => {
    dispatch(minimalizeChat(value, chatId));
  };
  const isMinimalize = useSelector((state: GlobalState) => state.behavior.minimalizedChat.includes(chatId));

  return (
    <div id={"rcw-conversation-container-" + chatId} onMouseDown={initResize}
      className={cn('rcw-conversation-container', className, isMinimalize && 'minimalize')}
      aria-live="polite"
    >
      {resizable && <div className="rcw-conversation-resizer"
      />}
      <Header
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        showMinimalizeButton={showMinimalizeButton}
        minimalizeChat={minimalize}
        isMinimalized={isMinimalize}
        titleAvatar={titleAvatar}
        headerBeginElement={headerBeginElement}
      />
      <Messages
        ref={messagesRef}
        chatId={chatId}
        profileAvatar={profileAvatar}
        profileClientAvatar={profileClientAvatar}
        showTimeStamp={showTimeStamp}
        onScrollTop={onScrollTop}
        set={emojiSet ?? undefined}
        onImageClick={onImageClick}
      />
      <QuickButtons
          onQuickButtonClicked={onQuickButtonClicked}
      />
    <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
      {emojis && pickerStatus && (<Picker
        data={data}
        style={{ position: 'absolute', bottom: pickerOffset, left: '0', width: '100%' }}
        onEmojiSelect={onSelectEmoji}
        set={emojiSet ?? undefined}
      />)}
      <Sender
        ref={senderRef}
        isShowFileUploader={isShowFileUploader}
        isShowEmoji={isShowEmoji}
        sendMessage={handlerSendMsn}
        sendAudio={sendAudio}
        placeholder={senderPlaceHolder}
        disabledInput={disabledInput}
        autofocus={autofocus}
        onTextInputChange={onTextInputChange}
        buttonAlt={sendButtonAlt}
        onPressEmoji={togglePicker}
        onChangeSize={setOffset}
        onEscapePressed={escapePressed}
        onFocus={handlerOnFocus}
        set={emojiSet ?? undefined}
        showChat={showChat}
        micAllowed={micAllowed}
        uploadAudioUrl={uploadAudioUrl}
        smileIcon={smileIcon}
        sendIcon={sendIcon}
      />
    </div>
  );
}

export default Conversation;
