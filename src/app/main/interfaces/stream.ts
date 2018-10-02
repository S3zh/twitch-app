import { Channel } from './channel';

export interface Stream {
  average_fps: number;
  channel: Channel;
  created_at: string;
  delay: number;
  game: string;
  is_playlist: boolean;
  preview: {
    large: string;
    medium: string;
    small: string;
    template: string;
  };
  stream_type: string;
  video_height: number;
  viewers: number;
  _id: number;
}
