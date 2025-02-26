import { type PrompterEvent, type PToken } from './types';

// converts the script into a list of tokens for the prompter component to work with
export function TokenizeScript(script: string): PToken[] {
  const returning: PToken[] = [];

  let lastIdx = 0;

  for (let i = 0; i < script.length; i++) {
    const letter = script[i];

    if (letter === '{') {
      // set the starting index for this tag
      lastIdx = i;
    } else if (letter === '}') {
      // grab the tag and send it off for processing
      const tag = script.slice(lastIdx, i + 1);
      lastIdx = i + 1;

      returning.push(parseEventTag(tag, returning.length));
    } else if (letter === ' ' || letter === '.') {
      // text-only tags end with either a word break or a period. This will break if there are sentences that end without a period, ie: "projected{/edit}"
      const tag = script.slice(lastIdx, i + 1);
      lastIdx = i + 1;

      returning.push({
        id: returning.length,
        type: 'text',
        text: tag.trim(), // remove whitespace, we're already accounting for it in the css for the prompter
      });
    }
  }

  return returning;
}

function parseEventTag(tag: string, id: number): PToken {
  if (tag.startsWith('{/')) {
    // all end tags are the same, since we're only using them for line breaks for now
    return {
      type: 'event',
      eventType: 'lineBreak',
      eventTarget: '', // isn't used but still required
      id,
    };
  } else {
    const tagData = tag
      .replace(/{|}/gim, '') // strip the tag markers, we just want the data
      .split(';')[0]; // some tags have extra data after a semicolon, we don't need that at this time, so strip it out

    // tags have the type and target separated by a colon
    const [tagType, tagTarget] = tagData.split(':');

    return {
      type: 'event',
      eventType: getEventNameFromTag(tagType),
      eventTarget: tagTarget.split('=')[1], // remove the "id=" from the target
      id,
    };
  }
}

function getEventNameFromTag(str: string): PrompterEvent['event'] {
  switch (str) {
    default:
    case 'edit':
      return 'switchSection';
    case 'image':
      return 'switchToImage';
    case 'camera':
      return 'switchToCamera';
  }
}

/**
 * DEBUG DATA - TESTING ONLY
 */
function getDebugScriptData() {
  const returning: PToken[] = [];
  let id = 0;

  returning.push({
    type: 'event',
    id: id++,
    eventType: 'switchSection',
    eventTarget: 'id:asdffghjkl',
  });

  for (let i = 0; i < 50; i++) {
    returning.push({
      type: 'text',
      id: id++,
      text: 'tomato' + i,
    });

    if (i % 5 === 0) {
      const temp = id++;
      returning.push({
        type: 'event',
        id: temp,
        eventType: 'switchSection',
        eventTarget: 'id:' + temp,
      });
    }
  }

  return returning;
}

/**
 * DEBUG DATA - TESTING ONLY
 */
function getDebugScriptData2() {
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
      text: 'projected',
    },
  ];

  return expected;
}

// Sample script copied from assignment pdf
export const sampleScript = `
{edit:id=intro}What’s in store for the housing market in twenty-twenty-five? Lemme break
it down for ya.{/edit}

{image:id=602864342381;url=}{edit:id=YfcvHu4mdv}Mortgage rates are projected to
come down, but don’t expect to see the return of three-percent.{/edit}

{edit:id=LhDl3r6ftf}Experts say they’ll likely settle in the mid-to-low six-percent range by
the end of the year. But that’s all gonna depend on inflation, the economy, and a bunch of
other economic factors.{/edit}

{edit:id=vF8PtaYt7K}As for home prices, don’t count on a drop. Experts say prices will rise
by about three-percent in most places.{/edit}

{edit:id=8S5MvK2O9z}That’s because there still aren’t enough homes for all the buyers
out there – even though inventory is growing. Of course, this’ll vary by area too.{/edit}

{camera:id=mN5FA4XMuR}{edit:id=knu_BgTB5X}I know you were probably hoping for a
steep drop in rates – but here’s the thing. Rates coming down at all, helps your bottom
line. Even if it’s just a little bit.{/edit}

{edit:id=outro}And slower price growth isn’t bad either. It means any home you buy – or
own – should go up in value in the year ahead.{/edit}
`;
