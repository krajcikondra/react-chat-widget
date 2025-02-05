import React, {ReactElement, ReactNode} from 'react';
import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import Header from './components/Header';
import Messages, {IMessagesRef} from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';
import {isWidgetOpened, toggleWidget} from "../../../../../index";
import {useDispatch, useSelector} from "react-redux";
import {GlobalState, Message} from "@types";
import {minimalizeChat, setBadgeCount} from "@actions";
import {EmojiPicker} from "../../../Picker";

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
  allowEmoji?: boolean;
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
  sendImage?: AnyFunction;
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
  uploadImageUrl?: string;
  headerBeginElement?: ReactElement;
  sendIcon?: ReactNode;
  smileIcon?: ReactNode;
  onScrollTop(): void;
  onFocus?(chatId?: string): void;
  onImageClick?(url: string): void;
  onRemoveMessage?(message: Message): void;
  isShowEmoji: boolean;
  isShowFileUploader: boolean;
};

function Conversation({
  allowEmoji,
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
  sendImage,
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
  uploadImageUrl,
  headerBeginElement,
  smileIcon,
  sendIcon,
  isShowFileUploader = false,
  isShowEmoji = true,
  onImageClick,
  onRemoveMessage,
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
        onRemoveMessage={onRemoveMessage}
      />
      <QuickButtons
          onQuickButtonClicked={onQuickButtonClicked}
      />
    <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
      {emojis && pickerStatus && (<EmojiPicker
          pickerOffset={pickerOffset}
        onEmojiSelect={onSelectEmoji}
        set={emojiSet ?? undefined}
      />)}
      <Sender
        allowEmoji={allowEmoji}
        ref={senderRef}
        isShowFileUploader={isShowFileUploader}
        isShowEmoji={isShowEmoji}
        sendMessage={handlerSendMsn}
        sendAudio={sendAudio}
        sendImage={sendImage}
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
        uploadImageUrl={uploadImageUrl}
        smileIcon={smileIcon}
        sendIcon={sendIcon}
      />
    </div>
  );
}

export default Conversation;
