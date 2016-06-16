# isi-client

> Client for ISI

[![CircleCI](https://circleci.com/gh/LeisureLink/isi-client.svg?style=svg)](https://circleci.com/gh/LeisureLink/isi-client)

### Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)

#### Installation

Install the client via NPM

```bash
$ npm install @leisurelink/isi-client --save
```


#### Usage

```js
import Client from '@leisurelink/isi-client';

const client = Client({
  isi: {
      wsdl: '',
      tokenizerUrl: '',
      apiClientId: '',
      username: '',
      apiKey: '',
      password: ''
    },
  tokamak: {
      url: '',
      apiKey: '',
      creditCard: {
        token: '',
        type: '',
        expMonth: '',
        expYear: '',
        holder: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        email: ''
      }
    }
});
```

#### API

