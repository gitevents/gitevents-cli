'use strict';

var answers = require('./answers');
var validators = require('./validators');

var questions = {};
module.exports = questions;

questions.eventDescription = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventAbout',
    message: 'Event description (e.g. Barcelona.JS is a usergroup focused on JavaScript and related topics)',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.eventUrl = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventUrl',
    message: 'Event URL',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.organiserName = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'organiserName',
    message: 'Organiser name (e.g. BarcelonaJS)',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.organiserUrl = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'organiserUrl',
    message: 'Organiser URL (e.g. http://barcelonajs.org)',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.organiserEmail = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'organiserEmail',
    message: 'Organiser email',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.organiserStreetAddress = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'organiserStreetAddress',
    message: 'Organiser street address',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.organiserPostalCode = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'organiserPostalCode',
    message: 'Organiser postal code',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.organiserLocality = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'organiserLocality',
    message: 'Organiser address locality (e.g. Barcelona, Spain)',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.eventLocationName = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventLocationName',
    message: 'Default event location name (e.g. Mobile World Centre)',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.eventLocationUrl = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventLocationUrl',
    message: 'Default event location URL (e.g. https://www.mobileworldcentre.com)',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.eventStreetAddress = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventStreetAddress',
    message: 'Default event location street address',
    default: answers.useAnswer('organiserStreetAddress'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.eventPostalCode = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventPostalCode',
    message: 'Default event location postal code',
    default: answers.useAnswer('organiserPostalCode'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.eventLocality = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventLocality',
    message: 'Default event location address locality (e.g. Barcelona, Spain)',
    default: answers.useAnswer('organiserLocality'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.eventDuration = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'eventDuration',
    message: 'Default event duration (in hours, e.g. 0.5 or 1.5)',
    filter: answers.hoursToDuration,
    validate: validators.createValidator(validators.isNumeric),
  }, opts || {});
};

questions.talkDuration = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'talkDuration',
    message: 'Default talk duration (in hours, e.g. 0.5 or 1.5)',
    filter: answers.hoursToDuration,
    validate: validators.createValidator(validators.isNumeric),
  }, opts || {});
};

questions.startTime = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'startTime',
    message: 'Default start time (HH:MM)',
    default: '18:30',
    validate: validators.createValidator(validators.isTimeEntry),
  }, opts || {});
};

questions.doorTime = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'doorTime',
    message: 'Default door time (HH:MM)',
    default: '19:00',
    validate: validators.createValidator(validators.isTimeEntry),
  }, opts || {});
};

questions.githubUsername = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubUsername',
    message: 'Github username',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.githubOrganisation = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubOrganisation',
    message: 'Github organisation',
  }, opts || {});
};

questions.githubGiteventRepo = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubGiteventRepo',
    message: 'Gitevent repository (this is the main event repository, you might want to name it after your event, e.g. BarcelonaJS)',
    default: 'events',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.githubPlanningRepo = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubPlanningRepo',
    message: 'Planning repository',
    default: 'planning',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.githubSpeakersRepo = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubSpeakersRepo',
    message: 'Speakers repository',
    default: 'speakers',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.githubJobsRepo = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubJobsRepo',
    message: 'Jobs repository',
    default: 'jobs',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.initCommandHelp = function(opts) {
  return Object.assign({
    type: 'instructions',
    name: 'accessTokensMessage',
    message: `This process tries to automatically set up as much of gitevents as possible
for you, but unfortunately not everything can be automatically provisioned.
To complete this set up, you will need the following:
  1. GitHub account (you can use an existing one, but we recommend setting up
     a new one exclusively for gitevents)
  2. GitHub API token with the following permissions:
    - write:org
  3. GitHub webhook, and the secret key for it
  4. GitHub organisation for your event (optional)
  5. Meetup details (optional):
    - Group ID
    - Venue ID
    - Host IDs
  6. Stripe details (optional):
    - Secret key
    - Publishable key

After this process is done a GitHub gist with your configuration in place will
be created for you, and in the future you can change this configuration by
simply editing the gist directly.

At the end a custom cloud-configuration file will also be provided for you
which you can then use to configure a Digital Ocean droplet for your
gitevents application.`,
  }, opts || {});
};

