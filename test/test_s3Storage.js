
// Vendor Modules
/////////////////////////
var expect = require('expect.js')

// Our Modules
/////////////////////////
var storageManger = require('../storageManager/storageManager')

var config = require('c:/temp/config.js')

// Tests
/////////////////////////
describe('storageManger: s3Storage', function()
{

it('should load', function(done)
{
	var localStorage = storageManger.init('s3', config.s3, done)
})




// end of test suite
})