import { Album } from 'src/album/schemas';
import { Artist } from 'src/artist/schemas';
import { Track } from 'src/track/schemas';

export type Favorites = {
  artists: string[];
  albums: string[];
  tracks: string[];
};

export type FavoriteResponse = {
  [k in keyof Favorites]: Array<
    k extends 'artists' ? Artist : k extends 'albums' ? Album : Track
  >;
};

export type MemberType = keyof Favorites extends `${infer R}s` ? R : null;
