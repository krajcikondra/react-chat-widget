export const stripHtmlTags = (html: string): string => {
    let _html = html.replaceAll('<div>', '<div><br/>');
    if (_html.startsWith('<br/>')) {
        _html = _html.substring(5);
    } else if (_html.startsWith('<div><br/>')) {
        _html = "<div>" + _html.substring(10);
    }

    return _html
        .replaceAll('<br>', '\n')
        .replace('<br/>', '\n')
        .replace('<br >', '\n')
        .replace('<br />', '\n')
        .replace(/<[^>]*>?/gm, '');
};
