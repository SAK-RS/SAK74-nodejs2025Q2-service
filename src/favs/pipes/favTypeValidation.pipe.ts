import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MemberType } from '../schemas';

const types: MemberType[] = ['album', 'artist', 'track'];

@Injectable()
export class FavTypeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!types.includes(value)) {
      throw new HttpException(
        `Wrong path ${value}, should be /artist/, /album/ or /track/`,
        HttpStatus.NOT_FOUND,
      );
    }
    return value;
  }
}
