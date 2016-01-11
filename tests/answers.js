var test = require('tape');
var answers = require('../lib/answers');

test('only displaying question when specific checkbox value was selected', function(t) {
  var testAnswers = {
    configurePlugins: ['Meetup'],
  };

  t.equal(answers.wasSelected('configurePlugins', 'Meetup')(testAnswers), true);
  t.equal(answers.wasSelected('configurePlugins', 'Stripe')(testAnswers), false);
  t.end();
});

test('using previous answer as a default', function(t) {
  var testAnswers = {
    organiserPostalCode: 'ABC123',
  };

  t.equal(answers.useAnswer('organiserPostalCode')(testAnswers), testAnswers.organiserPostalCode);
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

  t.equal(config.debug, false);
  t.equal(config.github.user, testAnswers.githubUsername);
  t.equal(config.github.org, testAnswers.githubOrganisation);
  t.equal(config.github.repos.planning, testAnswers.githubPlanningRepo);
  t.equal(config.github.repos.speakers, testAnswers.githubSpeakersRepo);
  t.equal(config.github.repos.gitevent, testAnswers.githubGiteventRepo);
  t.equal(config.github.repos.jobs, testAnswers.githubJobsRepo);
  t.equal(config.github.secret, testAnswers.githubWebhookSecret);
  t.equal(config.github.token, testAnswers.githubAccessToken);
  t.equal(config.about, testAnswers.eventAbout);
  t.equal(config.date_format, 'DD.MM.YYYY');
  t.equal(config.paths.talks, 'talks/');
  t.equal(config.paths.events, 'events/');
  t.equal(config.paths.jobs, 'jobs/');
  t.equal(config.url, testAnswers.eventUrl);
  t.equal(config.labels.job, 'job');
  t.equal(config.labels.talk, 'talk');
  t.equal(config.labels.proposal, 'proposal');
  t.equal(config.labels.event, 'event');
  t.equal(config.labels.hot, 'hot');
  t.equal(config.schema.default_organizer.type, 'Organization');
  t.equal(config.schema.default_organizer.address.type, 'PostalAddress');
  t.equal(config.schema.default_organizer.address.addressLocality, testAnswers.organiserLocality);
  t.equal(config.schema.default_organizer.address.postalCode, testAnswers.organiserPostalCode);
  t.equal(config.schema.default_organizer.address.streetAddress, testAnswers.organiserStreetAddress);
  t.equal(config.schema.default_organizer.email, testAnswers.organiserEmail);
  t.equal(config.schema.default_organizer.name, testAnswers.organiserName);
  t.equal(config.schema.default_organizer.url, testAnswers.organiserUrl);
  t.equal(config.schema.default_talk_url, '/talk/');
  t.equal(config.schema.default_event_url, '/event/');
  t.equal(config.schema.default_start_time, testAnswers.startTime);
  t.equal(config.schema.default_talk.type, 'Educational event');
  t.equal(config.schema.default_talk.duration, testAnswers.talkDuration);
  t.equal(config.schema.default_event.context, 'http://schema.org');
  t.equal(config.schema.default_event.type, 'Social event');
  t.equal(config.schema.default_event.location.type, 'Place');
  t.equal(config.schema.default_event.location.address.type, 'PostalAddress');
  t.equal(config.schema.default_event.location.address.addressLocality, testAnswers.eventLocality);
  t.equal(config.schema.default_event.location.address.postalCode, testAnswers.eventPostalCode);
  t.equal(config.schema.default_event.location.address.streetAddress, testAnswers.eventStreetAddress);
  t.equal(config.schema.default_event.location.address.name, testAnswers.eventLocationName);
  t.equal(config.schema.default_event.location.url, testAnswers.eventLocationUrl);
  t.equal(config.schema.default_event.duration, testAnswers.eventDuration);
  t.equal(config.schema.default_event.url, testAnswers.eventUrl);
  t.equal(config.schema.doorTime, testAnswers.doorTime);
  t.equal(config.schema.inLanguage.type, 'Language');
  t.equal(config.schema.inLanguage.name, 'English');

  t.equal(config.rollbar, undefined);

  t.equal(config.plugins.jobs.enabled, false);
  t.equal(config.plugins.meetup.enabled, false);
  t.equal(config.plugins.auth.enabled, false);
  t.equal(config.plugins.stripe.enabled, false);

  t.end();
});

test('meetup plugin configuration', function(t) {
  var testAnswers = {
    configurePlugins: ['Meetup'],
    meetupGroup: 'BarcelonaJS',
    meetupGroupId: 123123,
    meetupDefaultVenueId: 456456,
    meetupSimpleHtmlDescription: 'Here is something',
    meetupHosts: [789789],
    meetupApiKey: 'xyz',
  };

  var config = answers.toConfig(testAnswers);

  t.equal(config.plugins.meetup.enabled, true);
  t.equal(config.plugins.meetup.apikey, testAnswers.meetupApiKey);
  t.equal(config.plugins.meetup.group, testAnswers.meetupGroup);
  t.equal(config.plugins.meetup.group_id, testAnswers.meetupGroupId);
  t.equal(config.plugins.meetup.default_venue_id, testAnswers.meetupDefaultVenueId);
  t.equal(config.plugins.meetup.hosts.length, 1);
  t.equal(config.plugins.meetup.hosts[0], 789789);
  t.equal(config.plugins.meetup.simple_html_description, testAnswers.meetupSimpleHtmlDescription);

  t.end();
});
