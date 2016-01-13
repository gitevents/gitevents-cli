'use strict';

var program = require('commander')
var configureCmd = require('./lib/commands/configure');
var initCmd = require('./lib/commands/init');

program
  .version('0.0.1')

program
  .command('config')
  .description('Run interactive configuration generator')
  .action(function(env, options) {
    configureCmd.run();
  });

program
  .command('init')
  .description('Run interactive gitevents initialisation')
  .action(function(env, options) {
    initCmd.run();
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
