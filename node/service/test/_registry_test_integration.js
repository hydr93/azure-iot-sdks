// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var uuid = require('uuid');
var ConnectionString = require('../lib/connection_string.js');
var runTests = require('./_registry_common_testrun.js');

function makeConnectionString(host, policy, key) {
  return 'HostName=' + host + ';SharedAccessKeyName=' + policy + ';SharedAccessKey=' + key;
}

var connectionString = process.env.IOTHUB_CONNECTION_STRING;
var cn = ConnectionString.parse(connectionString);

var badConnStrings = [
  makeConnectionString('bad-' + uuid.v4(), cn.SharedAccessKeyName, cn.SharedAccessKey),
  makeConnectionString(cn.HostName, 'bad' + uuid.v4(), cn.SharedAccessKey),
  makeConnectionString(cn.HostName, cn.SharedAccessKeyName, 'bad' + uuid.v4()),
];

describe('Over real HTTPS', function () {
  this.timeout(60000);
  runTests(null, connectionString, badConnStrings);
});
