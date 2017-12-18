Error.stackTraceLimit = Infinity;
require('core-js/es6');
require('core-js/es7/reflect');

require('zone.js/dist/zone');
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy.js");
require("zone.js/dist/sync-test");
require("zone.js/dist/jasmine-patch");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");


var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

__karma__.loaded = function () { };

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule, 
    browser.platformBrowserDynamicTesting()
);

var testContext = require.context('../src', true, /\.spec\.ts/);
testContext.keys().map(testContext);

__karma__.start();