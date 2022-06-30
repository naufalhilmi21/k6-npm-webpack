import { Httpx, Get } from 'https://jslib.k6.io/httpx/0.0.2/index.js';
import { User, variables } from '../../core';
import { check, group, sleep } from 'k6';

const session = new Httpx({ baseURL: variables.baseUrl });

export function setup() { 
  const user = new User();
  return user.authToken().accessToken;
}

export default function (token) {

  group('Fetch all api in the homepage', (t) => {
    session.addHeader('Authorization', `Bearer ${token}`);
    const responses = session.batch(
      [
        new Get('/notifications/count'),
        new Get('/products/tutorials?limit=20'),
        new Get('/auth/user_info'),
        new Get('/kyc/status'),
        new Get('/wallet/balance'),
        new Get('/products/subcategories?category_codes=game_credit&is_featured=true&limit=6'),
        new Get('/auth/user_consent'),
      ]
    );

    check(responses[0], {
      'response notification should be 200': (r) => r.status === 200,
    });
    check(responses[1], {
      'response product should be 200': (r) => r.status === 200,
    });
    check(responses[2], {
      'response user info should be 200': (r) => r.status === 200,
    });
    check(responses[3], {
      'response kyc status should be 200': (r) => r.status === 200,
    });
    check(responses[4], {
      'response wallet balance should be 200': (r) => r.status === 200,
    });
    check(responses[5], {
      'response product subcategories should be 200': (r) => r.status === 200,
    });
    check(responses[6], {
      'response user consent should be 200': (r) => r.status === 200,
    });

    sleep(3)
  });

  group('user get list product', (t) => {
    const resProduct = session.get('/products/subcategories?category_codes=e_load&limit=30')
    check(resProduct, {
        'response get product should be 200': (r) => r.status === 200,
    })

    sleep(1)

    const resPartnerProduct = session.get('/products/partner_products?subcategory_ids=34&cursor=214&limit=20')
    check(resPartnerProduct, {
        'response get partner product should be 200': (r) => r.status === 200,
    })

    sleep(3)
  });

  group('user order product and buy', (t) => {
    const resWallet = session.get('/wallet/balance')
    check(resWallet, {
        'response get wallet balance should be 200': (r) => r.status === 200,
    })

    sleep(1)
    
    const resOrder = session.get('/products/orders?limit=10')
    // check(resOrder, {
    //     'response get orders should be 200': (r) => r.status === 200,
    // })

    if (
      !check(resOrder, {
        'response get orders should be 200': (r) => r.status === 200,
      })
    ) {
      console.log(resOrder.body)
    }
  });
}
