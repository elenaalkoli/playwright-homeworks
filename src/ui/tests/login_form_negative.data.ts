export interface IInvalidCredentials {
  username: string;
  password: string;
  expectedError: string;
}

export const invalidCredentials: IInvalidCredentials[] = [
  //username
  {
    username: '', // empty username
    password: 'ValidPass123',
    expectedError: 'Username is required',
  },
  {
    username: '  ', // only spaces username
    password: 'ValidPass123',
    expectedError: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    username: 'ab', // too short <3 username
    password: 'ValidPass123',
    expectedError: 'Username should contain at least 3 characters',
  },
  {
    username: ' ValidUser', // pretfix spaces username
    password: 'ValidPass123',
    expectedError: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    username: 'ValidUser ', // postfix spaces username
    password: 'ValidPass123',
    expectedError: 'Prefix and postfix spaces are not allowed is username',
  },
  //password
  {
    username: 'ValidUser',
    password: '', // empty password
    expectedError: 'Password is required',
  },
  {
    username: 'ValidUser',
    password: '        ', // only spaces password
    expectedError: 'Password is required',
  },
  {
    username: 'ValidUser',
    password: 'short1A', // too short <8 password
    expectedError: 'Password should contain at least 8 characters',
  },
  {
    username: 'ValidUser',
    password: 'lowercase1', // without upper character password
    expectedError: 'Password should contain at least one character in upper case',
  },
  {
    username: 'ValidUser',
    password: 'UPPERCASE1', // only upper case password
    expectedError: 'Password should contain at least one character in lower case',
  },
  {
    username: '',
    password: '   ',
    expectedError: 'Please, provide valid data',
  },
];
