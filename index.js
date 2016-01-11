'use strict';

var inquirer = require('inquirer');
var answers = require('answers');

var questions = [
  {
    type: 'input',
    name: 'eventAbout',
    message: 'Event description (e.g. Barcelona.JS is a usergroup focused on JavaScript and related topics)',
  },
  {
    type: 'input',
    name: 'eventUrl',
    message: 'Event URL',
  },
  {
    type: 'input',
    name: 'organiserName',
    message: 'Organiser name (e.g. BarcelonaJS)',
  },
  {
    type: 'input',
    name: 'organiserUrl',
    message: 'Organiser URL (e.g. http://barcelonajs.org)',
  },
  {
    type: 'input',
    name: 'organiserEmail',
    message: 'Organiser email',
  },
  {
    type: 'input',
    name: 'organiserStreetAddress',
    message: 'Organiser street address',
  },
  {
    type: 'input',
    name: 'organiserPostalCode',
    message: 'Organiser postal code',
  },
  {
    type: 'input',
    name: 'organiserLocality',
    message: 'Organiser address locality (e.g. Barcelona, Spain)',
  },
  {
    type: 'input',
    name: 'eventLocationName',
    message: 'Default event location name (e.g. Mobile World Centre)',
  },
  {
    type: 'input',
    name: 'eventLocationUrl',
    message: 'Default event location URL (e.g. https://www.mobileworldcentre.com)',
  },
  {
    type: 'input',
    name: 'eventStreetAddress',
    message: 'Default event location street address',
    default: answers.useAnswer('organiserStreetAddress'),
  },
  {
    type: 'input',
    name: 'eventPostalCode',
    message: 'Default event location postal code',
    default: answers.useAnswer('organiserPostalCode'),
  },
  {
    type: 'input',
    name: 'eventLocality',
    message: 'Default event location address locality (e.g. Barcelona, Spain)',
    default: answers.useAnswer('organiserLocality'),
  },
  {
    type: 'input',
    name: 'eventDuration',
    message: 'Default event duration',
  },
  {
    type: 'input',
    name: 'talkDuration',
    message: 'Default talk duration',
  },
  {
    type: 'input',
    name: 'startTime',
    message: 'Default start time',
    default: '18:30',
  },
  {
    type: 'input',
    name: 'doorTime',
    message: 'Default door time',
    default: '19:00',
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Github username',
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
  },
  {
    type: 'input',
    name: 'githubPlanningRepo',
    message: 'Planning repository',
    default: 'planning',
  },
  {
    type: 'input',
    name: 'githubSpeakersRepo',
    message: 'Speakers repository',
    default: 'speakers',
  },
  {
    type: 'input',
    name: 'githubAccessToken',
    message: 'GitHub access token',
  },
  {
    type: 'input',
    name: 'githubWebhookSecret',
    message: 'GitHub webhook secret',
  },
  {
    type: 'checkbox',
    name: 'configurePlugins',
    message: 'Select additional plugins you want to configure (use up/down arrows)',
    choices: [
      { name: 'Meetup' },
      { name: 'Auth' },
      { name: 'Stripe' },
    ]
  },
  {
    type: 'input',
    name: 'meetupGroup',
    message: 'Meetup Group',
    when: answers.wasSelected('configurePlugins', 'Meetup'),
  },
  {
    type: 'input',
    name: 'meetupGroupId',
    message: 'Meetup group ID',
    when: answers.wasSelected('configurePlugins', 'Meetup'),
  },
  {
    type: 'input',
    name: 'meetupDefaultVenueId',
    message: 'Meetup default venue ID',
    when: answers.wasSelected('configurePlugins', 'Meetup'),
  },
  {
    type: 'input',
    name: 'meetupSimpleHtmlDescription',
    message: 'Meetup simple HTML description',
    when: answers.wasSelected('configurePlugins', 'Meetup'),
  },
  {
    type: 'input',
    name: 'meetupHosts',
    message: 'Meetup hosts (comma separated list of IDs)',
    when: answers.wasSelected('configurePlugins', 'Meetup'),
  },
  {
    type: 'input',
    name: 'meetupApiKey',
    message: 'Meetup API key',
    when: answers.wasSelected('configurePlugins', 'Meetup'),
  },
  {
    type: 'input',
    name: 'stripeSecretKey',
    message: 'Stripe secret key',
    when: answers.wasSelected('configurePlugins', 'Stripe'),
  },
  {
    type: 'input',
    name: 'stripePublishableKey',
    message: 'Stripe publishable key',
    when: answers.wasSelected('configurePlugins', 'Stripe'),
  },
  {
    type: 'input',
    name: 'authSecret',
    message: 'Auth secret',
    when: answers.wasSelected('configurePlugins', 'Auth'),
  },
  {
    type: 'input',
    name: 'authAudience',
    message: 'Auth audience',
    when: answers.wasSelected('configurePlugins', 'Auth'),
  },
];

inquirer.prompt(questions, function(answers) {
  console.log(answers);
});
