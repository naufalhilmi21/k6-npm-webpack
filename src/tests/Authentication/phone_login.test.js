import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export default () => {
  group('Phone login', function () {
    const user = new User();

    const res = session.post('/auth/login?type=phone_otp', JSON.stringify({
      phone: user.phoneNumber,
      otp_id: user.otp(),
      otp_code: '12345'
    }));
    
    check(res, {
      'phone login success': (r) => r.status === 200,
    });
  
    sleep(1)
  });
}
