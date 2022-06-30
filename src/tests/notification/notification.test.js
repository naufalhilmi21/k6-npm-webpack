import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  group('Get notification', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/notifications');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });

    sleep(1)
  });

  group('Get notification count', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/notifications/count');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });

    sleep(1)
  });

  group('Read notification', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const body = {
      ids: []
    }
    const res = session.patch('/notifications', JSON.stringify(body));
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });

    sleep(1)
  });

  group('Read all notification', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.patch('/notifications/all');

    // The first attempt will read all unread notification and return 200. 
    // The rest attempts will return 404 with error message 'Notification not found' due to there isn't any unread notification.
    check(res, {
      'response should be 200 or 404 with error message Notification not found': (r) => r.status === 200 || (r.status === 404 && JSON.parse(res.body).errors[0].message === "Notification not found"),
    });
    
    sleep(1)
  });
}
