'use strict';

var validators = {};
module.exports = validators;

validators.createValidator = function createValidator() {
  var validators = Array.prototype.slice.call(arguments);

  return function(answer) {
    var someFailed = validators.some(function(validator) {
      return !validator(answer);
    });

    return !someFailed;
  };
}

validators.isNotEmpty = function isNotEmpty(value) {
  return Boolean(value);
};

validators.isNumeric = function isNumeric(value) {
  return /^(\d+\.)?\d+$/.test(value);
};

validators.isTimeEntry = function isTimeEntry(value) {
  if (/^\d\d:\d\d$/.test(value) === false) {
    return false;
  }

  var components = value.split(':');
  var hours = parseInt(components[0], 10);
  var minutes = parseInt(components[1], 10);

  if (hours < 0 || hours > 24) {
    return false;
  }

  if (hours < 0 || hours > 59) {
    return false;
  }

  return true;
};
