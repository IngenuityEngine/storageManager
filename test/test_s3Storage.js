// coren --test plugins/coren_permissionsManager/test/test_permissionsManager.js

// Vendor Modules
/////////////////////////
var expect = require('expect.js')

// Our Modules
/////////////////////////
var storageManager = require('../')

var config = require('c:/temp/config.js')

// Tests
/////////////////////////
describe('storageManager: s3Storage', function()
{

it('should load', function(done)
{
	var s3Storage = storageManager.start('s3', config.s3, done)
	s3Storage.listFiles("", done)

})






// end of test suite
})