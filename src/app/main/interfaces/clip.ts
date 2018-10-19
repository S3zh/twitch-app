export interface Clip {
  broadcast_id: string;
  broadcaster: {
    channel_url: string;
    display_name: string;
    id: string;
    logo: string;
    name: string;
  };
  created_at: string;
  curator: {
    channel_url: string;
    display_name: string;
    id: string;
    logo: string;
    name: string;
  };
  duration: number;
  embed_html: string;
  embed_url: string;
  game: string;
  language: string;
  slug: string;
  thumbnails: {
    medium: string;
    small: string;
    tiny: string;
  };
  title: string;
  tracking_id: string;
  url: string;
  views: number;
  vod: string;
}
