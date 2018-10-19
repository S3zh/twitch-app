export interface Game {
  channels: number;
  game: {
    _id: number;
    box: {
      large: string;
      medium: string;
      small: string;
      template: string;
    };
    giantbomb_id: number;
    locale: string;
    localized_name: string;
    logo: {
      large: string;
      medium: string;
      small: string;
      template: string;
    };
    name: string;
    popularity: number;
  };
  viewers: number;
}
