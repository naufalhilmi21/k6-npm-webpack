import { session } from '../../core';
import { check, group, sleep } from 'k6';

export default () => {
  group('Post kyc webhook advance-ai', function () {
    let actionTypes = ["AUTO_REJECT", "SUBMIT", "AUTO_APPROVE"]
    var actionType = actionTypes[Math.floor(Math.random()*actionTypes.length)];
    
    const res = session.post('/kyc/webhook/advance-ai', JSON.stringify(
      {
        transactionId: "f552524e-d80e-44c0-b3f6-a6d1d486ce8d",
        clientName: "1",
        clientEmail: "loadtest@bukalapak.com",
        actionType: actionType,
        operator: "operator",
        comment: "comment",
        actionTime: "2018-09-22T12:42:31Z",
        timestamp: 1655349179269
      }
    ));

    // There is validation in API for example if current status user is SUBMIT then we send SUMBIT again, the result is 422. 
    // SUMBIT can return 200 if we send another state. it happen also in other status.
    // So we using random actionType and status should be 200 || 422.
    check(res, {
      'response should be 200 or 422': (r) => r.status === 200 || r.status === 422,
    });

    sleep(1)
  });
}
