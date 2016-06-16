import Test from 'ava';
import { Nock } from './fixtures/soap';
import Client from '../src';

const configuration = {
  isi: {
    wsdl: 'https://secure.instantsoftwareonline.com/StayUSA/ChannelPartners/wsWeblinkPlusAPI.asmx?wsdl',
    tokenizerUrl: 'https://payments.homeaway.com',
    apiClientId: 'f88a130a-1111-2222-90fc-893d1c5106a8',
    username: 'otravel',
    apiKey: '2142e27741c9464f88e30cb0b0111111',
    password: 'vrooster1'
  },
  tokamak: {
    url: 'https://tokamak.leisurelink.com',
    apiKey: '5f67999be456ae7888c5cfc9688811c200000000',
    creditCard: {
      token: '387a7fe7-2222-3333-4444-0c187320684d',
      type: 'VISA',
      expMonth: 4,
      expYear: 2025,
      holder: 'LeisureLink',
      address1: '90 S. 400 W.',
      address2: 'Suite 2000',
      city: 'SLC',
      state: 'UT',
      zip: '84101',
      country: 'USA',
      email: 'bookings-are-rad@leisurelink.com'
    }
  }
};

Test.beforeEach(() => {
  Nock.disableNetConnect();
});

Test.afterEach(() => {
  Nock.enableNetConnect();
});


Test.beforeEach(t => {
  const client = Client(configuration);
  t.truthy(client);
  t.context = client;
});

Test('can get property information', async t => {
  const client = t.context;
  const companyId = '111';
  const propertyId = '122';

  const result = await client.getProperty(companyId, propertyId);
  t.is(result.strPropId, 'CP1056');
});
