import React, {ReactElement, ReactNode} from 'react';
import { Provider } from 'react-redux';

import Widget, {AudioResponseData} from './components/Widget';
import {EmojiSet} from './components/Widget/components/Conversation';
import {Message} from '@types';

import store from  './store';
import {AnyFunction} from './utils/types';

type Props = {
  handleNewUserMessage: (msg: string, hash: string) => void;
  handleNewUserAudio: (audioData: AudioResponseData, msgHash: string) => void;
  handleNewUserImage: (audioData: any, msgHash: string) => void;
  handleQuickButtonClicked?: (value: string) => void;
  handleScrollTop?(): void;
  handleOnFocus?(chatId?: string): void;
  onImageClick?(url: string): void;
  onRemoveMessage?(message: Message): void;
  title?: string;
  titleAvatar?: string;
  subtitle?: string;
  senderPlaceHolder?: string;
  showCloseButton?: boolean;
  showMinimalizeButton?: boolean;
  fullScreenMode?: boolean;
  autofocus?: boolean;
  profileAvatar?: string;
  profileClientAvatar?: string;
  launcher?: AnyFunction|null;
  handleTextInputChange?: (event: any) => void;
  chatId?: string;
  handleToggle?: AnyFunction;
  launcherOpenLabel?: string,
  launcherCloseLabel?: string,
  launcherCloseImg?: string,
  launcherOpenImg?: string,
  sendButtonAlt?: string;
  showTimeStamp?: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  emojis?: boolean;
  emojiSet?: EmojiSet;
  micAllowed?: boolean;
  uploadAudioUrl?: string;
  uploadImageUrl?: string;
  handleSubmit?: AnyFunction;
  showBadge?: boolean;
  resizable?: boolean;
  maxOpenWidgets?: number;
  headerBeginElement?: ReactElement;
  sendIcon?: ReactNode;
  smileIcon?: ReactNode;
} & typeof defaultProps;

function ConnectedWidget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  showMinimalizeButton,
  fullScreenMode,
  autofocus,
  profileAvatar,
  profileClientAvatar,
  launcher,
  handleNewUserMessage,
  handleNewUserAudio,
  handleNewUserImage,
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
  handleOnFocus,
  micAllowed,
  uploadAudioUrl,
  uploadImageUrl,
  headerBeginElement,
  sendIcon,
  smileIcon,
  onImageClick,
  onRemoveMessage,
}: Props) {
  const isNextJs = typeof window === 'undefined';
  if (isNextJs) {
    return null;
  }

  return (
    <Provider store={store}>
      <>
        {!isNextJs && <Widget
            title={title}
            titleAvatar={titleAvatar}
            subtitle={subtitle}
            handleNewUserMessage={handleNewUserMessage}
            handleNewUserAudio={handleNewUserAudio}
            handleNewUserImage={handleNewUserImage}
            handleQuickButtonClicked={handleQuickButtonClicked}
            senderPlaceHolder={senderPlaceHolder}
            profileAvatar={profileAvatar}
            profileClientAvatar={profileClientAvatar}
            showCloseButton={showCloseButton}
            showMinimalizeButton={showMinimalizeButton}
            fullScreenMode={fullScreenMode}
            autofocus={autofocus}
            customLauncher={launcher}
            handleTextInputChange={handleTextInputChange}
            chatId={chatId}
            handleToggle={handleToggle}
            launcherOpenLabel={launcherOpenLabel}
            launcherCloseLabel={launcherCloseLabel}
            launcherCloseImg={launcherCloseImg}
            launcherOpenImg={launcherOpenImg}
            sendButtonAlt={sendButtonAlt}
            showTimeStamp={showTimeStamp}
            imagePreview={imagePreview}
            zoomStep={zoomStep}
            handleSubmit={handleSubmit}
            showBadge={showBadge}
            resizable={resizable}
            emojis={emojis}
            emojiSet={emojiSet}
            maxOpenWidgets={maxOpenWidgets}
            handleScrollTop={handleScrollTop}
            onFocus={handleOnFocus}
            micAllowed={micAllowed}
            uploadAudioUrl={uploadAudioUrl}
            uploadImageUrl={uploadImageUrl}
            headerBeginElement={headerBeginElement}
            sendIcon={sendIcon}
            smileIcon={smileIcon}
            onImageClick={onImageClick}
            onRemoveMessage={onRemoveMessage}
        />}
      </>
    </Provider>
  );
}

const defaultProps = {
  title: 'Welcome',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  autofocus: true,
  chatId: 'rcw-chat-container',
  launcherOpenLabel: 'Open chat',
  launcherCloseLabel: 'Close chat',
  launcherOpenImg: '',
  launcherCloseImg: '',
  sendButtonAlt: 'Send',
  showTimeStamp: true,
  imagePreview: false,
  zoomStep: 80,
  showBadge: true,
};
ConnectedWidget.defaultProps = defaultProps;

export default ConnectedWidget;
