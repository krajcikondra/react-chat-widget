import React, {ReactElement, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import { toggleChat, addUserMessage } from '../../store/actions';
import {isWidgetOpened, setMaxOpenWidgets} from '../../store/dispatcher';
import { AnyFunction } from '../../utils/types';

import WidgetLayout from './layout';
import {EmojiSet} from "./components/Conversation";
import {md5} from "../../utils/hash-generator";
import {emojiBackwardConvert} from "../../utils/emoji";

type Props = {
  title: string | ReactElement;
  titleAvatar?: string;
  subtitle: string;
  senderPlaceHolder: string;
  profileAvatar?: string;
  profileClientAvatar?: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction|null;
  handleNewUserMessage: AnyFunction;
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
  showBadge?: boolean;
  resizable?: boolean;
  emojis?: boolean;
  emojiSet?: EmojiSet;
  maxOpenWidgets?: number;
  handleScrollTop?(): void;
  onFocus?(chatId?: string): void;
}

function Widget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  profileAvatar,
  profileClientAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  handleNewUserMessage,
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
  showBadge,
  resizable,
  emojis,
  emojiSet,
  maxOpenWidgets,
  handleScrollTop,
  onFocus,
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
      onQuickButtonClicked={onQuickButtonClicked}
      title={title}
      titleAvatar={titleAvatar}
      subtitle={subtitle}
      senderPlaceHolder={senderPlaceHolder}
      profileAvatar={profileAvatar}
      profileClientAvatar={profileClientAvatar}
      showCloseButton={showCloseButton}
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
    />
  );
}

export default Widget;
