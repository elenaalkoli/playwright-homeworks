export interface IInvalidCredentials {
  title: string;
  username: string;
  password: string;
  expectedError: string;
}

export const invalidCredentials: IInvalidCredentials[] = [
  // username
  {
    title: 'Empty username',
    username: '',
    password: 'ValidPass123',
    expectedError: 'Username is required',
  },
  {
    title: 'Username with only spaces',
    username: '  ',
    password: 'ValidPass123',
    expectedError: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    title: 'Username shorter than 3 characters',
    username: 'ab',
    password: 'ValidPass123',
    expectedError: 'Username should contain at least 3 characters',
  },
  {
    title: 'Username with leading space',
    username: ' ValidUser',
    password: 'ValidPass123',
    expectedError: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    title: 'Username with trailing space',
    username: 'ValidUser ',
    password: 'ValidPass123',
    expectedError: 'Prefix and postfix spaces are not allowed is username',
  },

  // password
  {
    title: 'Empty password',
    username: 'ValidUser',
    password: '',
    expectedError: 'Password is required',
  },
  {
    title: 'Password with only spaces',
    username: 'ValidUser',
    password: '        ',
    expectedError: 'Password is required',
  },
  {
    title: 'Password shorter than 8 characters',
    username: 'ValidUser',
    password: 'short1A',
    expectedError: 'Password should contain at least 8 characters',
  },
  {
    title: 'Password without uppercase',
    username: 'ValidUser',
    password: 'lowercase1',
    expectedError: 'Password should contain at least one character in upper case',
  },
  {
    title: 'Password without lowercase',
    username: 'ValidUser',
    password: 'UPPERCASE1',
    expectedError: 'Password should contain at least one character in lower case',
  },

  // both invalid
  {
    title: 'Empty username and invalid password with spaces',
    username: '',
    password: '   ',
    expectedError: 'Please, provide valid data',
  },
];
