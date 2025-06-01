import { IsDefined, IsString } from 'class-validator';
import { User } from '../schemas';

export class CreateUserDto implements Partial<User> {
  @IsDefined()
  @IsString()
  login: string;
  @IsDefined()
  @IsString()
  password: string;
}
