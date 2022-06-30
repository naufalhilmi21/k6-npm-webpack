import { session, variables } from './config'
import { check } from 'k6'
import randomString from 'random-string';

const defaultNumber = variables.phoneNumber || '+63812345678' // has been commonly used on preprod, has good amount of data already
class User {
  constructor(phoneNumber = defaultNumber) {
    this.phoneNumber = phoneNumber;
  }

  otp() {
    const res = session.post('/auth/send_otp?scope=phone_otp_login', JSON.stringify({
      phone: this.phoneNumber
    }));
    check(res, { 'otp sent': (r) => r.status === 200 });
    return res.json('data.id');
  }
  
  authToken() {
    const loginRes = session.post('/auth/login?type=phone_otp', JSON.stringify({
      phone: this.phoneNumber,
      otp_id: this.otp(),
      otp_code: variables.otpNumber || '12345'
    }));
    const token = {
      accessToken: loginRes.json('data.access_token'),
      refreshToken: loginRes.json('data.refresh_token')
    }
    check(token.accessToken, { 'logged in successfully': (token) => token !== '' });

    return token;
  }
}

function generatePhoneNumber() {
  return '+618' + randomString({
    length: 10,
    numeric: true,
    letters: false,
  })
}

export {
  User,
  generatePhoneNumber,
}
