//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    "scenarios.js"
  ],

  capabilities: {
    "browserName": "chrome"
  },

  baseUrl: "http://localhost:8000/",

  framework: "jasmine",

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

  if(process.env.TRAVIS) {  
  'browserName': 'chrome'
  }

};
