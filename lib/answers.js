'use strict';

var answers = {};
module.exports = answers;

answers.useAnswer = function useAnswer(key) {
  return function (answers) {
    return answers[key] ? answers[key] : null;
  };
};

answers.confirmed = function confirmed(key) {
  return function (answers) {
    return Boolean(answers[key]);
  };
};

answers.csvToArray = function csvToArray(csv) {
  return csv.split(',').map(function(value) { return value.trim(); });
};

answers.hoursToDuration = function hoursToDuration(hoursString) {
  var rawFloat = parseFloat(hoursString);
  var hours = parseInt(rawFloat, 10);
  var minutes = parseInt(rawFloat % 1 * 60, 10);

  var result = 'PT';

  if (hours) {
    result += hours + 'H';
  }

  if (minutes) {
    result += minutes + 'M';
  }

  return result;
};
