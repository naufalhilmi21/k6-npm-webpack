import { session, User } from '../../core';
import { check, group, sleep } from 'k6';
import randomString from 'random-string';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  group('Get user info', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/auth/user_info');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
  
    sleep(1)
  });

  group('Update user info', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    // can't update the same payload in the same second
    const businessName = 'loadtest_' + randomString({
      length: 10,
      numeric: true,
      letters: true,
    })
    const body = {
      business_name: businessName,
      tin: '123456789012',
      address: '3 Sample St'
    }
    const res = session.patch('/auth/user_info', JSON.stringify(body));
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
  
    sleep(1)
  });
}
