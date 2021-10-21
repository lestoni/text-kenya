/**
 * Load Module Dependencies
 */
const request   = require('request');
const {merge}     = require('merge');

const WEB_SERVICE_URL = 'http://infopi.io/text/index.php';

/**
 * Send SMS
 *
 * Params:
 *   - mandatory: to, msg, u, h
 *   - optional: type, unicode, from, footer, nofooter, format
 */
exports.sendSMS = function sendSMS(data, cb) {
  data = merge(data, { op: 'pv' });
  return sendRequest(data, cb);
};

/**
 * Outgoing SMS and Delivery status
 *
 * Params:
 *    - mandatory: u, h
 *    - optional: queue, src, dst, dt, smslog_id, c, last, format
 */
exports.outgoingSMS = function outgoingSMS(data, cb) {
  data = merge(data, { op: 'ds' });
  return sendRequest(data, cb);
};

/**
 * List Incoming SMS
 *
 * Params:
 *    - mandatory: u, h
 *    - optional: queue, src, dst, dt, smslog_id, c, last, format
 */
exports.incomingSMS = function incomingSMS(data, cb) {
  data = merge(data, { op: 'in' });
  return sendRequest(data, cb);
};

/**
 * List SMS on user's inbox
 *
 * Params:
 *    - mandatory: u, h
 *    - optional: queue, src, dst, dt, smslog_id, c, last, format
 */
exports.showInbox = function showInbox(data, cb) {
  data = merge(data, { op: 'ix' });
  return sendRequest(data, cb);
};

/**
 * Get User's Credit information
 *
 * Params:
 *    - mandatory: u, h
 *    - optional: format
 */
exports.getUserCredit = function getUserCredit(data, cb) {
  data = merge(data, { op: 'cr' });
  return sendRequest(data, cb);
};

/**
 * Get User's webservice token.
 * This can be used as a login mechanism
 *
 * Params:
 *    - mandatory: u, p
 *    - optional: format
 */
exports.getToken = function getToken(data, cb) {
  data = merge(data, { op: 'get_token' });
  return sendRequest(data, cb);
};

/**
 * Set User's webservice token.
 * This can be used as a password change mechanism.
 *
 * Params:
 *    - mandatory: u, h
 *    - optional: format
 */
exports.setToken = function setToken(data, cb) {
  data = merge(data, { op: 'set_token' });
  return sendRequest(data, cb);
};

/**
 * Get Contact List by name or code
 *
 * Params:
 *    - mandatory: u, h, kwd
 *    - optional: format, c
 */
exports.getContactList = function getContactList(data, cb) {
  data = merge(data, { op: 'get_contact_group' });
  return sendRequest(data, cb);
};

/**
 * Query Server for useful info.
 *
 * Params:
 *    - mandatory: u, h
 *    - optional: format
 */
exports.serverInfo = function serverInfo(data, cb) {
  data = merge(data, { op: 'query' });
  return sendRequest(data, cb);
};

/**
 * Wrapper for request handler
 *
 * @private
 */
function sendRequest(payload, cb) {
  var info;
  var qsParams = { app: 'ws', u: '',  h: '' };

  var qs = merge(qsParams, payload);
  info = {
    uri: WEB_SERVICE_URL,
    qs: qs
  };

  request(info, function (err, res, body) {
    if(err) return cb(err);

    try {
      body = JSON.parse(body);
    } catch(ex) {
      return cb(ex);
    }

    if(body.error_string) {
      err = new Error(body.error_string);
      err.code = body.error;

      return cb(err);
    }

    cb(null, body);
  });
}
