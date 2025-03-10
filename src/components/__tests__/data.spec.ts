import { describe, it, expect } from 'vitest';

import { TokenizeScript } from '../data';
import type { PToken } from '../types';

describe('script parser', () => {
  it('properly converts a script into a list of tokens', () => {
    const input = `{image:id=602864342381;url=}{edit:id=YfcvHu4mdv}Mortgage rates are projected.{/edit}`;
    const expected: PToken[] = [
      {
        id: 0,
        type: 'event',
        eventType: 'switchToImage',
        eventTarget: '602864342381',
      },
      {
        id: 1,
        type: 'event',
        eventType: 'switchSection',
        eventTarget: 'YfcvHu4mdv',
      },
      {
        id: 2,
        type: 'text',
        text: 'Mortgage',
      },
      {
        id: 3,
        type: 'text',
        text: 'rates',
      },
      {
        id: 4,
        type: 'text',
        text: 'are',
      },
      {
        id: 5,
        type: 'text',
        text: 'projected.',
      },
      {
        id: 6,
        type: 'render',
        render: 'lineBreak',
      },
    ];

    expect(TokenizeScript(input)).toEqual(expected);
  });

  it('handles periods mid-paragraph', () => {
    const input = `{edit:id=YfcvHu4mdv}Mortgage rates. They exist.{/edit}`;
    const expected: PToken[] = [
      {
        id: 0,
        type: 'event',
        eventType: 'switchSection',
        eventTarget: 'YfcvHu4mdv',
      },
      {
        id: 1,
        type: 'text',
        text: 'Mortgage',
      },
      {
        id: 2,
        type: 'text',
        text: 'rates.',
      },
      {
        id: 3,
        type: 'text',
        text: 'They',
      },
      {
        id: 4,
        type: 'text',
        text: 'exist.',
      },
      {
        id: 5,
        type: 'render',
        render: 'lineBreak',
      },
    ];

    expect(TokenizeScript(input)).toEqual(expected);
  });
});
