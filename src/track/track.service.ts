import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackDb } from 'src/db/track.entities';
import { NotFoundError } from 'src/user/helpers/custom.errors';

@Injectable()
export class TrackService {
  constructor(private tracks: TrackDb) {}
  create(createTrackDto: CreateTrackDto) {
    return this.tracks.create(createTrackDto);
  }

  findAll() {
    return this.tracks.findAll();
  }

  findOne(id: string) {
    try {
      return this.tracks.findOne(id);
    } catch {
      throw new NotFoundException();
    }
  }

  update(id: string, newTrack: UpdateTrackDto) {
    try {
      return this.tracks.update(id, newTrack);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  remove(id: string) {
    try {
      this.tracks.remove(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
