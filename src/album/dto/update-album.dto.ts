import type { AlbumWithoutId } from '../schemas';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAlbumDto implements AlbumWithoutId {
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
