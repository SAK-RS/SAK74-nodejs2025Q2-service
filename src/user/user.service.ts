import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDb } from 'src/db/user.entities';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { NotFoundError, WrongPasswordError } from './helpers/custom.errors';

@Injectable()
export class UserService {
  constructor(private users: UserDb) {}
  create(createUserDto: CreateUserDto) {
    return this.users.create(createUserDto);
  }

  findAll() {
    return this.users.findAll();
  }

  findOne(id: string) {
    try {
      return this.users.findOne(id);
    } catch {
      throw new NotFoundException();
    }
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    try {
      return this.users.update(id, updateUserDto);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
      if (err instanceof WrongPasswordError) {
        throw new ForbiddenException();
      }
    }
  }

  remove(id: string) {
    try {
      this.users.remove(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
