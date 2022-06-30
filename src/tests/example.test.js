import { session, User } from '../core';
import { check, group, sleep } from 'k6';

export default () => {
  group('Test Get', function () {
    const res = session.get('/public/crocodiles/1/');

    check(res, {
      'status is 200': () => res.status === 200,
    });

    sleep(1);
  })
};