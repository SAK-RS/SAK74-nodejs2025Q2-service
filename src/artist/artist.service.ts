import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistDb } from 'src/db/artist.entities';
import { NotFoundError } from 'src/user/helpers/custom.errors';
import { AlbumDb } from 'src/db/album.entities';
import { TrackDb } from 'src/db/track.entities';
import { FavoritesDb } from 'src/db/favorites.entities';

@Injectable()
export class ArtistService {
  constructor(
    private artists: ArtistDb,
    private albums: AlbumDb,
    private tracks: TrackDb,
    private favorites: FavoritesDb,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    return this.artists.create(createArtistDto);
  }

  findAll() {
    return this.artists.findAll();
  }

  findOne(id: string) {
    try {
      return this.artists.findOne(id);
    } catch {
      throw new NotFoundException();
    }
  }

  update(id: string, newArtist: UpdateArtistDto) {
    try {
      return this.artists.update(id, newArtist);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  remove(id: string) {
    try {
      this.artists.remove(id);
      this.albums.findAll().forEach((album) => {
        if (album.artistId === id) {
          this.albums.update(album.id, { ...album, artistId: null });
        }
      });
      this.tracks.findAll().forEach((track) => {
        if (track.artistId === id) {
          this.tracks.update(track.id, { ...track, artistId: null });
        }
      });
      this.favorites.artists.forEach((artId) => {
        if (artId === id) {
          this.favorites.removeFrom('artist', id);
        }
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
