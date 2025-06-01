import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumDb } from 'src/db/album.entities';
import { NotFoundError } from 'src/user/helpers/custom.errors';
import { TrackDb } from 'src/db/track.entities';
import { FavoritesDb } from 'src/db/favorites.entities';

@Injectable()
export class AlbumService {
  constructor(
    private albums: AlbumDb,
    private tracks: TrackDb,
    private favorites: FavoritesDb,
  ) {}
  create(albumtDto: CreateAlbumDto) {
    return this.albums.create(albumtDto);
  }

  findAll() {
    return this.albums.findAll();
  }

  findOne(id: string) {
    try {
      return this.albums.findOne(id);
    } catch {
      throw new NotFoundException();
    }
  }

  update(id: string, newAlbum: UpdateAlbumDto) {
    try {
      return this.albums.update(id, newAlbum);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  remove(id: string) {
    try {
      this.albums.remove(id);
      this.tracks.findAll().forEach((track) => {
        if (track.albumId === id) {
          this.tracks.update(track.id, { ...track, albumId: null });
        }
      });
      this.favorites.albums.forEach((albumId) => {
        if (albumId === id) {
          this.favorites.removeFrom('album', id);
        }
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
