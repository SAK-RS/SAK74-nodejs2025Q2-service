import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album, AlbumWithoutId } from 'src/album/schemas';
import { NotFoundError } from 'src/user/helpers/custom.errors';

@Injectable()
export class AlbumDb {
  private albums: Map<Album['id'], AlbumWithoutId> = new Map();
  findAll(): Album[] {
    return Array.from(this.albums, ([id, album]) => ({ ...album, id }));
  }

  create(album: CreateAlbumDto): Album {
    const id = randomUUID();
    this.albums.set(id, album);
    return { ...album, id };
  }

  findOne(id: string) {
    const album = this.albums.get(id);
    if (!album) {
      throw new NotFoundError();
    }
    return { ...album, id };
  }

  update(id: Album['id'], newArtist: UpdateAlbumDto): Album {
    if (!this.albums.has(id)) {
      throw new NotFoundError();
    }

    this.albums.set(id, newArtist);
    return { ...newArtist, id };
  }

  remove(id: Album['id']) {
    if (!this.albums.has(id)) {
      throw new NotFoundError();
    }
    this.albums.delete(id);
  }
}
