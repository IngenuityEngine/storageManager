
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
			}
			else
			{
			//	console.log(data)
				done(null, data)
			}
		})

	})

	it('should add a file', function(done)
	{
		var googleStorage = storageManager.start('google', 'lala', function(){})
		googleStorage.addFile('/woo.txt', 'subFolderTest/secondwoo.txt', done)

	})

	it('should download a file', function(done)
	{
		var googleStorage = storageManager.start('google', 'whatev', function(){})
		googleStorage.getFile("woo.txt", "/otherwoo.txt", done)
	})

	it('should give back a URL', function(done)
	{
		var s3Storage = storageManager.start('google', 'dont care', function(){})
		s3Storage.getFileUrl("woo.txt", function(err, url)
		{
			if (err)
				{
					done(err)
				}
			else
				{
					console.log(url)
					done()
				}
		})
	}) 



// end of test suite
})
