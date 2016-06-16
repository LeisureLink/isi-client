import Moment from 'moment';
import Wrecked from 'wrecked';
import Digest from './digest';

export default async (configuration) => {
  const time = Moment.utc().format('x');
  const digest = Digest(configuration.isi.apiKey, time);
  const uri = `${configuration.tokamak.url}/proxy/${configuration.tokamak.apiKey}/${configuration.isi.tokenizerUrl}/tokens?time=${time}&digest=${digest}&clientId=${configuration.isi.apiClientId}`;
  return Wrecked.post(uri, { tokenType: 'CC', value: configuration.tokamak.creditCard.token });
};
