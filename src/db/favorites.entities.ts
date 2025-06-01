import { Injectable } from '@nestjs/common';
import { Favorites, MemberType } from 'src/favs/schemas';

@Injectable()
export class FavoritesDb {
  private favs: Favorites;

  findAll() {
    return this.favs;
  }

  addTo(member: MemberType, id: string) {
    this.favs[member].push(id);
  }

  removeFrom(member: MemberType, id: string) {
    const arr = this.favs[member] as Array<string>;
    const idx = arr.indexOf(id);
    arr.splice(idx, 1);
    this.favs[member] = arr;
  }
}
