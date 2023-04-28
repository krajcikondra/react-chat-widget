export const stripHtmlTags = (html: string): string => {
    alert(html);
    return html
        .replace('<br>', '\n')
        .replace('<br/>', '\n')
        .replace('<br >', '\n')
        .replace('<br />', '\n')
        .replace(/<[^>]*>?/gm, '');
};
