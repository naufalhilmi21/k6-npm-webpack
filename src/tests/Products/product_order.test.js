import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  group('get products orders', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/products/orders');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
  
    sleep(1)
  });

  group('get products order by ID', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/products/orders/107') // id 107: previous order on acc +63812345678
    check(res, {
        'response should be 200': (r) => r.status === 200,
    })

    sleep(1)
  })

  group('get products order items', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/products/orders/107/items')
    check(res, {
        'response should be 200': (r) => r.status === 200,
    })

    sleep(1)
  })

  // TODO: test with full create order flow
  group('create order', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const body = {
        order_items: [
            {
                partner_product_id: -1 // not using real id because it will deduct the balance
            }
        ]
    }
    const res = session.post('/products/orders', JSON.stringify(body))
    check(res, {
        'response should be 404': (r) => r.status === 404,
    });

    sleep(1)
  })

  group ('retry order', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.post('/products/orders/-1/retry');
    check(res, {
        'response should be 404': (r) => r.status === 404,
    });

    sleep(1)
  })

}