questions.githubAccessTokenHelp = function(opts) {
  return Object.assign({
    type: 'instructions',
    name: 'accessTokensMessage',
    message: `First off, we need your GitHub API access token.
You can create one here https://github.com/settings/tokens/new.`,
  }, opts || {});
};

questions.githubAccessToken = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubAccessToken',
    message: 'GitHub access token',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.githubWebhookSecret = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'githubWebhookSecret',
    message: 'GitHub webhook secret',
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.configureMeetup = function(opts) {
  return Object.assign({
    type: 'confirm',
    name: 'configureMeetup',
    message: 'Configure Meetup plugin?',
    default: false,
  }, opts || {});
};

questions.meetupGroupName = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'meetupGroupName',
    message: 'Meetup group name',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.meetupGroupId = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'meetupGroupId',
    message: 'Meetup group ID',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.meetupDefaultVenueId = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'meetupDefaultVenueId',
    message: 'Meetup default venue ID',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.meetupSimpleHtmlDescription = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'meetupSimpleHtmlDescription',
    message: 'Meetup simple HTML description',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.meetupHosts = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'meetupHosts',
    message: 'Meetup hosts (comma separated list of IDs)',
    when: answers.useAnswer('configureMeetup'),
    filter: answers.csvToArray,
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.meetupApiKey = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'meetupApiKey',
    message: 'Meetup API key',
    when: answers.useAnswer('configureMeetup'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.configureStripe = function(opts) {
  return Object.assign({
    type: 'confirm',
    name: 'configureStripe',
    message: 'Configure Stripe plugin?',
    default: false,
  }, opts || {});
};

questions.stripeSecretKey = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'stripeSecretKey',
    message: 'Stripe secret key',
    when: answers.useAnswer('configureStripe'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.stripePublishableKey = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'stripePublishableKey',
    message: 'Stripe publishable key',
    when: answers.useAnswer('configureStripe'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.configureAuth = function(opts) {
  return Object.assign({
    type: 'confirm',
    name: 'configureMeetup',
    message: 'Configure Auth plugin?',
    default: false,
  }, opts || {});
};

questions.authSecret = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'authSecret',
    message: 'Auth secret',
    when: answers.useAnswer('configureAuth'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.authAudience = function(opts) {
  return Object.assign({
    type: 'input',
    name: 'authAudience',
    message: 'Auth audience',
    when: answers.useAnswer('configureAuth'),
    validate: validators.createValidator(validators.isNotEmpty),
  }, opts || {});
};

questions.githubUseOrganisationHelp = function(opts) {
  return Object.assign({
    type: 'instructions',
    name: 'orgMessage',
    message: 'Next, you need to decide if you want to use a GitHub organisation for your event. If you don\'t, gitevents repositories will be created under your user account.',
  }, opts || {});
};

questions.githubUseOrganisation = function(opts) {
  return Object.assign({
    type: 'confirm',
    name: 'useOrganisation',
    message: 'Use a GitHub organisation for your event?',
    default: true
  }, opts || {});
};

questions.githubCreateOrganisationHelp = function(opts) {
  return Object.assign({
    type: 'instructions',
    name: 'orgMessage',
    message: 'Unfortunately GitHub API does not allow us to create the organisation for you, so you need to take care of that yourself on: https://github.com/account/organizations/new',
    when: answers.confirmed('useOrganisation'),
  }, opts || {});
};

questions.eventDetailsHelp = function(opts) {
  return Object.assign({
    type: 'instructions',
    name: 'accessTokensMessage',
    message: `That's all the automated provisioning done for now. Next, we'll ask you details
about your event to be shown on the web and used with event management tools.`,
  }, opts || {});
};
