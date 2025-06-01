import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TrackWithoutId } from '../schemas';

export class CreateTrackDto implements TrackWithoutId {
  @IsDefined()
  @IsString()
  name: string;
  @IsDefined()
  @IsNumber()
  duration: number;
  @IsOptional()
  @IsString()
  @IsUUID()
  albumId: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string;
}
