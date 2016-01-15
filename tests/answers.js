'use strict';

var test = require('tape');
var answers = require('../lib/answers');

test('using previous answer as a default', function(t) {
  var testAnswers = {
    organiserPostalCode: 'ABC123',
  };

  t.equal(answers.useAnswer('organiserPostalCode')(testAnswers), testAnswers.organiserPostalCode, 'previous answer ok');
  t.end();
});

test('when previous answer confirmed', function(t) {
  var testAnswers = {
    shouldDoSomething: true,
  };

  t.equal(answers.confirmed('shouldDoSomething')(testAnswers), true, 'confirmed');
  t.end();
});

test('filtering csv answer to an array', function(t) {
  t.deepEqual(answers.csvToArray('123, 456'), ['123', '456']);
  t.end();
});

test('filtering csv answer to an array', function(t) {
  t.deepEqual(answers.csvToArray('123, 456'), ['123', '456']);
  t.end();
});

test('filtering hours to duration', function(t) {
  t.equal(answers.hoursToDuration('0.25'), 'PT15M', '15 minutes');
  t.equal(answers.hoursToDuration('0.5'), 'PT30M', '30 minutes');
  t.equal(answers.hoursToDuration('1'), 'PT1H', '1 hours');
  t.equal(answers.hoursToDuration('2.5'), 'PT2H30M', '2 hours 30 minutes');
  t.end();
});

