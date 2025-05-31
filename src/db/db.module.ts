import { Global, Module } from '@nestjs/common';
import { UserDb } from './user.entities';
import { Artist } from './artist.entities';
import { Album } from './album.entities';
import { Track } from './track.entities';
import { Favorites } from './favorites.entities';

@Global()
@Module({
  providers: [UserDb, Artist, Album, Track, Favorites],
  exports: [UserDb, Artist, Album, Track, Favorites],
})
export class DbModule {}
