import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  let partnerProducts;
  session.addHeader('Authorization', `Bearer ${token}`);

  group('Get product partner products', function () {
    session.addHeader('Authorization', `Bearer ${token}`);
    const res = session.get('/products/partner_products');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });

    if(partnerProducts == null){
      partnerProducts = JSON.parse(res.body).data.partner_products
    }
    sleep(1)
  });

  group('Get product partner products by id', function () {
    if (partnerProducts.length > 0) {
      var partnerProduct = partnerProducts[Math.floor(Math.random() * partnerProducts.length)];

      const resId = session.get(`/products/partner_products/${partnerProduct.id}`);
      check(resId, {
        'response should be 200': (r) => r.status === 200,
      });
    }
    sleep(1)
  });
}
