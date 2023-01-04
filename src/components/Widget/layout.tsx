import React, {ReactElement, ReactNode, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';
import { openFullscreenPreview } from '@actions';

import Conversation, {EmojiSet} from './components/Conversation';
import Launcher from './components/Launcher';
import FullScreenPreview from './components/FullScreenPreview';

import './style.scss';

type Props = {
  title: string|ReactElement;
  titleAvatar?: string;
  subtitle: string;
  onSendMessage: AnyFunction;
  onSendAudio?: AnyFunction;
  onToggleConversation: AnyFunction;
  senderPlaceHolder: string;
  onQuickButtonClicked: AnyFunction;
  profileAvatar?: string|ReactElement;
  profileClientAvatar?: string|ReactElement;
  showCloseButton: boolean;
  showMinimalizeButton?: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction|null;
  onTextInputChange?: (event: any) => void;
  chatId: string;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  launcherCloseImg: string;
  launcherOpenImg: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  showBadge?: boolean;
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
}

function WidgetLayout({
  title,
  titleAvatar,
  subtitle,
  onSendMessage,
  onSendAudio,
  onToggleConversation,
  senderPlaceHolder,
  onQuickButtonClicked,
  profileAvatar,
  profileClientAvatar,
  showCloseButton,
  showMinimalizeButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  onTextInputChange,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  launcherCloseImg,
  launcherOpenImg,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  showBadge,
  resizable,
  emojis,
  emojiSet,
  onScrollTop,
  onFocus,
  micAllowed,
  uploadAudioUrl,
  headerBeginElement,
  smileIcon,
  sendIcon,
  isShowFileUploader,
  isShowEmoji,
  onImageClick,
}: Props) {
  const dispatch = useDispatch();
  const { dissableInput, showChat, visible } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    dissableInput: state.behavior.disabledInput,
    visible: state.preview.visible,
  }));

  const isChatVisible: boolean = showChat.includes(chatId);
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(isChatVisible) {
      messageRef.current = document.getElementById('messages-' + chatId) as HTMLDivElement;
    }
    return () => {
      messageRef.current = null;
    }
  }, [isChatVisible])

  const eventHandle = evt => {
    if(evt.target && evt.target.className === 'rcw-message-img') {
      const { src, alt, naturalWidth, naturalHeight } = (evt.target as HTMLImageElement);
      const obj = {
        src: src,
        alt: alt,
        width: naturalWidth,
        height: naturalHeight,
      };
      dispatch(openFullscreenPreview(obj))
    }
  }

  /**
   * Previewer needs to prevent body scroll behavior when fullScreenMode is true
   */
  useEffect(() => {
    const target = messageRef?.current;
    if(imagePreview && isChatVisible) {
      target?.addEventListener('click', eventHandle, false);
    }

    return () => {
      target?.removeEventListener('click', eventHandle);
    }
  }, [imagePreview, isChatVisible]);

  useEffect(() => {
    document.body.setAttribute('style', `overflow: ${visible || fullScreenMode ? 'hidden' : 'auto'}`)
  }, [fullScreenMode, visible])

  const openChatPos = isChatVisible ? showChat.indexOf(chatId) : undefined;

  const renderLauncher = () => {
    return (customLauncher ?
      customLauncher(onToggleConversation) :
      !fullScreenMode &&
      <Launcher
          toggle={onToggleConversation}
          chatId={chatId}
          openLabel={launcherOpenLabel}
          closeLabel={launcherCloseLabel}
          closeImg={launcherCloseImg}
          openImg={launcherOpenImg}
          showBadge={showBadge}
      />)
  };

  return (
    <div
      className={cn('rcw-widget-container', {
        'rcw-full-screen': fullScreenMode,
        'rcw-previewer': imagePreview,
        'rcw-close-widget-container ': !isChatVisible
        })
      }
    >
      {isChatVisible &&
        <Conversation
          chatId={chatId}
          title={title}
          subtitle={subtitle}
          sendMessage={onSendMessage}
          sendAudio={onSendAudio}
          senderPlaceHolder={senderPlaceHolder}
          profileAvatar={profileAvatar}
          profileClientAvatar={profileClientAvatar}
          toggleChat={onToggleConversation}
          showCloseButton={showCloseButton}
          showMinimalizeButton={showMinimalizeButton}
          disabledInput={dissableInput}
          autofocus={autofocus}
          titleAvatar={titleAvatar}
          className={isChatVisible ? `active open-chat-${openChatPos}` : 'hidden'}
          onQuickButtonClicked={onQuickButtonClicked}
          onTextInputChange={onTextInputChange}
          sendButtonAlt={sendButtonAlt}
          showTimeStamp={showTimeStamp}
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
          onImageClick={onImageClick}
        />
      }
      {customLauncher !== null && renderLauncher()}
      {
        imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />
      }
    </div>
  );
}

export default WidgetLayout;
