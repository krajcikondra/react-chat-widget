import React, {ReactElement, ReactNode, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import {toggleChat, addUserMessage, addUserAudioMessage} from '../../store/actions';
import {isWidgetOpened, setMaxOpenWidgets} from '../../store/dispatcher';
import { AnyFunction } from '../../utils/types';

import WidgetLayout from './layout';
import {EmojiSet} from "./components/Conversation";
import {md5} from "../../utils/hash-generator";
import {emojiBackwardConvert} from "../../utils/emoji";

export type AudioResponseData = {
  id?: number,
  url: string,
};

type Props = {
  title: string | ReactElement;
  titleAvatar?: string;
  subtitle: string;
  senderPlaceHolder: string;
  profileAvatar?: string;
  profileClientAvatar?: string;
  showCloseButton: boolean;
  showMinimalizeButton?: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction|null;
  handleNewUserMessage: AnyFunction;
  handleNewUserAudio?: (audioData: AudioResponseData, msgHash: string) => void;
  handleQuickButtonClicked?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId: string;
  handleToggle?: AnyFunction;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  launcherOpenImg: string;
  launcherCloseImg: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  handleSubmit?: AnyFunction;
  handleSubmitAudio?: AnyFunction;
  showBadge?: boolean;
  resizable?: boolean;
  emojis?: boolean;
  emojiSet?: EmojiSet;
  micAllowed?: boolean;
  uploadAudioUrl?: string;
  maxOpenWidgets?: number;
  headerBeginElement?: ReactElement;
  sendIcon?: ReactNode;
  smileIcon?: ReactNode;
  handleScrollTop?(): void;
  onFocus?(chatId?: string): void;
  isShowEmoji?: boolean;
  isShowFileUploader?: boolean;
}

function Widget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  profileAvatar,
  profileClientAvatar,
  showCloseButton,
  showMinimalizeButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  handleNewUserMessage,
  handleNewUserAudio,
  handleQuickButtonClicked,
  handleTextInputChange,
  chatId,
  handleToggle,
  launcherOpenLabel,
  launcherCloseLabel,
  launcherCloseImg,
  launcherOpenImg,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  handleSubmit,
  handleSubmitAudio,
  showBadge,
  resizable,
  emojis,
  emojiSet,
  maxOpenWidgets,
  handleScrollTop,
  onFocus,
  micAllowed,
  uploadAudioUrl,
  headerBeginElement,
  smileIcon,
  sendIcon,
  isShowFileUploader = true,
  isShowEmoji = false,
}: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    setMaxOpenWidgets(maxOpenWidgets)
  }, [maxOpenWidgets]);

  const toggleConversation = () => {
    dispatch(toggleChat(chatId));
    handleToggle ? handleToggle(isWidgetOpened(chatId)) : null;
  }

  const handleMessageSubmit = (userInput) => {
    if (!userInput.trim()) {
      return;
    }
    handleSubmit?.(userInput);
    const msgHash = md5(userInput + (new Date()).getTime());
    const userMessage = emojiBackwardConvert(userInput);
    dispatch(addUserMessage(userMessage, msgHash, undefined, chatId));
    handleNewUserMessage(userMessage, msgHash);
  }

  const handleSendAudio = (response: string) => {
    if (!response) {
      return;
    }

    handleSubmitAudio?.(response);
    const msgHash = md5(response + (new Date()).getTime());
    const audioResponseData: AudioResponseData = JSON.parse(response) as AudioResponseData;

    dispatch(addUserAudioMessage(audioResponseData.url, msgHash, undefined, chatId));
    handleNewUserAudio?.(audioResponseData, msgHash);
  }

  const onQuickButtonClicked = (event, value) => {
    event.preventDefault();
    handleQuickButtonClicked?.(value)
  }

  const onScrollTop = () => {
    handleScrollTop?.();
  };

  return (
    <WidgetLayout
      onToggleConversation={toggleConversation}
      onSendMessage={handleMessageSubmit}
      onSendAudio={handleSendAudio}
      onQuickButtonClicked={onQuickButtonClicked}
      title={title}
      titleAvatar={titleAvatar}
      subtitle={subtitle}
      senderPlaceHolder={senderPlaceHolder}
      profileAvatar={profileAvatar}
      profileClientAvatar={profileClientAvatar}
      showCloseButton={showCloseButton}
      showMinimalizeButton={showMinimalizeButton}
      fullScreenMode={fullScreenMode}
      autofocus={autofocus}
      customLauncher={customLauncher}
      onTextInputChange={handleTextInputChange}
      chatId={chatId}
      launcherOpenLabel={launcherOpenLabel}
      launcherCloseLabel={launcherCloseLabel}
      launcherCloseImg={launcherCloseImg}
      launcherOpenImg={launcherOpenImg}
      sendButtonAlt={sendButtonAlt}
      showTimeStamp={showTimeStamp}
      imagePreview={imagePreview}
      zoomStep={zoomStep}
      showBadge={showBadge}
      resizable={resizable}
      emojis={emojis}
      emojiSet={emojiSet}
      onScrollTop={onScrollTop}
      onFocus={onFocus}
      micAllowed={micAllowed}
      uploadAudioUrl={uploadAudioUrl}
      headerBeginElement={headerBeginElement}
      smileIcon={smileIcon}
      sendIcon={sendIcon}
      isShowFileUploader={isShowFileUploader}
      isShowEmoji={isShowEmoji}
    />
  );
}

export default Widget;
