import 'ts-replace-all';
import { stripHtmlTags } from './strip-html-tags';

describe('Strip html tags', () => {
  it('emojiConvert and emojiBackwardConvert', () => {
    expect(stripHtmlTags('<strong>Hi</strong>')).toEqual('Hi');
    expect(stripHtmlTags('<strong>Hi,<br /> how are you?</strong>')).toEqual('Hi,\n how are you?');
    expect(stripHtmlTags('<strong>Hi,<br/> how are you?</strong>')).toEqual('Hi,\n how are you?');
    expect(stripHtmlTags('<strong>Hi,<br> how are you?</strong>')).toEqual('Hi,\n how are you?');
    expect(stripHtmlTags('<strong>Hi,<br > how are you?</strong>')).toEqual('Hi,\n how are you?');
    expect(stripHtmlTags('<div>Hi,</div><div>how are you?</div>')).toEqual('Hi,\nhow are you?');
    expect(stripHtmlTags('Test<div>Test</div><div>Test</div>')).toEqual('Test\nTest\nTest');
  });
});
