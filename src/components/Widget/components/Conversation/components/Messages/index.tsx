import React, {
  useEffect,
  useRef,
  useState,
  ElementRef,
  ImgHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import format from 'date-fns/format';

import {scrollBottomTo, scrollToBottom} from '../../../../../../utils/messages';
import { setBadgeCount, markAllMessagesRead } from '../../../../../../store/actions';
import { MESSAGE_SENDER } from '../../../../../../constants';
import { Message, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';

import Loader from './components/Loader';
import './styles.scss';
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {EmojiSet} from "../../index";

type Props = {
  chatId: string,
  showTimeStamp: boolean,
  profileAvatar?: string|ReactElement;
  profileClientAvatar?: string|ReactElement;
  set?: EmojiSet;
  onScrollTop(): void;
}

const compareMessage = (msg, secondMsg): boolean => {
  return msg.text === secondMsg.text && msg.sender === secondMsg.sender && msg.type === secondMsg.type;
};

function Messages({ profileAvatar, profileClientAvatar, showTimeStamp, chatId, onScrollTop, set }: Props) {
  const dispatch = useDispatch();
  const { messages, typing, showChat, badgeCount } = useSelector((state: GlobalState) => ({
    messages: state.messages.messages,
    badgeCount: state.messages.badgeCount,
    typing: state.behavior.messageLoader,
    showChat: state.behavior.showChat
  }));
  const [lastChatHeight, setLastChatHeight] = useState(0);
  const [oldestMessage, setOldestMessage] = useState(null);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [lastMessageToScroll, setLastMessageToScroll] = useState<any|null>(null);

  const isChatVisible: boolean = showChat.includes(chatId);

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-ignore
    if (lastMessageCount !== messages.length) {
      if (oldestMessage !== null && (!messages[0] || !compareMessage(oldestMessage, messages[0]))) {
        if (messageRef && messageRef.current) {
          messageRef.current.scrollTo(0, messageRef.current.scrollHeight - lastChatHeight);
        }
      } else {
        scrollToBottom(messageRef.current);
      }
    }


    // if (isChatVisible && badgeCount) dispatch(markAllMessagesRead());
    // else dispatch(setBadgeCount(messages.filter((message) => message.unread).length));

    if (messages.length > 0) {
      setOldestMessage(messages[0] as any);
    }

    if (messageRef.current) {
      setLastChatHeight(messageRef.current.scrollHeight);
    }

    setLastMessageCount(messages.length);
  }, [messages, badgeCount, isChatVisible, chatId]);

  const getComponentToRender = (message: Message | Link | CustomCompMessage) => {
    const ComponentToRender = message.component;
    if (message.type === 'component') {
      return <ComponentToRender {...message.props} set={set} />;
    }
    return <ComponentToRender message={message} showTimeStamp={showTimeStamp} set={set} />;
  };

  // TODO: Fix this function or change to move the avatar to last message from response
  // const shouldRenderAvatar = (message: Message, index: number) => {
  //   const previousMessage = messages[index - 1];
  //   if (message.showAvatar && previousMessage.showAvatar) {
  //     dispatch(hideAvatar(index));
  //   }
  // }

  const isClient = (sender) => sender === MESSAGE_SENDER.CLIENT;
  const getChatMessages = (): any[] => {
    if (!messages) {
      return [];
    }

    if (!chatId) {
      return messages;
    }

    return messages.filter(ch => ch.chatId === chatId);
  };

  let loadingNewMessages = false;
  const [lastScrollMessages, setLastScrollMessages] = useState<any[]|null>(null);

  const scroll = (e) => {
    if (lastScrollMessages === null) {
      setLastScrollMessages([]);
      return;
    }

    if (e.target.scrollTop === 0) {
      if (!lastMessageToScroll || !messages[0] || !compareMessage(messages[0], lastMessageToScroll)) {
        onScrollTop();
        setLastMessageToScroll(messages[0]);
      }

      setLastScrollMessages(getChatMessages());
    }
  };

  useEffect(() => {
    loadingNewMessages = true;
  }, [getChatMessages()]);

  return (
    <div id={"messages-" + chatId} className="rcw-messages-container" ref={messageRef} onScroll={scroll}>
      {getChatMessages().map((message, index) => {
        const renderAvatar = (avatar?: string|ReactElement): ReactNode => {
          if (avatar === undefined) {
            return null;
          }

          if (typeof avatar === 'string') {
            return (
                <img
                    src={avatar}
                    className={`rcw-avatar ${isClient(message.sender) ? 'rcw-avatar-client' : ''}`}
                    alt="profile"
                />
            );
          }
          return avatar;
        };

        return (
            <div className={`rcw-message ${isClient(message.sender) ? 'rcw-message-client' : ''}`}
                 key={`${index}-${format(message.timestamp, 'hh:mm')}`}>
              {((profileAvatar && !isClient(message.sender)) || (profileClientAvatar && isClient(message.sender))) &&
              message.showAvatar && renderAvatar(isClient(message.sender) ? profileClientAvatar : profileAvatar)}
              {getComponentToRender(message)}
            </div>
        )
      })}
      <Loader typing={typing} />
    </div>
  );
}

export default Messages;
