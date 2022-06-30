import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  group('Get kyc status', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/kyc/status');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
  
    sleep(1)
  });
}
