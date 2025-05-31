import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { ArtistWithoutId } from '../schemas';

export class CreateArtistDto implements ArtistWithoutId {
  @IsDefined()
  @IsString()
  name: string;
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
