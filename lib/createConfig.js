var inquirer = require('inquirer');
var answers = require('./answers');
var validators = require('./validators');

var questions = [
  {
    type: 'input',
    name: 'eventAbout',
    message: 'Event description (e.g. Barcelona.JS is a usergroup focused on JavaScript and related topics)',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'eventUrl',
    message: 'Event URL',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'organiserName',
    message: 'Organiser name (e.g. BarcelonaJS)',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'organiserUrl',
    message: 'Organiser URL (e.g. http://barcelonajs.org)',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'organiserEmail',
    message: 'Organiser email',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'organiserStreetAddress',
    message: 'Organiser street address',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'organiserPostalCode',
    message: 'Organiser postal code',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'organiserLocality',
    message: 'Organiser address locality (e.g. Barcelona, Spain)',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'eventLocationName',
    message: 'Default event location name (e.g. Mobile World Centre)',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'eventLocationUrl',
    message: 'Default event location URL (e.g. https://www.mobileworldcentre.com)',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'eventStreetAddress',
    message: 'Default event location street address',
    default: answers.useAnswer('organiserStreetAddress'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'eventPostalCode',
    message: 'Default event location postal code',
    default: answers.useAnswer('organiserPostalCode'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'eventLocality',
    message: 'Default event location address locality (e.g. Barcelona, Spain)',
    default: answers.useAnswer('organiserLocality'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'eventDuration',
    message: 'Default event duration (in hours, e.g. 0.5 or 1.5)',
    filter: answers.hoursToDuration,
    validate: validators.createValidator(validators.isNumeric),
  },
  {
    type: 'input',
    name: 'talkDuration',
    message: 'Default talk duration (in hours, e.g. 0.5 or 1.5)',
    filter: answers.hoursToDuration,
    validate: validators.createValidator(validators.isNumeric),
  },
  {
    type: 'input',
    name: 'startTime',
    message: 'Default start time (HH:MM)',
    default: '18:30',
    validate: validators.createValidator(validators.isTimeEntry),
  },
  {
    type: 'input',
    name: 'doorTime',
    message: 'Default door time (HH:MM)',
    default: '19:00',
    validate: validators.createValidator(validators.isTimeEntry),
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Github username',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'githubOrganisation',
    message: 'Github organisation (leave empty if not using a GitHub organisation)',
  },
  {
    type: 'input',
    name: 'githubGiteventRepo',
    message: 'Gitevent repository (this is the main event repository, you might want to name it after your event, e.g. BarcelonaJS)',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'githubPlanningRepo',
    message: 'Planning repository',
    default: 'planning',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'githubSpeakersRepo',
    message: 'Speakers repository',
    default: 'speakers',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'githubAccessToken',
    message: 'GitHub access token',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'githubWebhookSecret',
    message: 'GitHub webhook secret',
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'confirm',
    name: 'configureMeetup',
    message: 'Configure Meetup plugin?',
    default: false,
  },
  {
    type: 'input',
    name: 'meetupGroupName',
    message: 'Meetup Group Name',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'meetupGroupId',
    message: 'Meetup group ID',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'meetupDefaultVenueId',
    message: 'Meetup default venue ID',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'meetupSimpleHtmlDescription',
    message: 'Meetup simple HTML description',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'meetupHosts',
    message: 'Meetup hosts (comma separated list of IDs)',
    when: answers.useAnswer('configureMeetup'),
    filter: answers.csvToArray,
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'meetupApiKey',
    message: 'Meetup API key',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'confirm',
    name: 'configureStripe',
    message: 'Configure Stripe plugin?',
    default: false,
  },
  {
    type: 'input',
    name: 'stripeSecretKey',
    message: 'Stripe secret key',
    when: answers.useAnswer('configureStripe'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'stripePublishableKey',
    message: 'Stripe publishable key',
    when: answers.useAnswer('configureStripe'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'confirm',
    name: 'configureMeetup',
    message: 'Configure Auth plugin?',
    default: false,
  },
  {
    type: 'input',
    name: 'authSecret',
    message: 'Auth secret',
    when: answers.useAnswer('configureAuth'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
  {
    type: 'input',
    name: 'authAudience',
    message: 'Auth audience',
    when: answers.useAnswer('configureAuth'),
    validate: validators.createValidator(validators.isNotEmpty),
  },
];

module.exports = {
  run: function() {
    inquirer.prompt(questions, function(userAnswers) {
      console.log("Here's your configuration object: \n");
      console.log(JSON.stringify(answers.toConfig(userAnswers), null, 2));
    });
  },
}
