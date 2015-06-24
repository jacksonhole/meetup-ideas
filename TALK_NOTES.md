# Overview

Firebase.io: "Build Extraordinary Apps. A powerful platform for your mobile or web application"

Emberjs.com: "A framework for building ambitious web applications"

An Application for brainstorming ideas for future meetups.

## App Architecture

Dev / Test:
Ember <-> RESTAdapter <-> Mirage

Production:
Ember <-> EmberFire <-> Firebase

# Create the Ember Application

    ember new meetup-ideas

meanwhile...

## Ember Concepts

url -> Router -> Route -> Model / Template -> html -> url or action

Templates uses handlebars minimalist templating

`{{ expressions }}` and `{{ outlets }}`

Basic control statements

    {{#if}}

    {{/if}}

## Start Server

    ember serve

## Start Tests

    ember test --server --port=4201 --environment=test

## Chrome Dev Tools / Ember Inspectors

Show and look at security errors. Content Security Policy (CSP) - Reduce XSS risk by explicitly declaring which dynamic resources are allowed: content-security-policy.org

(Recklessly) Remove for now:

    npm rm --save-dev ember-cli-content-security-policy

## Application Template / Styles

    ember install ember-bootstrap

container-fluid & page-header ... change name

app.css - set width:auto and max-width:680px

## Ideas Resource

    ember g resource ideas description:string

Generates: route (tells template which model to use), model (stores persistent data), template

### Template

* Show Router for /ideas
* Show Route
* Show Template for ideas
* Change path to `{ path: '/' }`

### Route Model

* Hardcode model with some ideas
* Change template to list ideas `ul.list-group > li.list-group-item, li.idea`
* Add Acceptance Test: `assert.equal(find('li.idea').length, 2);`

## Persisting Data

That won't do... Point of model is to persist data.

    this.store.find('idea');

Model -> Adapter -> Backend Service


* Model: attributes, api (find, createRecord, destroyRecord)
* Adapters, implement the models api RESTAdapter, ActiveRecordAdapter, EmberFire
* Rapid development: use ember mirage


    ember install ember-cli-mirage

Restart....

Factory and Scenario:

    description: i => `Eureka #${i}!`

Add scenario to acceptance test

## Creating Ideas

Add input

    <div class="well">
    {{input
      type="text"
      id="new-idea"
      class="form-control"
      placeholder="What's your great idea?"
      value=newIdea
      action="createIdea"}}
    </div>

Setup Action

    createIdea: function(newIdea) {
      let idea = this.store.createRecord('idea', {
        description: newIdea
      });

      idea.save();
      this.controllerFor('ideas').set('newIdea', '');
    }

Add Mirage route

    this.post('/ideas');

## Deleting Ideas

Add mirage route

    this.delete('/ideas/:id');

Add Button to template

    <button
      {{action "deleteIdea" idea}}
      class="pull-right btn btn-xs btn-danger" aria-hidden="true">
    x
    </button>

Add action

    deleteIdea: function(idea) {
      if (confirm('Are you sure?')) {
        idea.destroyRecord();
      }
    }

## Look at Ember Inspector

# Firebase Setup

Create Application, look around: store, auth, hosting

    ember install emberfire

Dashboard / Online / Offline

Multi-adapter

    let adapter = DS.RESTAdapter.extend({});

Deploy

    npm install -g firebase-tools
    ember build --environment=production
    firebase init

    {
      "firebase": "meetup-ideas",
      "public": "dist",
      "rewrites": [{
        "source": "**",
        "destination": "/index.html"
      }]
    }

    firebase deploy

# Cordova

    npm install -g cordova
    ember install ember-cli-cordova
    ember generate cordova-init com.jthopple.meetupideas  (copy firebase settings)
    ember cordova:build --environment=production
    ember cordova:open

Troubleshooting:

    cd cordova
    cordova plugin add cordova-plugin-whitelist@1.0.0
