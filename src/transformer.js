import Moment from 'moment';
import _ from 'lodash';

export default {
  transform(booking) {

    const checkOut = Moment(new Date(_.get(booking, 'stay.checkOut'))).utc();
    const checkIn = Moment(new Date(_.get(booking, 'stay.checkIn'))).utc();
    const nights = checkOut.diff(checkIn, 'days');

    return {
      strCOID: _.get(booking, 'companyId'),
      dtCheckIn: _.get(booking, 'stay.checkIn'),
      intNights: nights,
      strProperty: _.get(booking, 'propertyId'),
      intAdults: _.get(booking, 'stay.adults'),
      intChildren: _.get(booking, 'stay.children'),
      strResType: null,
      strPromotionCode: '',
      strTourOperator: null,
      objGuestDetails: {
        strFirstName: _.get(booking, 'client.firstName'),
        strLastName: _.get(booking, 'client.lastName'),
        strMiddleInitial: null,
        objAddress: {
          strAddress1: _.get(booking, 'client.address.address1'),
          strAddress2: _.get(booking, 'client.address.address2'),
          strCity: _.get(booking, 'client.address.city'),
          strState: _.get(booking, 'client.address.stateCode'),
          strProvince: null,
          strZip: _.get(booking, 'client.address.postalCode'),
          strCountry: _.get(booking, 'client.address.countryCode'),
          strHomePhone: _.get(booking, 'client.phoneNumber')
        },
        strEmail: _.get(booking, 'client.emailAddress')
      },
      objInsuranceRequest: null,
      objCreditCardDetails: {
        strToken: _.get(booking, 'token'),
        strCCType: _.get(booking, 'configuration.tokamak.creditCard.type'),
        intExpMonth: _.get(booking, 'configuration.tokamak.creditCard.expMonth'),
        intExpYear: _.get(booking, 'configuration.tokamak.creditCard.expYear'),
        strName: _.get(booking, 'configuration.tokamak.creditCard.holder'),
        objBillingAddress: {
          strAddress1: _.get(booking, 'configuration.tokamak.creditCard.address1'),
          strAddress2: _.get(booking, 'configuration.tokamak.creditCard.address2'),
          strCity: _.get(booking, 'configuration.tokamak.creditCard.city'),
          strState: _.get(booking, 'configuration.tokamak.creditCard.state'),
          strProvince: '',
          strZip: _.get(booking, 'configuration.tokamak.creditCard.zip'),
          strCountry: _.get(booking, 'configuration.tokamak.creditCard.country'),
          strHomePhone: null,
          strWorkPhone: null
        },
        strEmail: _.get(booking, 'configuration.tokamak.creditCard.email')
      },
      blnAcceptCSA: false,
      strComments: `Channel: ${booking.channel}`,
      strMarketID: null,
      strOwnerCode: null,
      strMarketingCategory: null,
      strMarketingSource: null,
      objCheckDetails: null,
      objTravelerPreferences: null
    };
  }
};
