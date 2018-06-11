# text-kenya

Client wrapper for Text Kenya Web Service.

[![Made in Africa](https://img.shields.io/badge/Africa's%20Rising-%E2%9C%93-green.svg)](https://github.com/collections/made-in-africa)

## Install.

```
$ npm install text-kenya
```

## Examples.

```javascript
  var textKenya = require('text-kenya');
  var data = { u: 'username', h: 'token', to: '0700112233', msg: 'To SMS and Infinity' };

  textKenya.sendSMS(data, function (err, response) {
    if(err) return console.log(err);

    // operate on response here
    console.log(response);
  });
```
## API.

**textKenya.sendSMS(data#Object, cb(err, response)#Function)**

Send SMS to a single or multiple numbers

`data` params:
  - mandatory: `to`, `msg`, `u`, `h`
  - optional: `type`, `unicode`, `from`, `footer`, `nofooter`, `format`

**textKenya.outgoingSMS(data#Object, cb(err, response)#Function)**

Outgoing SMS and delivery status

`data` params:
  - mandatory: `u`, `h`
  - optional: `queue`, `src`, `dst`, `dt`, `smslog_id`, `c`, `last`, `format`

**textKenya.incomingSMS(data#Object, cb(err, response)#Function)**

List Incoming SMS

`data` params:
  - mandatory: `u`, `h`
  - optional: `queue`, `src`, `dst`, `dt`, `smslog_id`, `c`, `last`, `format`

**textKenya.showInbox(data#Object, cb(err, response)#Function)**

List SMS on user's inbox.

`data` params:
  - mandatory: `u`, `h`
  - optional: `queue`, `src`, `dst`, `dt`, `smslog_id`, `c`, `last`, `format`

**textKenya.getUserCredit(data#Object, cb(err, response)#Function)**

Get user's credit information.

`data` params:
  - mandatory: `u`, `h`
  - optional: `format`

**textKenya.getToken(data#Object, cb(err, response)#Function)**

Get user's webservice token. This can be used as a login mechanism.

`data` params:
  - mandatory: `u`, `p`
  - optional: `format`

**textKenya.setToken(data#Object, cb(err, response)#Function)**

Set user's webservice token. This can be used as a password change mechanism.

`data` params:
  - mandatory: `u`, `h`
  - optional: `format`

**textKenya.getContactList(data#Object, cb(err, response)#Function)**

Get contact list by code or name

`data` params:
  - mandatory: `u`, `h`, `kwd`
  - optional: `format`, `c`

**textKenya.serverInfo(data#Object, cb(err, response)#Function)**

Query server for useful information such as user's data, user's credit, last smslog_id for inbox,incoming and outgoing SMS

`data` params:
  - mandatory: `u`, `h`
  - optional: `format`

## LICENSE.

MIT.
