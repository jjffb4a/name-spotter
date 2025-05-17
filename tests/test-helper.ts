import Application from 'v07-name-spotter/app';
import config from 'v07-name-spotter/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { loadTests } from 'ember-qunit/test-loader';
import { start, setupEmberOnerrorValidation } from 'ember-qunit';

setApplication(Application.create(config.APP));
setupEmberOnerrorValidation();
// loverk chatgpt   above line was before after setup(QUnit.assert); --> Ember.onerror handler with invalid testing behavior detected. An Ember.onerror handler _must_ rethrow exceptions when Ember.testing is true or the test suite is unreliable. See https://git.io/vbine for more details.@ 1 ms

setup(QUnit.assert);
loadTests();
start();
