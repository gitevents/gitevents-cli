'use strict';

var config = {};
module.exports = config;

config.fromAnswers = function fromAnswers(answers) {
  var config = {
    "debug": false,
    "github": {
      "user": answers.githubUsername,
      "org": answers.githubOrganisation,
      "repos": {
        "planning": answers.githubPlanningRepo,
        "speakers": answers.githubSpeakersRepo,
        "gitevent": answers.githubGiteventRepo,
        "jobs": answers.githubJobsRepo
      },
      "secret": answers.githubWebhookSecret,
      "token": answers.githubAccessToken,
    },
    "plugins": {
      "jobs": {
        "enabled": false
      },
      "meetup": {
        "enabled": false,
      },
      "auth": {
        "enabled": false,
      },
      "stripe": {
        "enabled": false,
      }
    },
    "about": answers.eventAbout,
    "date_format": "DD.MM.YYYY",
    "paths": {
      "talks": "talks/",
      "events": "events/",
      "jobs": "jobs/"
    },
    "url": answers.eventUrl,
    "labels": {
      "job": "job",
      "talk": "talk",
      "proposal": "proposal",
      "event": "event",
      "hot": "hot"
    },
    "schema": {
      "default_organizer": {
        "type": "Organization",
        "address": {
          "type": "PostalAddress",
          "addressLocality": answers.organiserLocality,
          "postalCode": answers.organiserPostalCode,
          "streetAddress": answers.organiserStreetAddress
        },
        "email": answers.organiserEmail,
        "name": answers.organiserName,
        "url": answers.organiserUrl,
      },
      "default_talk_url": "/talk/",
      "default_event_url": "/event/",
      "default_start_time": answers.startTime,
      "default_talk": {
        "type": "Educational event",
        "duration": answers.talkDuration,
      },
      "default_event": {
        "context": "http://schema.org",
        "type": "Social event",
        "location": {
          "type": "Place",
          "address": {
            "type": "PostalAddress",
            "addressLocality": answers.eventLocality,
            "postalCode": answers.eventPostalCode,
            "streetAddress": answers.eventStreetAddress,
            "name": answers.eventLocationName,
          },
          "url": answers.eventLocationUrl,
        },
        "duration": answers.eventDuration,
        "url": answers.eventUrl,
      },
      "doorTime": answers.doorTime,
      "inLanguage": {
        "type": "Language",
        "name": "English"
      }
    }
  };

  if (answers.configureJobs) {
    config.plugins.jobs = {
      enabled: true,
    };
  }

  if (answers.configureMeetup) {
    config.plugins.meetup = {
      enabled: true,
      apikey: answers.meetupApiKey,
      group: answers.meetupGroupName,
      group_id: answers.meetupGroupId,
      default_venue_id: answers.meetupDefaultVenueId,
      hosts: answers.meetupHosts,
      simple_html_description: answers.meetupSimpleHtmlDescription,
    };
  }

  if (answers.configureAuth) {
    config.plugins.auth = {
      enabled: true,
      secret: answers.authSecret,
      audience: answers.authAudience,
    };
  }

  if (answers.configureStripe) {
    config.plugins.stripe = {
      enabled: true,
      secretKey: answers.stripeSecretKey,
      publishableKey: answers.stripePublishableKey,
    };
  }

  return config;
};
