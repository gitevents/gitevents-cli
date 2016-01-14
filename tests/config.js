'use strict';

var test = require('tape');
var config = require('../lib/config');

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

  var configuration = config.fromAnswers(testAnswers);

  t.equal(configuration.debug, false, 'debug');
  t.equal(configuration.github.user, testAnswers.githubUsername, 'gh username');
  t.equal(configuration.github.org, testAnswers.githubOrganisation, 'gh organisation');
  t.equal(configuration.github.repos.planning, testAnswers.githubPlanningRepo, 'gh planning repo');
  t.equal(configuration.github.repos.speakers, testAnswers.githubSpeakersRepo, 'gh speakers repo');
  t.equal(configuration.github.repos.gitevent, testAnswers.githubGiteventRepo, 'gh gitevent repo');
  t.equal(configuration.github.repos.jobs, testAnswers.githubJobsRepo, 'gh jobs repo');
  t.equal(configuration.github.secret, testAnswers.githubWebhookSecret, 'gh webhook secret');
  t.equal(configuration.github.token, testAnswers.githubAccessToken, 'gh access token');
  t.equal(configuration.about, testAnswers.eventAbout, 'about');
  t.equal(configuration.date_format, 'DD.MM.YYYY', 'date format');
  t.equal(configuration.paths.talks, 'talks/', 'talks path');
  t.equal(configuration.paths.events, 'events/', 'events path');
  t.equal(configuration.paths.jobs, 'jobs/', 'jobs path');
  t.equal(configuration.url, testAnswers.eventUrl, 'url');
  t.equal(configuration.labels.job, 'job', 'job label');
  t.equal(configuration.labels.talk, 'talk', 'talk label');
  t.equal(configuration.labels.proposal, 'proposal', 'proposal label');
  t.equal(configuration.labels.event, 'event', 'event label');
  t.equal(configuration.labels.hot, 'hot', 'hot label');
  t.equal(configuration.schema.default_organizer.type, 'Organization', 'org type');
  t.equal(configuration.schema.default_organizer.address.type, 'PostalAddress', 'org address type');
  t.equal(configuration.schema.default_organizer.address.addressLocality, testAnswers.organiserLocality, 'org address locality');
  t.equal(configuration.schema.default_organizer.address.postalCode, testAnswers.organiserPostalCode, 'org address postal code');
  t.equal(configuration.schema.default_organizer.address.streetAddress, testAnswers.organiserStreetAddress, 'org address street address');
  t.equal(configuration.schema.default_organizer.email, testAnswers.organiserEmail, 'org email');
  t.equal(configuration.schema.default_organizer.name, testAnswers.organiserName, 'org name');
  t.equal(configuration.schema.default_organizer.url, testAnswers.organiserUrl, 'org url');
  t.equal(configuration.schema.default_talk_url, '/talk/', 'talk url');
  t.equal(configuration.schema.default_event_url, '/event/', 'event url');
  t.equal(configuration.schema.default_start_time, testAnswers.startTime, 'start time');
  t.equal(configuration.schema.default_talk.type, 'Educational event', 'talk type');
  t.equal(configuration.schema.default_talk.duration, testAnswers.talkDuration, 'talk duration');
  t.equal(configuration.schema.default_event.context, 'http://schema.org', 'event context');
  t.equal(configuration.schema.default_event.type, 'Social event', 'event type');
  t.equal(configuration.schema.default_event.location.type, 'Place', 'location type');
  t.equal(configuration.schema.default_event.location.address.type, 'PostalAddress', 'event address type');
  t.equal(configuration.schema.default_event.location.address.addressLocality, testAnswers.eventLocality, 'event address locality');
  t.equal(configuration.schema.default_event.location.address.postalCode, testAnswers.eventPostalCode, 'event address postal code');
  t.equal(configuration.schema.default_event.location.address.streetAddress, testAnswers.eventStreetAddress, 'event address street address');
  t.equal(configuration.schema.default_event.location.address.name, testAnswers.eventLocationName, 'event address location name');
  t.equal(configuration.schema.default_event.location.url, testAnswers.eventLocationUrl, 'event location url');
  t.equal(configuration.schema.default_event.duration, testAnswers.eventDuration, 'event duration');
  t.equal(configuration.schema.default_event.url, testAnswers.eventUrl, 'event url');
  t.equal(configuration.schema.doorTime, testAnswers.doorTime, 'door time');
  t.equal(configuration.schema.inLanguage.type, 'Language', 'language type');
  t.equal(configuration.schema.inLanguage.name, 'English', 'language name');

  t.equal(configuration.rollbar, undefined);

  t.equal(configuration.plugins.jobs.enabled, false, 'jobs not enabled');
  t.equal(configuration.plugins.meetup.enabled, false, 'meetup not enabled');
  t.equal(configuration.plugins.auth.enabled, false, 'auth not enabled');
  t.equal(configuration.plugins.stripe.enabled, false, 'stripe not enabled');

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

  var configuration = config.fromAnswers(testAnswers);

  t.equal(configuration.plugins.meetup.enabled, true, 'enabled');
  t.equal(configuration.plugins.meetup.apikey, testAnswers.meetupApiKey, 'api key');
  t.equal(configuration.plugins.meetup.group, testAnswers.meetupGroupName, 'group');
  t.equal(configuration.plugins.meetup.group_id, testAnswers.meetupGroupId, 'group id');
  t.equal(configuration.plugins.meetup.default_venue_id, testAnswers.meetupDefaultVenueId, 'venue id');
  t.equal(configuration.plugins.meetup.hosts.length, 3, 'hosts length');
  t.equal(configuration.plugins.meetup.hosts[0], '123', 'hosts value');
  t.equal(configuration.plugins.meetup.hosts[1], '35', 'hosts value');
  t.equal(configuration.plugins.meetup.hosts[2], '9', 'hosts value');
  t.equal(configuration.plugins.meetup.simple_html_description, testAnswers.meetupSimpleHtmlDescription, 'html description');

  t.end();
});

test('jobs plugin configuration', function(t) {
  var testAnswers = {
    configureJobs: true,
  };

  var configuration = config.fromAnswers(testAnswers);

  t.equal(configuration.plugins.jobs.enabled, true, 'enabled');

  t.end();
});

test('auth plugin configuration', function(t) {
  var testAnswers = {
    configureAuth: true,
    authSecret: 'abc',
    authAudience: 'xyz',
  };

  var configuration = config.fromAnswers(testAnswers);

  t.equal(configuration.plugins.auth.enabled, true, 'enabled');
  t.equal(configuration.plugins.auth.secret, 'abc', 'secret');
  t.equal(configuration.plugins.auth.audience, 'xyz', 'audience');

  t.end();
});

test('stripe plugin configuration', function(t) {
  var testAnswers = {
    configureStripe: true,
    stripeSecretKey: 'abc',
    stripePublishableKey: 'xyz',
  };

  var configuration = config.fromAnswers(testAnswers);

  t.equal(configuration.plugins.stripe.enabled, true, 'enabled');
  t.equal(configuration.plugins.stripe.secretKey, 'abc', 'secret key');
  t.equal(configuration.plugins.stripe.publishableKey, 'xyz', 'publishable key');

  t.end();
});
