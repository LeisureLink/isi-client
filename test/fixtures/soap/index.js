import Nock from 'nock';
import Path from 'path';

const wsdl = Path.resolve(__dirname, './isi.wsdl');
const propertyDescResponse = Path.resolve(__dirname, './getPropertyDesc.xml');

const isi = Nock('https://secure.instantsoftwareonline.com')
  .get('/StayUSA/ChannelPartners/wsWeblinkPlusAPI.asmx?wsdl')
  .replyWithFile(200, wsdl, { 'Content-Type': 'application/xml' })
  .post('/StayUSA/ChannelPartners/wsWeblinkPlusAPI.asmx')
  .replyWithFile(200, propertyDescResponse, { 'Content-Type': 'application/xml' });

export default isi;

export { Nock };
