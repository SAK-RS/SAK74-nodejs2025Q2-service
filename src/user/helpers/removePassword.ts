import { User } from '../schemas';

export function removePassword(user: User): Omit<User, 'password'> {
  delete user.password;
  return user;
}
