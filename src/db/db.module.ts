import { Global, Module } from '@nestjs/common';
import { UserDb } from './user.entities';
import { ArtistDb } from './artist.entities';
import { AlbumDb } from './album.entities';
import { TrackDb } from './track.entities';
import { FavoritesDb } from './favorites.entities';

@Global()
@Module({
  providers: [UserDb, ArtistDb, AlbumDb, TrackDb, FavoritesDb],
  exports: [UserDb, ArtistDb, AlbumDb, TrackDb, FavoritesDb],
})
export class DbModule {}
