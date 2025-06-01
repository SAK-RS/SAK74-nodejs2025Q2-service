import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { FavoritesDb } from 'src/db/favorites.entities';
import { FavoriteResponse, MemberType } from './schemas';
import { ArtistDb } from 'src/db/artist.entities';
import { AlbumDb } from 'src/db/album.entities';
import { TrackDb } from 'src/db/track.entities';

@Injectable()
export class FavsService {
  constructor(
    private favs: FavoritesDb,
    private artists: ArtistDb,
    private albums: AlbumDb,
    private tracks: TrackDb,
  ) {}
  addToFav(member: MemberType, id: string) {
    this.favs.addTo(member, id);
  }

  removeFromFav(member: MemberType, id: string) {
    this.favs.removeFrom(member, id);
  }

  findAll(): FavoriteResponse {
    const favIdxs = this.favs.findAll();
    return {
      artists: favIdxs.artists.map((idx) => this.artists.findOne(idx)),
      albums: favIdxs.albums.map((idx) => this.albums.findOne(idx)),
      tracks: favIdxs.tracks.map((idx) => this.tracks.findOne(idx)),
    };
  }
}
