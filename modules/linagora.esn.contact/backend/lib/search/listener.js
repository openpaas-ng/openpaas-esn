'use strict';

var CONSTANTS = require('../constants');
var denormalize = require('./denormalize');

module.exports = function(dependencies) {

  var listeners = dependencies('elasticsearch').listeners;

  function getOptions() {
    return {
      events: {
        add: CONSTANTS.NOTIFICATIONS.CONTACT_ADDED,
        update: CONSTANTS.NOTIFICATIONS.CONTACT_UPDATED,
        remove: CONSTANTS.NOTIFICATIONS.CONTACT_DELETED
      },
      denormalize: denormalize.denormalize,
      getId: denormalize.getId,
      type: CONSTANTS.SEARCH.TYPE_NAME,
      index: CONSTANTS.SEARCH.INDEX_NAME
    };
  }

  function register() {
    listeners.addListener(getOptions());
  }

  return {
    register: register,
    getOptions: getOptions
  };

};
