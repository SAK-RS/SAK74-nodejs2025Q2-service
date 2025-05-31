export class WrongPasswordError extends Error {
  message: string = 'Old password is wrong...';
}

export class NotFoundError extends Error {
  message = 'User not found';
}
