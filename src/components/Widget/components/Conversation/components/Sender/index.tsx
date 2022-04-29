import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import cn from 'classnames';

import {emojiBackwardConvert, emojiConvert} from "../../../../../../utils/emoji";
import {getCaretIndex, isFirefox, updateCaret, insertNodeAtCaret, getSelection} from '../../../../../../utils/contentEditable'
import {Emoji, EmojiSet} from "../../index";
const send = require('../../../../../../../assets/send_button.svg') as string;
const mic = require('../../../../../../../assets/mic.png') as string;
const emoji = require('../../../../../../../assets/icon-smiley.svg') as string;
import {IRecordingRef, Recording} from "../../../../../../audio-recorder/Recording";
const brRegex = /<br>/g;

import './style.scss';

type Props = {
  placeholder: string;
  className?: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (msg: string) => void;
  sendAudio?: (response: string) => void;
  buttonAlt: string;
  set?: EmojiSet;
  showChat?: string[];
  onPressEmoji: () => void;
  onChangeSize: (event: any) => void;
  onTextInputChange?: (event: any) => void;
  onEscapePressed?: () => void;
  onFocus?: () => void;
  disableSendSubmit?: boolean;
  micAllowed?: boolean;
}

function Sender({
  sendMessage,
  showChat,
  placeholder,
  disabledInput,
  autofocus,
  onTextInputChange,
  buttonAlt,
  onPressEmoji,
  onChangeSize,
  onEscapePressed,
  onFocus,
  set,
  disableSendSubmit,
  className,
  micAllowed,
  sendAudio,
}: Props, ref) {
  const inputRef = useRef<HTMLDivElement>(null!);
  const refContainer = useRef<HTMLDivElement>(null);
  const recordingRef = useRef<IRecordingRef>(null);
  const [enter, setEnter]= useState(false)
  const [firefox, setFirefox] = useState(false);
  const [height, setHeight] = useState(0)
  const [isAudioUploading, setAudioUploading] = useState(false);

  // @ts-ignore
  useEffect(() => { if (showChat && autofocus) inputRef.current?.focus(); }, [showChat]);
  useEffect(() => { setFirefox(isFirefox())}, [])

  useImperativeHandle(ref, () => {
    return {
      onSelectEmoji: handlerOnSelectEmoji,
      setHtml: handlerSetHtml,
      getHtml: getInputText,
    };
  });

  const handlerOnChange = (event) => {
    onTextInputChange && onTextInputChange(event)
  }

  const upload = (audioBlob: Blob) => {
    return fetch(`https://cocaino.test/api/file/upload-sound-blob`, {method:"POST", body: audioBlob})
        .then(response => {
          if (response.ok) return response;
          else throw Error(`Server returned ${response.status}: ${response.statusText}`)
        })
        .then(async response => {
          setAudioUploading(false);
          const responseText = await response.text();
          sendAudio?.(responseText);
        })
        .catch(err => {
          setAudioUploading(false);
          alert(err);
        });
  }

  const handlerSendMessage = () => {
    if (isMicActive) {
      if (recordingRef.current?.getStatus() === 'recording') {
        recordingRef.current?.stopRecording().then(audioBlob => {
          setAudioUploading(true);
          upload(audioBlob).then(() => {
            setMicActive(false);
          });
        });
        return;
      }

      const audioBlob = recordingRef.current?.getAudioResult();
      if (!audioBlob) {
        return;
      }

      setAudioUploading(true);
      upload(audioBlob);
      return;
    }

    const el = inputRef.current;
    if (el.innerHTML) {
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

  const handlerOnSelectEmoji = (emoji: Emoji): string => {
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
    return el.innerHTML;
  }

  const handlerSetHtml = (html: string): void => {
    setInputText(html);
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

  const [isMicActive, setMicActive] = useState(false);

  return (
    <div ref={refContainer} className={cn("rcw-sender", className)}>
      {!isMicActive && <button className='rcw-picker-btn' type="button" onClick={handlerPressEmoji}>
        <img src={emoji} className="rcw-picker-icon" alt="" />
      </button>}
      {isMicActive ? <Recording
          uploading={isAudioUploading}
          ref={recordingRef}
          onDoneRecord={() => setMicActive(false)}
      /> : <div className={cn('rcw-new-message', {
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
      </div>}
      {(micAllowed && !isMicActive) && <button className="rcw-mic" onClick={() => setMicActive(!isMicActive)}>
        <img src={mic} alt="" className="rcw-mic-icon" />
      </button>}
      {!disableSendSubmit && <button type="submit" className="rcw-send" onClick={handlerSendMessage} disabled={isAudioUploading}>
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      </button>}
    </div>
  );
}

export default forwardRef(Sender);
