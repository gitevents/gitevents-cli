'use strict';

var inquirer = require('inquirer');

var questions = require('../questions');
var config = require('../config');

var prompts = [
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
  questions.githubUsername(),
  questions.githubOrganisation({
    message: 'Github organisation (leave empty if not using a GitHub organisation)',
  }),
  questions.githubGiteventRepo(),
  questions.githubPlanningRepo(),
  questions.githubSpeakersRepo(),
  questions.githubAccessToken(),
  questions.githubWebhookSecret(),
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

module.exports = {
  run: function() {
    inquirer.prompt(prompts, function(answers) {
      console.log("Here's your configuration object: \n");
      console.log(JSON.stringify(config.fromAnswers(answers), null, 2));
    });
  },
}
