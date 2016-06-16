import Test from 'ava';
import ISI from '../src';

Test.beforeEach(t => {
  t.context = ISI();
});

Test('ISI works', t => {
  console.log(t.context);
  t.pass();
});
