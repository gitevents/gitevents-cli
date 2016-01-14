'use strict';

var util = require('util');
var chalk = require('chalk');

var Base = require('inquirer/lib/prompts/base');

module.exports = Prompt;

/**
 * Custom "instruction" prompt for inqurier.
 *
 * Displays the message value (with custom prefix and font weight to make them visually different from other
 * prompts) and automatically proceeds to the the question. The question value is set to "shown" after the
 * prompt has been rendered.
 */
function Prompt() {
  return Base.apply( this, arguments );
}

util.inherits(Prompt, Base);

Prompt.prototype._run = function(cb) {
  this.screen.render(this.getQuestion(), this.rl.line);
  this.screen.done()
  cb('shown');
};

Prompt.prototype.getQuestion = function () {
  var prefix = chalk.yellow('>') + ' ';
  var offset = '  ';
  var message = this.opt.message.split('\n').join('\n' + offset);

  return prefix + message;
};
