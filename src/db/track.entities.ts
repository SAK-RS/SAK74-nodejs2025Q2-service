import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import type { Track, TrackWithoutId } from 'src/track/schemas';
import { NotFoundError } from 'src/user/helpers/custom.errors';

@Injectable()
export class TrackDb {
  private tracks: Map<Track['id'], TrackWithoutId> = new Map();

  findAll(): Track[] {
    return Array.from(this.tracks, ([id, album]) => ({ ...album, id }));
  }

  create(album: CreateTrackDto): Track {
    const id = randomUUID();
    this.tracks.set(id, album);
    return { ...album, id };
  }

  findOne(id: string) {
    const album = this.tracks.get(id);
    if (!album) {
      throw new NotFoundError();
    }
    return { ...album, id };
  }

  update(id: Track['id'], newArtist: UpdateTrackDto): Track {
    if (!this.tracks.has(id)) {
      throw new NotFoundError();
    }

    this.tracks.set(id, newArtist);
    return { ...newArtist, id };
  }

  remove(id: Track['id']) {
    if (!this.tracks.has(id)) {
      throw new NotFoundError();
    }
    this.tracks.delete(id);
  }
}
