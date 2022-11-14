import React from 'react';
import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import classnames from 'classnames';

import { Message } from 'src/store/types';
import {MESSAGE_SENDER} from "../../../../../../../../constants";
import {emojiConvert} from "../../../../../../../../utils/emoji";
import {EmojiSet} from "../../../../index";
import {PostOptions} from "../../../../../../../../store/actions/types";

import './styles.scss';
const checkIcon = require('../../../../../../../../../assets/check.svg') as string;
const checkSuccessIcon = require('../../../../../../../../../assets/check-success.svg') as string;


type Props = {
  message: Message;
  showTimeStamp: boolean;
  set?: EmojiSet;
}

const renderPost = (post: PostOptions, set?: EmojiSet): React.ReactNode => {
  return (<div className="post-wrapper">
    <a href={post.link} target="_blank">
      {post.title && <span className="post-wrapper-title"><div>{post.title}</div></span>}
      {post.text && <div className={classnames(
          'post-text',
          post.imgLink && 'has-img',
      )} dangerouslySetInnerHTML={{ __html: emojiConvert(post.text, set) }} />}
      {post.imgLink && <img className="post-img" src={post.imgLink} alt="" />}
    </a>
  </div>)
};

function Message({ message, showTimeStamp, set }: Props) {
  let sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(message.text);

  const isClient = (sender) => sender === MESSAGE_SENDER.CLIENT;

  return (
    <div className={`rcw-${message.sender}`}>
      {message.post && renderPost(message.post, set)}

      {message.text && <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: emojiConvert(sanitizedHTML, set) }} />}
      {message.audioLink && <audio controls>
        <source src={message.audioLink} type="audio/wav" />
      </audio>}

      {showTimeStamp && <span className="rcw-timestamp">{format(message.timestamp, 'HH:mm')}</span>}
        {isClient(message.sender) && <span className="rcw-checks" style={{ textAlign: 'right' }}>
        {(message.delivered)
            ? <img src={checkSuccessIcon} className="rcw-message-delivered-icon" alt="delivered" title="delivered" />
            : <img src={checkIcon} className="rcw-message-delivered-icon" alt="undelivered" title="undelivered" />
        }
        {(message.unread)
            ? <img style={{ marginLeft: '3px' }} src={checkIcon} className="rcw-message-delivered-icon" alt="unread" title="unread" />
            : <img style={{ marginLeft: '3px' }} src={checkSuccessIcon} className="rcw-message-delivered-icon" alt="read" title="read" />
        }
      </span>}
    </div>
  );
}

export default Message;
