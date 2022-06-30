import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  group('Create user consent', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.post('/auth/user_consent');
    check(res, {
      'create user consent response should be 200': (r) => r.status === 200,
    });

    sleep(1)
  });

  group('Get user consent', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/auth/user_consent');
    check(res, {
      'get user consent response should be 200': (r) => r.status === 200,
    });
  
    sleep(1)
  });
}
