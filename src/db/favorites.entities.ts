import { Injectable } from '@nestjs/common';
import { Favorites, MemberType } from 'src/favs/schemas';

@Injectable()
export class FavoritesDb {
  private favs = {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  };

  findAll(): Favorites {
    return {
      artists: Array.from(this.favs.artists.keys()),
      albums: Array.from(this.favs.albums.keys()),
      tracks: Array.from(this.favs.tracks.keys()),
    };
  }

  addTo(member: MemberType, id: string) {
    this.favs[getEntryType(member)].add(id);
  }

  removeFrom(member: MemberType, id: string) {
    this.favs[getEntryType(member)].delete(id);
  }

  get artists() {
    return this.favs.artists;
  }

  get albums() {
    return this.favs.albums;
  }

  get tracks() {
    return this.favs.tracks;
  }
}

function getEntryType(member: MemberType) {
  return (member + 's') as keyof Favorites;
}
