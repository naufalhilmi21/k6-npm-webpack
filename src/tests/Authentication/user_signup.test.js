import { session, generatePhoneNumber, User } from '../../core';
import { check, group, sleep } from 'k6';

export default () => {
  group('User Signup', function () {
    const user = new User(generatePhoneNumber());

    session.addHeader('Authorization', `Bearer ${user.authToken().accessToken}`);
    const res = session.post('/auth/signup?type=phone_otp', JSON.stringify({
      full_name: 'loadtest' + user.phoneNumber,
      phone: user.phoneNumber,
      business_type_id: 1,
    }));
    check(res, {
      'signup user success': (r) => r.status === 200,
    });
  
    sleep(1)
  });
}
