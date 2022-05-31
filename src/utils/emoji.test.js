import 'ts-replace-all';

import { emojiBackwardConvert, emojiConvert } from './emoji';

describe('Emoji convert', () => {
  it('emojiConvert and emojiBackwardConvert', () => {
    const text =
      'Hi <img class="emoji emoji-sizer" src="/emoji-data/img-google-64/1f60d.png" ' +
      'title="heart_eyes" data-codepoints="1f60d" />';

    const textUnconverted = emojiBackwardConvert(text);
    expect(textUnconverted).toEqual('Hi :heart_eyes:');

    const textConverted = emojiConvert(textUnconverted);
    expect(textConverted).toEqual(
      'Hi <img src="/emoji-data/img-google-64/1f60d.png" class="emoji" data-codepoints="1f60d"  title="heart_eyes"/>'
    );
  });

  it('emojiConvert and emojiBackwardConvert', () => {
    const textUnconverted = 'Hi :heart_eyes: :heart_eyes: :heart_eyes:';
    expect(emojiConvert(textUnconverted)).toEqual('Hi <img src="/emoji-data/img-google-64/1f60d.png" class="emoji" data-codepoints="1f60d"  title="heart_eyes"/> <img src="/emoji-data/img-google-64/1f60d.png" class="emoji" data-codepoints="1f60d"  title="heart_eyes"/> <img src="/emoji-data/img-google-64/1f60d.png" class="emoji" data-codepoints="1f60d"  title="heart_eyes"/>');
  });
});
