import { users } from './users';

export const invalidLoginCases = [
  {
    name: 'invalid credentials',
    username: users.invalid.username,
    password: users.invalid.password,
    expectedError: 'Username and password do not match',
  },
  {
    name: 'empty username',
    username: '',
    password: users.standard.password,
    expectedError: 'Username is required',
  },
  {
    name: 'empty password',
    username: users.standard.username,
    password: '',
    expectedError: 'Password is required',
  },
  {
    name: 'locked-out user',
    username: users.lockedOut.username,
    password: users.lockedOut.password,
    expectedError: 'Sorry, this user has been locked out',
  },
  {
    name: 'standard user with incorrect password',
    username: users.standard.username,
    password: 'wrong_password',
    expectedError: 'Username and password do not match',
  },
];