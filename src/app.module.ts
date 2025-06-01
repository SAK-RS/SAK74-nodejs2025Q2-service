import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    ConfigModule.forRoot(),
    DbModule,
    FavsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
