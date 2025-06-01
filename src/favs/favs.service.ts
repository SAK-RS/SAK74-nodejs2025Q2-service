import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    if (!this.isEntityExist(member, id)) {
      throw new UnprocessableEntityException();
    }
    this.favs.addTo(member, id);
  }

  private isEntityExist(member: MemberType, id: string) {
    switch (member) {
      case 'artist':
        return this.artists.findAll().some((artist) => artist.id === id);
      case 'album':
        return this.albums.findAll().some((album) => album.id === id);
      case 'track':
        return this.tracks.findAll().some((track) => track.id === id);
      default:
        throw Error('Unknown error');
    }
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
