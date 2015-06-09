
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
	var googleStorage = storageManager.start('google', 'blah blah', done)
})

it('should add a file', function(done)
	{
		var googleStorage = storageManager.start('google', 'lala', function(){})
		googleStorage.addFile('woo.txt', 'woo.txt', done)

	}
  )



// end of test suite
})
