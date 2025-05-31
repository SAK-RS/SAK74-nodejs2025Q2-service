import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import {
  NotFoundError,
  WrongPasswordError,
} from 'src/user/helpers/custom.errors';
import { User } from 'src/user/schemas';

type UserInDb = Omit<User, 'id'>;

@Injectable()
export class UserDb {
  private users: Map<string, UserInDb> = new Map();
  findAll(): User[] {
    return Array.from(this.users, ([id, user]) => ({ ...user, id }));
  }

  create({ login, password }: CreateUserDto): User {
    const id = randomUUID();
    const timestamp = Date.now();
    const createdUser = {
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.set(id, createdUser);
    return { ...createdUser, id };
  }

  findOne(id: string) {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundError();
    }
    return { ...user, id };
  }

  update(
    id: User['id'],
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundError();
    }
    if (user.password !== oldPassword) {
      throw new WrongPasswordError();
    }
    const updatedUser: UserInDb = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    this.users.set(id, updatedUser);
    return { ...updatedUser, id };
  }

  remove(id: User['id']) {
    if (!this.users.has(id)) {
      throw new NotFoundError();
    }
    this.users.delete(id);
  }
}
