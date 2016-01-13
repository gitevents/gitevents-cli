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

test('basic answer conversion', function(t) {
  var testAnswers = {
    eventAbout: 'Barcelona.JS is a usergroup focused on JavaScript and related topics.',
    eventUrl: 'http://barcelonajs.org',
    organiserName: 'BarcelonaJS',
    organiserUrl: 'http://barcelonajs.org',
    organiserEmail: 'hola(at)barcelonajs.org',
    organiserStreetAddress: 'C/ Mare de Deu del Pilar 20',
    organiserPostalCode: '08003',
    organiserLocality: 'Barcelona, Spain',
    eventLocationName: 'Mobile World Centre',
    eventStreetAddress: 'C/ Fontanella 2',
    eventPostalCode: '08001',
    eventLocality: 'Barcelona, Spain',
    eventDuration: 'PT2H',
    eventLocationUrl: 'https://www.mobileworldcentre.com',
    talkDuration: 'PT30M',
    startTime: '19:00',
    doorTime: '18:45',
    githubUsername: 'BcnJS',
    githubOrganisation: 'BarcelonaJS',
    githubGiteventRepo: 'BarcelonaJS',
    githubPlanningRepo: 'planning',
    githubSpeakersRepo: 'speakers',
    githubAccessToken: 'abc',
    githubWebhookSecret: 'xyz',
    configurePlugins: []
  };

  var config = answers.toConfig(testAnswers);

  t.equal(config.debug, false, 'debug');
  t.equal(config.github.user, testAnswers.githubUsername, 'gh username');
  t.equal(config.github.org, testAnswers.githubOrganisation, 'gh organisation');
  t.equal(config.github.repos.planning, testAnswers.githubPlanningRepo, 'gh planning repo');
  t.equal(config.github.repos.speakers, testAnswers.githubSpeakersRepo, 'gh speakers repo');
  t.equal(config.github.repos.gitevent, testAnswers.githubGiteventRepo, 'gh gitevent repo');
  t.equal(config.github.repos.jobs, testAnswers.githubJobsRepo, 'gh jobs repo');
  t.equal(config.github.secret, testAnswers.githubWebhookSecret, 'gh webhook secret');
  t.equal(config.github.token, testAnswers.githubAccessToken, 'gh access token');
  t.equal(config.about, testAnswers.eventAbout, 'about');
  t.equal(config.date_format, 'DD.MM.YYYY', 'date format');
  t.equal(config.paths.talks, 'talks/', 'talks path');
  t.equal(config.paths.events, 'events/', 'events path');
  t.equal(config.paths.jobs, 'jobs/', 'jobs path');
  t.equal(config.url, testAnswers.eventUrl, 'url');
  t.equal(config.labels.job, 'job', 'job label');
  t.equal(config.labels.talk, 'talk', 'talk label');
  t.equal(config.labels.proposal, 'proposal', 'proposal label');
  t.equal(config.labels.event, 'event', 'event label');
  t.equal(config.labels.hot, 'hot', 'hot label');
  t.equal(config.schema.default_organizer.type, 'Organization', 'org type');
  t.equal(config.schema.default_organizer.address.type, 'PostalAddress', 'org address type');
  t.equal(config.schema.default_organizer.address.addressLocality, testAnswers.organiserLocality, 'org address locality');
  t.equal(config.schema.default_organizer.address.postalCode, testAnswers.organiserPostalCode, 'org address postal code');
  t.equal(config.schema.default_organizer.address.streetAddress, testAnswers.organiserStreetAddress, 'org address street address');
  t.equal(config.schema.default_organizer.email, testAnswers.organiserEmail, 'org email');
  t.equal(config.schema.default_organizer.name, testAnswers.organiserName, 'org name');
  t.equal(config.schema.default_organizer.url, testAnswers.organiserUrl, 'org url');
  t.equal(config.schema.default_talk_url, '/talk/', 'talk url');
  t.equal(config.schema.default_event_url, '/event/', 'event url');
  t.equal(config.schema.default_start_time, testAnswers.startTime, 'start time');
  t.equal(config.schema.default_talk.type, 'Educational event', 'talk type');
  t.equal(config.schema.default_talk.duration, testAnswers.talkDuration, 'talk duration');
  t.equal(config.schema.default_event.context, 'http://schema.org', 'event context');
  t.equal(config.schema.default_event.type, 'Social event', 'event type');
  t.equal(config.schema.default_event.location.type, 'Place', 'location type');
  t.equal(config.schema.default_event.location.address.type, 'PostalAddress', 'event address type');
  t.equal(config.schema.default_event.location.address.addressLocality, testAnswers.eventLocality, 'event address locality');
  t.equal(config.schema.default_event.location.address.postalCode, testAnswers.eventPostalCode, 'event address postal code');
  t.equal(config.schema.default_event.location.address.streetAddress, testAnswers.eventStreetAddress, 'event address street address');
  t.equal(config.schema.default_event.location.address.name, testAnswers.eventLocationName, 'event address location name');
  t.equal(config.schema.default_event.location.url, testAnswers.eventLocationUrl, 'event location url');
  t.equal(config.schema.default_event.duration, testAnswers.eventDuration, 'event duration');
  t.equal(config.schema.default_event.url, testAnswers.eventUrl, 'event url');
  t.equal(config.schema.doorTime, testAnswers.doorTime, 'door time');
  t.equal(config.schema.inLanguage.type, 'Language', 'language type');
  t.equal(config.schema.inLanguage.name, 'English', 'language name');

  t.equal(config.rollbar, undefined);

  t.equal(config.plugins.jobs.enabled, false, 'jobs not enabled');
  t.equal(config.plugins.meetup.enabled, false, 'meetup not enabled');
  t.equal(config.plugins.auth.enabled, false, 'auth not enabled');
  t.equal(config.plugins.stripe.enabled, false, 'stripe not enabled');

  t.end();
});

