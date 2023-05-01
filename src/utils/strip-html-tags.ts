import {replaceAll, replaceAllRegex} from "./emoji";

export const stripHtmlTags = (html: string): string => {
    let _html = replaceAll(html, '<div>', '<div><br/>');
    if (_html.startsWith('<br/>')) {
        _html = _html.substring(5);
    } else if (_html.startsWith('<div><br/>')) {
        _html = "<div>" + _html.substring(10);
    }

    _html = replaceAll(_html, '<br>', '\n');
    _html = replaceAll(_html, '<br/>', '\n');
    _html = replaceAll(_html, '<br >', '\n');
    _html = replaceAll(_html, '<br />', '\n');
    const regex = /<[^>]*>?/gm;
    return replaceAllRegex(_html, regex, '');
};
