
// Vendor Modules
/////////////////////////
var expect = require('expect.js')

// Our Modules
/////////////////////////
var storageManager = require('../')

//var config = require('c:/temp/config.js')


// Tests
/////////////////////////
describe('storageManger: googleStorage', function()
{

it('should load', function(done)
{
	var googleStorage = storageManager.start('google', "lala", done)
})




// end of test suite
})