test('meetup plugin configuration', function(t) {
  var testAnswers = {
    configureMeetup: true,
    meetupGroupName: 'BarcelonaJS',
    meetupGroupId: 123123,
    meetupDefaultVenueId: 456456,
    meetupSimpleHtmlDescription: 'Here is something',
    meetupHosts: ['123', '35', '9'],
    meetupApiKey: 'xyz',
  };

  var config = answers.toConfig(testAnswers);

  t.equal(config.plugins.meetup.enabled, true, 'enabled');
  t.equal(config.plugins.meetup.apikey, testAnswers.meetupApiKey, 'api key');
  t.equal(config.plugins.meetup.group, testAnswers.meetupGroupName, 'group');
  t.equal(config.plugins.meetup.group_id, testAnswers.meetupGroupId, 'group id');
  t.equal(config.plugins.meetup.default_venue_id, testAnswers.meetupDefaultVenueId, 'venue id');
  t.equal(config.plugins.meetup.hosts.length, 3, 'hosts length');
  t.equal(config.plugins.meetup.hosts[0], '123', 'hosts value');
  t.equal(config.plugins.meetup.hosts[1], '35', 'hosts value');
  t.equal(config.plugins.meetup.hosts[2], '9', 'hosts value');
  t.equal(config.plugins.meetup.simple_html_description, testAnswers.meetupSimpleHtmlDescription, 'html description');

  t.end();
});

test('jobs plugin configuration', function(t) {
  var testAnswers = {
    configureJobs: true,
  };

  var config = answers.toConfig(testAnswers);

  t.equal(config.plugins.jobs.enabled, true, 'enabled');

  t.end();
});

test('auth plugin configuration', function(t) {
  var testAnswers = {
    configureAuth: true,
    authSecret: 'abc',
    authAudience: 'xyz',
  };

  var config = answers.toConfig(testAnswers);

  t.equal(config.plugins.auth.enabled, true, 'enabled');
  t.equal(config.plugins.auth.secret, 'abc', 'secret');
  t.equal(config.plugins.auth.audience, 'xyz', 'audience');

  t.end();
});

test('stripe plugin configuration', function(t) {
  var testAnswers = {
    configureStripe: true,
    stripeSecretKey: 'abc',
    stripePublishableKey: 'xyz',
  };

  var config = answers.toConfig(testAnswers);

  t.equal(config.plugins.stripe.enabled, true, 'enabled');
  t.equal(config.plugins.stripe.secretKey, 'abc', 'secret key');
  t.equal(config.plugins.stripe.publishableKey, 'xyz', 'publishable key');

  t.end();
});
