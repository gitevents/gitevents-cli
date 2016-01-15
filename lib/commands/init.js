'use strict';

var inquirer = require('inquirer');
var request = require('request');
var chalk = require('chalk');

var config = require('../config');
var questions = require('../questions');
var github = require('../github').createClient();

inquirer.registerPrompt('instructions', require('../instruction-prompt'));

var CONFIG_GIST_FILENAME = 'gitevents.js';
var organisationName = null;

var prompts = [
  questions.initCommandHelp(),
  questions.githubAccessTokenHelp(),
  questions.githubAccessToken({
    validate: function(answer) {
      tokenAuthenticateOnGithub(github, answer, this.async());
    },
  }),
  questions.githubUseOrganisationHelp(),
  questions.githubUseOrganisation(),
  questions.githubCreateOrganisationHelp(),
  questions.githubOrganisation({
    validate: function(answer) {
      organisationName = answer;
      verifyOrganisation(github, answer, this.async());
    },
  }),
  questions.githubGiteventRepo({
    validate: function(answer) {
      createRepository(github, answer, 'Gitevents event repository', organisationName, this.async());
    },
  }),
  questions.githubPlanningRepo({
    validate: function(answer) {
      createRepository(github, answer, 'Gitevents planning repository', organisationName, this.async());
    },
  }),
  questions.githubSpeakersRepo({
    validate: function(answer) {
      createRepository(github, answer, 'Gitevents speakers repository', organisationName, this.async());
    },
  }),
  questions.githubJobsRepo({
    validate: function(answer) {
      createRepository(github, answer, 'Gitevents jobs repository', organisationName, this.async());
    },
  }),
  questions.githubWebhookSecret(),
  questions.eventDetailsHelp(),
  questions.eventDescription(),
  questions.eventUrl(),
  questions.organiserName(),
  questions.organiserUrl(),
  questions.organiserEmail(),
  questions.organiserStreetAddress(),
  questions.organiserPostalCode(),
  questions.organiserLocality(),
  questions.eventLocationName(),
  questions.eventLocationUrl(),
  questions.eventStreetAddress(),
  questions.eventPostalCode(),
  questions.eventLocality(),
  questions.eventDuration(),
  questions.talkDuration(),
  questions.startTime(),
  questions.doorTime(),
  questions.configureMeetup(),
  questions.meetupGroupName(),
  questions.meetupGroupId(),
  questions.meetupDefaultVenueId(),
  questions.meetupSimpleHtmlDescription(),
  questions.meetupHosts(),
  questions.meetupApiKey(),
  questions.configureStripe(),
  questions.stripeSecretKey(),
  questions.stripePublishableKey(),
  questions.configureAuth(),
  questions.authSecret(),
  questions.authAudience(),
];

function tokenAuthenticateOnGithub(github, token, done) {
  github.authenticate(token)
    .then(function() {
      done(true);
    })
    .catch(function(err) {
      done(err.message);
    });
}

function verifyOrganisation(github, name, done) {
  github.verifyOrganisation(name)
    .then(function() {
      done(true);
    })
    .catch(function(err) {
      done(err.message);
    });
}

function createRepository(github, name, description, organisationName, done) {
  if (organisationName) {
    var createRepo = github.createOrgRepo.bind(github, name, description, organisationName);
  } else {
    var createRepo = github.createRepo.bind(github, name, description);
  }

  createRepo()
    .then(function() {
      done(true);
    })
    .catch(function(err) {
      done(err.message);
    });
}

function createGiteventsConfigGist(github, configJson, filename) {
  var configAsString = JSON.stringify(configJson, null, 2);
  return github.createSecretGist(filename, configAsString)
    .catch(function(err) {
      console.log(err);
      done(err);
    });
}

function getEtcdToken(request) {
  return new Promise(function(resolve, reject) {
    request('https://discovery.etcd.io/new?size=1', function(err, response, body) {
      if (err) {
        reject(err);
        return;
      }

      resolve(body.replace('https://discovery.etcd.io/', ''));
    });
  });
}

function createCloudConfig(request, gistUrl, etcdToken) {
  return new Promise(function(resolve, reject) {
    request('https://raw.githubusercontent.com/gitevents/core/master/cloud-config.yml', function(err, response, body) {
      if (err) {
        reject(err);
        return;
      }

      resolve(body.replace('<config-url>', gistUrl).replace('<token>', etcdToken));
    });
  });
}

module.exports = {
  run: function() {
    inquirer.prompt(prompts, function(answers) {
      try {
        Promise.all([
          createGiteventsConfigGist(github, config.fromAnswers(answers), CONFIG_GIST_FILENAME),
          getEtcdToken(request)
        ]).then(function(results) {
          var gistRawlUrl = results[0].files[CONFIG_GIST_FILENAME].raw_url;
          var etcdToken = results[1];

          console.log(chalk.bold('\nYour configuration is stored in this gist:\n  ') + gistRawlUrl);
          console.log(chalk.bold('The following etcd token has been generated for your:\n  ') + etcdToken);

          return createCloudConfig(request, gistRawlUrl, etcdToken);
        }).then(function(cloudConfig) {
          console.log(chalk.bold('Your cloud config file is ready! Copy below this line.'));
          console.log(cloudConfig);
        });
      } catch (e) {
        console.error(e);
      }
    });
  },
}
