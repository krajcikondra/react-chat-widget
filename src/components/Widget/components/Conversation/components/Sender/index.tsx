import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from 'src/store/types';
import {emojiBackwardConvert, emojiConvert} from "../../../../../../utils/emoji";
import {getCaretIndex, isFirefox, updateCaret, insertNodeAtCaret, getSelection} from '../../../../../../utils/contentEditable'
import {Emoji, EmojiSet} from "../../index";
const send = require('../../../../../../../assets/send_button.svg') as string;
const emoji = require('../../../../../../../assets/icon-smiley.svg') as string;
const brRegex = /<br>/g;

import './style.scss';

type Props = {
  placeholder: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (msg: string) => void;
  buttonAlt: string;
  set?: EmojiSet;
  onPressEmoji: () => void;
  onChangeSize: (event: any) => void;
  onTextInputChange?: (event: any) => void;
  onEscapePressed?: () => void;
  onFocus?: () => void;
}

function Sender({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, buttonAlt, onPressEmoji, onChangeSize, onEscapePressed, onFocus, set }: Props, ref) {
  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  const inputRef = useRef<HTMLDivElement>(null!);
  const refContainer = useRef<HTMLDivElement>(null);
  const [enter, setEnter]= useState(false)
  const [firefox, setFirefox] = useState(false);
  const [height, setHeight] = useState(0)
  // @ts-ignore
  useEffect(() => { if (showChat && autofocus) inputRef.current?.focus(); }, [showChat]);
  useEffect(() => { setFirefox(isFirefox())}, [])

  useImperativeHandle(ref, () => {
    return {
      onSelectEmoji: handlerOnSelectEmoji,
    };
  });

  const handlerOnChange = (event) => {
    onTextInputChange && onTextInputChange(event)
  }

  const handlerSendMessage = () => {
    const el = inputRef.current;
    if(el.innerHTML) {
      sendMessage(emojiBackwardConvert(el.innerHTML));
      el.innerHTML = ''
    }
  }

  const getInputText = (): string => {
    const el = inputRef.current;
    return el.innerHTML;
  };

  const setInputText = (text: string): void => {
    const el = inputRef.current;
    el.innerHTML = emojiConvert(text, set);
  }

  const handlerOnSelectEmoji = (emoji: Emoji) => {
    const el = inputRef.current;
    const index = getCaretIndex(el);

    if(el.innerHTML) {
      const firstPart = el.innerHTML.substring(0, index);
      const secondPart = el.innerHTML.substring(index);

      const originLength = getInputText().length;
      const convertedEmoji = emoji.colons;
      setInputText(firstPart + convertedEmoji + secondPart);
      const emojiLen = getInputText().length - originLength;
      updateCaret(el, index, emojiLen);
    } else {
      setInputText(emoji.colons);
      updateCaret(el, 1, 0);
    }
  }

  const handlerOnKeyPress = (event) => {
    const el = inputRef.current;

    if(event.charCode == 13 && !event.shiftKey) {
      event.preventDefault()
      handlerSendMessage();
    } else if(event.charCode === 13 && event.shiftKey) {
      event.preventDefault()
      insertNodeAtCaret(el);
      setEnter(true)
    }
  }

  const checkSize = () => {
    const senderEl = refContainer.current
    if(senderEl && height !== senderEl.clientHeight) {
      const {clientHeight} = senderEl;
      setHeight(clientHeight)
      onChangeSize(clientHeight ? clientHeight -1 : 0)
    }
  }

  const isHTML = (str: string): boolean => {
    var a = document.createElement('div');
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
  }

  const isHtmlSpan = (str: string): boolean => {
    return str.substring(0, 5) === '<span' && isHTML(str);
  }

  const handlerOnKeyUp = (event) => {
    const el = inputRef.current;
    if(!el) return true;
    // Conditions need for firefox
    if(firefox && event.key === 'Backspace') {
      if(el.innerHTML.length === 1 && enter) {
        el.innerHTML = '';
        setEnter(false);
      }
      else if(brRegex.test(el.innerHTML)){
        el.innerHTML = el.innerHTML.replace(brRegex, '');
      }
    }
    checkSize();
  }

  const handlerOnKeyDown= (event) => {
    const el = inputRef.current;

    if (event.key === 'Escape') {
      event.preventDefault();
      onEscapePressed?.();
    }

    if( event.key === 'Backspace' && el){
      const caretPosition = getCaretIndex(inputRef.current);
      const character = el.innerHTML.charAt(caretPosition - 1);
      if (isHtmlSpan(el.innerHTML.substring(caretPosition - 1))) {
        event.preventDefault();
        event.stopPropagation();
        el.innerHTML = el.innerHTML.substring(0, caretPosition - 2);
        updateCaret(el, caretPosition, 1);
      } else if(character === "\n") {
        event.preventDefault();
        event.stopPropagation();
        el.innerHTML = (el.innerHTML.substring(0, caretPosition - 1) + el.innerHTML.substring(caretPosition))
        updateCaret(el, caretPosition, -1)
      }
    }
  }

  const handlerPressEmoji = () => {
    onPressEmoji();
    checkSize();
  }

  return (
    <div ref={refContainer} className="rcw-sender">
      <button className='rcw-picker-btn' type="submit" onClick={handlerPressEmoji}>
        <img src={emoji} className="rcw-picker-icon" alt="" />
      </button>
      <div className={cn('rcw-new-message', {
          'rcw-message-disable': disabledInput,
        })
      }>
        <div
          spellCheck
          className="rcw-input"
          role="textbox"
          contentEditable={!disabledInput}
          ref={inputRef}
          placeholder={placeholder}
          onInput={handlerOnChange}
          onKeyPress={handlerOnKeyPress}
          onKeyUp={handlerOnKeyUp}
          onKeyDown={handlerOnKeyDown}
          onClick={onFocus}
        />

      </div>
      <button type="submit" className="rcw-send" onClick={handlerSendMessage}>
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      </button>
    </div>
  );
}

export default forwardRef(Sender);
