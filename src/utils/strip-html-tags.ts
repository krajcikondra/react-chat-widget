export const stripHtmlTags = (html: string): string => {
    return html
        .replace('<br>', '\n')
        .replace('<br/>', '\n')
        .replace('<br >', '\n')
        .replace('<br />', '\n')
        .replace(/<[^>]*>?/gm, '');
};
