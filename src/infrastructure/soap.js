import Soap from 'soap';

export default async (url, username, password, options = {}) => {
  return await new Promise((resolve, reject) => {
    Soap.createClient(url, options, (err, client) => {
      if (err) return reject(err);
      client.addSoapHeader(`<h:clsPartnerAuthentication xmlns="http://www.instantsoftware.com/SecureWeblinkPlusAPI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:h="http://www.instantsoftware.com/SecureWeblinkPlusAPI">
          <strUserID>${username}</strUserID>
          <strPassword>${password}</strPassword>
        </h:clsPartnerAuthentication>`);
      return resolve(client);
    });
  });
};
