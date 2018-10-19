import { Channel } from './channel';

export interface FollowResponse {
  created_at: string;
  notification: boolean;
  channel: Channel;
}
