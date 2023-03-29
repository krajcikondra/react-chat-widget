import EmojiConvertor from 'emoji-js';
import {EmojiSet} from "../components/Widget/components/Conversation";
import {emojiUtils} from "./emoji-utils";

const emojiConvertor = new EmojiConvertor();

export const emojiConvert = (sanitizedHTML: string, emojiSet?: EmojiSet): string => {
    const msgHtml = sanitizedHTML.replace(/\n$/,'');
    const _emojiSet = emojiSet ?? 'google';
    emojiConvertor.img_sets.google.sheet = '/emoji-data/sheet_' + _emojiSet + '_64.png';
    emojiConvertor.use_sheet = false;

    emojiConvertor.replace_mode = 'img';
    emojiConvertor.img_set = _emojiSet;
    emojiConvertor.include_title = true;

    const translated = emojiConvertor.replace_colons(convertOneColonEmoji(msgHtml));
    return emojiUtils.wrapEmojiByFont(replaceSpanEmojiByImgEmoji(translated));
}

export const replaceAll = (text: string, searchValue: string, replaceValue: string): string =>
    text.replace(new RegExp(searchValue, 'g'), replaceValue);

export const convertOneColonEmoji = (text: string): string => {
    text = replaceAll(text, ':-)', ':slightly_smiling_face:');
    text = replaceAll(text, ':)', ':slightly_smiling_face:');
    text = replaceAll(text, ':-D', ':grinning:');
    text = replaceAll(text, ':D', ':grinning:');
    text = replaceAll(text, ':-*', ':kissing_heart:');
    text = replaceAll(text, ':-(', ':unamused:');
    text = replaceAll(text, ':-/', ':face_with_rolling_eyes:');
    return text;
};

export const emojiBackwardConvert = (text: string): string => {
    const iterations = text.split("data-codepoints").length - 1;
    if (iterations > 0) {
        for (var i = 0; i < iterations; i++) {
            let index = text.indexOf("<img");
            let ending = text.indexOf(">") + 1;
            const emojiImage = text.substring(index, ending);

            const titleStartPos = emojiImage.indexOf("title=\"") + 7;
            const titleEndPos = emojiImage.indexOf("\"", titleStartPos);
            const emojiCodeClean = emojiImage.substring(titleStartPos, titleEndPos);

            text = text.replace(emojiImage, `:${emojiCodeClean}:`);
        }
        return text;
    }

    return text;
}

export const replaceSpanEmojiByImgEmoji = (text: string): string => {
    const iterations = text.split("data-codepoints").length - 1;
    if (iterations > 0) {
        for (let i = 0; i < iterations; i++) {
            let index = text.indexOf("<span");
            if (index === -1) {
                return text;
            }

            let ending = text.indexOf("></span>") + 8;
            const emojiSpan = text.substring(index, ending);
            let urlStartPos = text.indexOf("style=\"background-image:url(/") + 28;
            const urlEndPos = text.indexOf(")\"");

            const codePointsStartPos = text.indexOf("data-codepoints=\"", index) + 17;
            const codePointsEndPos = text.indexOf("\"", codePointsStartPos);
            const codePoints = text.substring(codePointsStartPos, codePointsEndPos);

            const titleStartPos = text.indexOf("title=\"", index) + 7;
            const titleEndPos = text.indexOf("\"", titleStartPos);
            const title = text.substring(titleStartPos, titleEndPos);

            const imgUrl = text.substring(urlStartPos, urlEndPos);
            const img = "<img class=\"emoji emoji-sizer\" src=\"" + imgUrl + "\" title=\"" + title + "\" data-codepoints=\"" + codePoints + "\" />";

            text = text.replace(emojiSpan, img);
        }
    }
    return text;
};
