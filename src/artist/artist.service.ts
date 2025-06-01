import {
  Inject,
  Injectable,
  NotFoundException,
  Provider,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistDb } from 'src/db/artist.entities';
import { NotFoundError } from 'src/user/helpers/custom.errors';

@Injectable()
export class ArtistService {
  constructor(private artists: ArtistDb) {}
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
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
