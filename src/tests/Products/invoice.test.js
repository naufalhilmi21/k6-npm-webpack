import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  let invoices;

  group('Get invoices', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/products/invoices');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });

    if(invoices == null){
      invoices = JSON.parse(res.body).data
    }
  
    sleep(1)
  });

  group('Get invoice pdf', function () {
    var invoice = invoices[Math.floor(Math.random()*invoices.length)];

    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get(`/products/invoices/${invoice.id}/pdf`);
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });
  
    sleep(1)
  });
}
