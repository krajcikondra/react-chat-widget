import Picker from "@emoji-mart/react";
import React from "react";
import data from '@emoji-mart/data/sets/14/google.json'

export type EmojiSet = 'apple' | 'google' | 'twitter' | 'facebook';

interface Props {
    onEmojiSelect: (event: any) => void;
    onClickOutside?: () => void;
    set?: EmojiSet;
    pickerOffset?: number;
    style?: any;
}

export const EmojiPicker = ({onEmojiSelect, set, pickerOffset, style, onClickOutside}: Props) => <Picker
    data={data}
    style={style ? style : { position: 'absolute', bottom: pickerOffset, left: '0', width: '100%' }}
    onEmojiSelect={onEmojiSelect}
    set={set ?? undefined}
    onClickOutside={onClickOutside}
/>;
