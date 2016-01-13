'use strict';

var program = require('commander')
var createConfig = require('./lib/createConfig');

program
  .version('0.0.1')

program
  .command('config')
  .description('Run interactive configuration generator')
  .action(function(env, options) {
    createConfig.run();
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
