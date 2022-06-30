import { Httpx, Get } from 'https://jslib.k6.io/httpx/0.0.2/index.js';
import { variables } from '../core';
import { check, group } from 'k6';

const session = new Httpx({ baseURL: variables.baseUrl });

export default () => {
  group('Fetch all the api simulating homescreen', function () {
    const responses = session.batch(
      [
        new Get('/public/crocodiles/1/'),
        new Get('/public/crocodiles/2/'),
        new Get('/public/crocodiles/3/'),
      ]
    );

    check(responses[0], {
      'response 1 should be 200': (r) => r.status === 200,
    });
    check(responses[1], {
      'response 2 should be 200': (r) => r.status === 200,
    });
    check(responses[2], {
      'response 3 info should be 200': (r) => r.status === 200,
    });
  })
};