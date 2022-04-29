import React, {ReactElement} from 'react';
import { useRef, useState, useEffect } from 'react';
import { Picker } from 'emoji-mart';
import cn from 'classnames';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';
import {isWidgetOpened, toggleWidget} from "../../../../../index";
import {useSelector} from "react-redux";
import {GlobalState} from "@types";

interface ISenderRef {
  onSelectEmoji: (event: any) => void;
}

export type EmojiSet = 'apple' | 'google' | 'twitter' | 'facebook';
export type Emoji = {
  colons: string,
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
  onScrollTop(): void;
  onFocus?(chatId?: string): void;
};

function Conversation({
  title,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
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
}: Props) {
  const [containerDiv, setContainerDiv] = useState<HTMLElement | null>();
  let startX, startWidth;

  useEffect(() => {
    const containerDiv = document.getElementById('rcw-conversation-container-' + chatId);
    setContainerDiv(containerDiv);
  }, []);

  const initResize = (e) => {
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

  return (
    <div id={"rcw-conversation-container-" + chatId} onMouseDown={initResize}
      className={cn('rcw-conversation-container', className)} aria-live="polite">
      {resizable && <div className="rcw-conversation-resizer"
      />}
      <Header
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        titleAvatar={titleAvatar}
      />
      <Messages
        chatId={chatId}
        profileAvatar={profileAvatar}
        profileClientAvatar={profileClientAvatar}
        showTimeStamp={showTimeStamp}
        onScrollTop={onScrollTop}
        set={emojiSet ?? undefined}
      />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
      {emojis && pickerStatus && (<Picker
        style={{ position: 'absolute', bottom: pickerOffset, left: '0', width: '100%' }}
        onSelect={onSelectEmoji}
        set={emojiSet ?? undefined}
      />)}
      <Sender
        ref={senderRef}
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
      />
    </div>
  );
}

export default Conversation;
