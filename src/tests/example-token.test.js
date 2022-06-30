import { session, User, randomString } from '../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User(`${randomString(10)}@example.com`, 'NasiGoreng');
  return user.login();
}

export default (authToken) => {

  session.addHeader('Authorization', `Bearer ${authToken}`);
  group('Test With Authorization', function () {
    const payload = {
      name: `Name ${randomString(10)}`,
      sex: 'M',
      date_of_birth: '2001-01-01',
    };

    const res = session.post('/my/crocodiles/', payload);

    if (
      check(res, { 'Croc created correctly': (r) => r.status === 201 })) {
        res.json('id');
      } else {
        console.log(`Unable to create a Croc ${res.status} ${res.body}`);
      return;
    }
  });

  sleep(1);
};