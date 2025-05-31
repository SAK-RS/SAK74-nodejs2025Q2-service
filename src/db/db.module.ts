import { Global, Module } from '@nestjs/common';
import { UserDb } from './user.entities';
import { ArtistDb } from './artist.entities';
import { Album } from './album.entities';
import { Track } from './track.entities';
import { Favorites } from './favorites.entities';

@Global()
@Module({
  providers: [UserDb, ArtistDb, Album, Track, Favorites],
  exports: [UserDb, ArtistDb, Album, Track, Favorites],
})
export class DbModule {}
