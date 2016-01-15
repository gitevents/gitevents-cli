'use strict';

var GitHubApi = require('github');

function GitHub(api) {
  this.api = api;
  this.user = null;
}

GitHub.prototype.authenticate = function(token) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.api.authenticate({
      type: 'token',
      token: token,
    });
    _this.api.user.get({}, function(err, data) {
      if (err) {
        if (err.code === 401) {
          reject(new Error('Invalid API token'));
        } else {
          reject(err);
        }
        return;
      }

      _this.user = data;
      resolve();
    });
  });
};

GitHub.prototype.verifyOrganisation = function(organisationName) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.api.orgs.get({ org: organisationName }, function(err, data) {
      if (err) {
        if (err.code === 404) {
          reject(new Error('Organisation not found'));
        } else {
          reject(err);
        }
        return;
      }

      resolve();
    });
  });
};

GitHub.prototype.createRepo = function(name, description) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    var params = {
      name: name,
      description: description,
      has_wiki: false
    };

    _this.api.repos.create(params, function(err, data) {
      if (err) {
        if (err.code === 422) {
          reject(new Error('Repository already exists'));
        } else {
          reject(err);
        }
        return;
      }

      resolve();
    });
  });
};

GitHub.prototype.createOrgRepo = function(name, description, organisation) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    var params = {
      name: name,
      org: organisation,
      description: description,
      has_wiki: false
    };

    _this.api.repos.createFromOrg(params, function(err, data) {
      if (err) {
        if (err.code === 422) {
          reject(new Error('Repository already exists'));
        } else {
          reject(err);
        }
        return;
      }

      resolve();
    });
  });
};

GitHub.prototype.createSecretGist = function(filename, content) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    var params = {}
    params.public = false;
    params.files = {};
    params.files[filename] = { content: content };

    _this.api.gists.create(params, function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

module.exports = {
  createClient: function() {
    var api = new GitHubApi({
      version: '3.0.0',
      debug: false,
      protocol: 'https',
      timeout: 2000
    });

    return new GitHub(api);
  }
};
