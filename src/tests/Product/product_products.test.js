import { session, User } from '../../core';
import { check, group, sleep } from 'k6';

export function setup() {
  const user = new User();
  return user.authToken().accessToken;
}

export default (token) => {
  let products;
  session.addHeader('Authorization', `Bearer ${token}`);

  group('Get products', function () {
    const res = session.get('/products/products');
    check(res, {
      'response should be 200': (r) => r.status === 200,
    });

    if(products == null){
      products = JSON.parse(res.body).data
    }
    
    sleep(1)
  });

  group('Get products by Id', function () {    
    if(products.length > 0){
      var product = products[Math.floor(Math.random()*products.length)];
  
      const resId = session.get(`/products/products/${product.id}`);
      check(resId, {
        'response should be 200': (r) => r.status === 200,
      });  
    }
    
    sleep(1)
  });
}
