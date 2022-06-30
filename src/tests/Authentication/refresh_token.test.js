import { session, User } from '../../core';
import { check, group, sleep } from 'k6';
import randomString from 'random-string';


export function setup() {
  const user = new User();
  return user.authToken().refreshToken;
}

export default (token) => {
  group('Refresh token', function () {
    const res = session.post('/auth/refresh', JSON.stringify({
      refresh_token: token
    }));
    check(res, {
      'refresh token should be failed': (r) => r.status === 401,
    });
  
    sleep(1)
  });
}
