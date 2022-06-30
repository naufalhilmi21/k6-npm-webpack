import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User("+6385800003070");
  return user.authToken().accessToken;
}

export default (token) => {
  group('Post kyc initialization', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.post('/kyc/initialization');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
  
    sleep(1)
  });
}
