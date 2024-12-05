import {YesNoOrEmpty} from './yes-no-empty';

export type MessageType = 'info' | 'warning';

export interface Message {
  description: string,
  showOnValue: YesNoOrEmpty,
  type: MessageType
}
