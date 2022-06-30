import { session, generatePhoneNumber } from '../../core';
import { check, group, sleep } from 'k6';

export default () => {
  group('post send otp', function () {
    const res = session.post('/auth/send_otp?scope=phone_otp_login', JSON.stringify({
      phone: generatePhoneNumber()
    }));
    check(res, {
      'send otp status is 200': (r) => r.status === 200,
    });
    sleep(1)
  });
}
