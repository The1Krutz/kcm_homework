export const enum StatusOption {
  Running = 'Running',
  Stopped = 'Stopped',
}

export interface PrompterStatus {
  status: StatusOption // running or stopped
  feed: string // camera, image, etc
}

export const enum EventName {
  Start = 'Start',
  Stop = 'Stop',
  Reset = 'Reset',
}
