export const enum StatusOption {
  Running = 'Running',
  Stopped = 'Stopped',
}

export interface PrompterStatus {
  status: StatusOption; // running or stopped
  feed: string; // camera, image, etc
  section: string; // name of the current text section
}

type EventWithDetails = {
  event: 'switchToCamera' | 'switchToImage' | 'switchSection';
  target: string;
};

type EventWithoutDetails = {
  event: 'startPlayback' | 'stopPlayback' | 'resetPlayback';
};

export type PrompterEvent = {} & (EventWithDetails | EventWithoutDetails);

type tokenBase = {
  id: number; // present to help Vue maintain state
};

type textToken = {
  type: 'text';
  text: string;
};

type eventToken = {
  type: 'event';
  eventType: PrompterEvent['event'];
  eventTarget: string;
};

type renderToken = {
  type: 'render';
  render: 'lineBreak';
};

export type PToken = tokenBase & (textToken | eventToken | renderToken);
