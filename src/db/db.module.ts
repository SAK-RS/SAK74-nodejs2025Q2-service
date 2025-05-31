import { Global, Module } from '@nestjs/common';
import { User } from './user.entities';
import { Artist } from './artist.entities';
import { Album } from './album.entities';
import { Track } from './track.entities';
import { Favorites } from './favorites.entities';

@Global()
@Module({
  providers: [User, Artist, Album, Track, Favorites],
  exports: [User, Artist, Album, Track, Favorites],
})
export class DbModule {}
