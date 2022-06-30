import { session, variables } from './config'
import { check } from 'k6'
class User {
  constructor(username, password) {
    this.USERNAME = username;
    this.PASSWORD = password;
  }
  
  login() {
    // register a new user and authenticate via a Bearer token.
    const res = session.post('/user/register/', {
      first_name: 'Crocodile',
      last_name: 'Owner',
      username: this.USERNAME,
      password: this.PASSWORD,
    });

    check(res, { 'created user': (r) => r.status === 201 });
    console.log(res.body);

    const loginRes = session.post('/auth/token/login/', {
      username: this.USERNAME,
      password: this.PASSWORD,
    });

    const authToken = loginRes.json('access');
    check(authToken, { 'logged in successfully': () => authToken !== '' });

    return authToken;
  }
}

function randomString(length, charset = '') {
  if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
  let res = '';
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
}

export {
  User,
  randomString,
}
