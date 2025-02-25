import { type PToken } from './types';

// reasonable limits on prompter font size
export const MinFontSize = 10;
export const MaxFontSize = 200;

// reasonable limits on prompter scroll speed
export const MinScrollSpeed = 10;
export const MaxScrollSpeed = 200;

// converts the script into a list of tokens for the prompter component to work with
export function TokenizeScript(script: string): PToken[] {
  const returning: PToken[] = [];
  let id = 0;

  /**
   * DEBUG
   * Replace this with something that actually converts the script into a tokenized list
   */
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
