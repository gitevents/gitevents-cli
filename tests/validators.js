'use strict';

var test = require('tape');
var validators = require('../lib/validators');

test('is not empty validator', function(t) {
  t.equal(validators.createValidator(validators.isNotEmpty)(''), false, 'required answer missing');
  t.equal(validators.createValidator(validators.isNotEmpty)('something'), true, 'required answer provided');
  t.end();
});

test('is numeric validator', function(t) {
  t.equal(validators.createValidator(validators.isNumeric)('foobar'), false, 'random string is not numeric');
  t.equal(validators.createValidator(validators.isNumeric)('0.5'), true, 'decimal string is numeric');
  t.equal(validators.createValidator(validators.isNumeric)('1'), true, 'int string is numeric');
  t.equal(validators.createValidator(validators.isNumeric)('1.2'), true, 'numeric string is numeric');
  t.end();
});

test('is time entry validator', function(t) {
  t.equal(validators.createValidator(validators.isTimeEntry)('foobar'), false, 'random string is not time entry');
  t.equal(validators.createValidator(validators.isTimeEntry)('25:10'), false, 'invalid time entry is not ok');
  t.equal(validators.createValidator(validators.isTimeEntry)('25:69'), false, 'invalid time entry is not ok 2');
  t.equal(validators.createValidator(validators.isTimeEntry)('00:10'), true, 'time entry is ok');
  t.equal(validators.createValidator(validators.isTimeEntry)('19:28'), true, 'time entry is ok 2');
  t.end();
});
