import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  group('Get balance', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/wallet/balance');
    
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
    
    sleep(1)
  }); 

  group('Get balance history', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/wallet/balance_history');

    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
    
    sleep(1)
  }); 

  // API /wallet/deposits may fail due to failure of calling partners' APIs during the process of creating deposit.
  // TODO: Mock Accountant API and Xendit API to generate deposits and re-run the load test.
  group('Create deposit', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const body = {
        amount: "1"
    }
    const res = session.post('/wallet/deposits', JSON.stringify(body));

    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
    
    sleep(1)
  }); 
}
