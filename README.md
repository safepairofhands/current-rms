# Current RMS API Module

This module allows your Node app to query the Current RMS API. Please feel free to join in the development of this module!

## Required Environment Variables

You'll need a Current RMS account and API key to use this module. Usage is as follows:

```javascript
var current = require('current-rms')(CURRENT_SUBDOMAIN, CURRENT_KEY) 
```

## Available Methods
https://api.current-rms.com/doc

## Running Tests
Tests use Mocha and Chai, and can be run with the following:

```
CURRENT_KEY=[your Current API key] CURRENT_SUBDOMAIN=[Your Current subdomain] npm test
```
