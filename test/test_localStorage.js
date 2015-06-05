
// Vendor Modules
/////////////////////////
var expect = require('expect.js')

// Our Modules
/////////////////////////
var storageManger = require('../')

var config = require('c:/temp/config.js')


// Tests
/////////////////////////
describe('storageManger: localStorage', function()
{

it('should load', function(done)
{
	var localStorage = storageManger.init('local', config.s3, done)
})




// end of test suite
})