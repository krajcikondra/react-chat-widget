import React from 'react';
import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { Message } from 'src/store/types';

import './styles.scss';
import {MESSAGE_SENDER} from "../../../../../../../../constants";
import {emojiConvert} from "../../../../../../../../utils/emoji";
import {EmojiSet} from "../../../../index";
const checkIcon = require('../../../../../../../../../assets/check.svg') as string;
const checkSuccessIcon = require('../../../../../../../../../assets/check-success.svg') as string;


type Props = {
  message: Message;
  showTimeStamp: boolean;
  set?: EmojiSet;
}

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
      <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: emojiConvert(sanitizedHTML, set) }} />
      {showTimeStamp && <span className="rcw-timestamp">{format(message.timestamp, 'hh:mm')}</span>}
        {isClient(message.sender) && <span style={{ textAlign: 'right' }}>
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
