
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
this.timeout(5000)

it('should load', function(done)
{
	var googleStorage = storageManager.start('google', 'blah blah', done)
})

it('should list files', function(done)
{
	var googleStorage = storageManager.start('google', 'hey', function(){})
	googleStorage.listFiles("", function(err, data)
			{
			if (err)
			{
				console.log(err.data)
				done(err)
			})
	
})

it('should add a file', function(done)
	{
		var googleStorage = storageManager.start('google', 'lala', function(){})
		googleStorage.addFile('/woo.txt', 'woo.txt', done)

	}
  )



// end of test suite
})
