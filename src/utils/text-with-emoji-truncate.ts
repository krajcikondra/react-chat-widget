const truncateString = (str: string|undefined, num: number): string => {
    if (str === undefined) {
        return '';
    }

    if (str.length > num) {
        return `${str.slice(0, num)}...`;
    } else {
        return str;
    }
};

export const indexOfAll = (haystack: string, needle: string): number[] => {
    const startingIndices: number[] = [];

    let indexOccurence: number = haystack.indexOf(needle, 0);

    while (indexOccurence >= 0) {
        startingIndices.push(indexOccurence);
        indexOccurence = haystack.indexOf(needle, indexOccurence + 1);
    }

    return startingIndices;
};

export type EmojiPart = {
    emoji: string,
    startPos: number,
    endPos: number,
    length: number,
};

const findEmojiParts = (haystack: string): EmojiPart[] => {
    const regex = new RegExp(/:[^\s]*:/g);
    const usedEmoji = haystack.match(regex);
    if (!usedEmoji) {
        return [];
    }
    const emojiParts: EmojiPart[] = [];
    const uniqueEmoji = usedEmoji.filter((item, i, ar) => ar.indexOf(item) === i);
    uniqueEmoji.forEach(ue => {
        indexOfAll(haystack, ue).forEach(startPos => {
            emojiParts.push({
                emoji: ue,
                startPos,
                endPos: startPos + ue.length,
                length: ue.length,
            });
        });
    });
    return emojiParts;
};

export const isEmojiPosition = (text: string, requiredPos: number): boolean =>
    findEmojiParts(text).some(p => requiredPos > p.startPos && requiredPos <= p.endPos);

const findStartOfLastEmoji = (text: string, requiredPos: number): number => {
    const startPositions = findEmojiParts(text)
        .filter(p => p.startPos < requiredPos)
        .map(p => p.startPos)
        .sort();
    return startPositions[0];
};

export const strEmojiLen = (text: string): number => {
    const emojiLength = findEmojiParts(text)
        .reduce((prevValue, emojiPart) => (emojiPart.length - 1) + prevValue, 0);
    return text.length - emojiLength;
};

export const textWithEmojiTruncate = (textArg: string, maxLength: number): string => {
    const text = textArg ?? '';
    const emojiParts = findEmojiParts(text);
    if (emojiParts.length === 0) {
        return truncateString(text, maxLength);
    }

    if (strEmojiLen(text) <= maxLength) {
        return text;
    }

    let endIndex = 0;
    let newText: string = '';
    for (let i = maxLength; i <= text.length; i += 1) {
        newText = text.substring(0, i);
        if (strEmojiLen(newText) > maxLength) {
            endIndex = i;
            if (isEmojiPosition(text, endIndex)) {
                return `${newText.substring(0, findStartOfLastEmoji(text, endIndex))}...`;
            } else {
                return `${newText}...`;
            }
        }
    }
    return newText;
};

export const emojiTruncate = {
    textWithEmojiTruncate,
    strEmojiLen,
    isEmojiPosition,
    indexOfAll,
};
