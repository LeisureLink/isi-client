import Test from 'ava';
import Transformer from '../src/transformer';

Test('A booking is transformed correctly', t => {
  const booking = {
    channel: 'airbnb',
    companyId: 'companyId',
    propertyId: 'propertyId',
    token: 'token',
    configuration: {
      isi: {
        wsdl: 'https://secure.instantsoftwareonline.com/StayUSA/ChannelPartners/wsWeblinkPlusAPI.asmx?wsdl',
        tokenizerUrl: 'https://payments.homeaway.com',
        apiClientId: 'f88a130a-1111-2222-90fc-893d1c5106a8',
        username: 'fawesome',
        apiKey: '2142e27741c9464f88e30cb0b0111111',
        password: 'me-password'
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
    },
    stay: {
      checkIn: '2016-01-01',
      checkOut: '2016-01-08',
      adults: 4,
      children: 12
    },
    client: {
      firstName: 'Bob',
      lastName: 'Saget',
      phoneNumber: '111-111-1111',
      emailAddress: 'bob@saget.com',
      address: {
        address1: '123 Somewhere',
        address2: 'Suite 300',
        city: 'Taylorsville',
        stateCode: 'UT',
        postalCode: '84129',
        countryCode: 'US'
      }
    }
  };
  const result = Transformer.transform(booking);

  t.is(result.strCOID, 'companyId');
  t.is(result.dtCheckIn, booking.stay.checkIn);
  t.is(result.intNights, 7);
  t.is(result.strProperty, booking.propertyId);
  t.is(result.intAdults, booking.stay.adults);
  t.is(result.intChildren, booking.stay.children);
  t.is(result.objGuestDetails.strFirstName, booking.client.firstName);
  t.is(result.objGuestDetails.strLastName, booking.client.lastName);
  t.is(result.objGuestDetails.objAddress.strAddress1, booking.client.address.address1);
  t.is(result.objGuestDetails.objAddress.strAddress2, booking.client.address.address2);
  t.is(result.objGuestDetails.objAddress.strCity, booking.client.address.city);
  t.is(result.objGuestDetails.objAddress.strState, booking.client.address.stateCode);
  t.is(result.objGuestDetails.objAddress.strZip, booking.client.address.postalCode);
  t.is(result.objGuestDetails.objAddress.strCountry, booking.client.address.countryCode);
  t.is(result.objGuestDetails.objAddress.strHomePhone, booking.client.phoneNumber);
  t.is(result.objGuestDetails.strEmail, booking.client.emailAddress);
  t.is(result.objCreditCardDetails.strToken, booking.token);
  t.is(result.objCreditCardDetails.strCCType, booking.configuration.tokamak.creditCard.type);
  t.is(result.objCreditCardDetails.intExpMonth, booking.configuration.tokamak.creditCard.expMonth);
  t.is(result.objCreditCardDetails.intExpYear, booking.configuration.tokamak.creditCard.expYear);
  t.is(result.objCreditCardDetails.strName, booking.configuration.tokamak.creditCard.holder);
  t.is(result.objCreditCardDetails.objBillingAddress.strAddress1, booking.configuration.tokamak.creditCard.address1);
  t.is(result.objCreditCardDetails.objBillingAddress.strAddress2, booking.configuration.tokamak.creditCard.address2);
  t.is(result.objCreditCardDetails.objBillingAddress.strCity, booking.configuration.tokamak.creditCard.city);
  t.is(result.objCreditCardDetails.objBillingAddress.strState, booking.configuration.tokamak.creditCard.state);
  t.is(result.objCreditCardDetails.objBillingAddress.strZip, booking.configuration.tokamak.creditCard.zip);
  t.is(result.objCreditCardDetails.objBillingAddress.strCountry, booking.configuration.tokamak.creditCard.country);
  t.is(result.objCreditCardDetails.strEmail, booking.configuration.tokamak.creditCard.email);


  t.is(result.strComments, `Channel: ${booking.channel}`);
});
