import { IsDefined, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsDefined()
  @IsString()
  oldPassword: string; // previous password
  @IsDefined()
  @IsString()
  newPassword: string; // new password
}
