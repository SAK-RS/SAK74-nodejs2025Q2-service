import { TrackWithoutId } from '../schemas';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto implements TrackWithoutId {
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
