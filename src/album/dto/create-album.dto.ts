import {
  IsDefined,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import type { AlbumWithoutId } from '../schemas';

export class CreateAlbumDto implements AlbumWithoutId {
  @IsDefined()
  @IsString()
  name: string;
  @IsDefined()
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string;
}
