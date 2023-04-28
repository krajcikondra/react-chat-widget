export const stripHtmlTags = (html: string): string => {
    alert(html);
    return html
        .replace('</div>', '</div><br/>')
        .replace('<br>', '\n')
        .replace('<br/>', '\n')
        .replace('<br >', '\n')
        .replace('<br />', '\n')
        .replace(/<[^>]*>?/gm, '');
};
