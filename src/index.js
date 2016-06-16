import _ from 'lodash';
import Client from './infrastructure/soap';
import Tokamak from './infrastructure/tokamak';
import Transformer from './transformer';

/**
 * Creates a new client
 *
 * @param configuration
 * @returns {{getProperty: (function(*, *)), book: (function(*, *, *))}}
 */
export default (configuration = {}) => {
  return {

    /**
     * Get a property
     *
     * @public
     *
     * @param {String} companyId
     * @param {String} propertyId
     *
     * @returns {Promise<*>}
     */
    async getProperty(companyId, propertyId){
      const username = configuration.isi.username;
      const password = configuration.isi.password;
      const client = await Client(configuration.isi.wsdl, username, password);

      return new Promise((resolve, reject) => {
        client.getPropertyDesc({
          strUserId: username,
          strPassword: password,
          strCOID: companyId,
          strPropId: propertyId,
          strCheckInDate: null,
          strCheckOutDate: null,
          blnSendNonAvail: true
        }, (err, res) => {
          if (err) return reject(err);

          const property = _.chain(res)
                            .get('getPropertyDescResult.clsProperty')
                            .head()
                            .value();

          if (!property) return reject(new Error('Invalid getPropertyDesc response from ISI. Expected getPropertyDescResult.clsProperty[0] to contain data.'));
          return resolve(property);
        });
      });
    },

    /**
     * Create a booking
     *
     * @public
     *
     * @param {String} companyId
     * @param {String} propertyId
     * @param {Object} booking
     *
     * @returns {Promise<*>}
     */
    async book(companyId, propertyId, booking) {
      const username = configuration.isi.username;
      const password = configuration.isi.password;
      const client = await Client(configuration.isi.wsdlUrl, username, password);
      const token = await Tokamak(configuration);

      const objBookingRequest = Transformer.transform({ companyId, propertyId, configuration, token, ...booking });

      return new Promise((resolve, reject) => {
        client.createBooking({ objBookingRequest }, (err, res) => {
          if (err) return reject(err);

          const result = _.get(res, 'createBookingResult');
          if (!result) return reject(new Error('Invalid createBooking response from ISI. Expected createBooking to contain data.'));
          return resolve(result);
        });
      });
    }
  };
};
