import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist, ArtistWithoutId } from 'src/artist/schemas';
import { NotFoundError } from 'src/user/helpers/custom.errors';

@Injectable()
export class ArtistDb {
  private artists: Map<Artist['id'], ArtistWithoutId> = new Map();
  findAll(): Artist[] {
    return Array.from(this.artists, ([id, artist]) => ({ ...artist, id }));
  }

  create(artist: CreateArtistDto): Artist {
    const id = randomUUID();
    const timestamp = Date.now();
    this.artists.set(id, artist);
    return { ...artist, id };
  }

  findOne(id: string) {
    const art = this.artists.get(id);
    if (!art) {
      throw new NotFoundError();
    }
    return { ...art, id };
  }

  update(id: Artist['id'], newArtist: UpdateArtistDto): Artist {
    if (!this.artists.has(id)) {
      throw new NotFoundError();
    }

    this.artists.set(id, newArtist);
    return { ...newArtist, id };
  }

  remove(id: Artist['id']) {
    if (!this.artists.has(id)) {
      throw new NotFoundError();
    }
    this.artists.delete(id);
  }
}
