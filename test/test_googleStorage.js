
// Vendor Modules
/////////////////////////
var expect = require('expect.js')
var _ = require('lodash')
// Our Modules
/////////////////////////
var storageManager = require('../')

//var config = require('c:/temp/config.js')


// Tests
/////////////////////////
describe('storageManger: googleStorage', function()
{
	this.timeout(10000)

	it('should load', function(done)
	{
		var googleStorage = storageManager.start('google', 'blah blah', done)
	})

	it('should list files', function(done)
	{
		var googleStorage = storageManager.start('google', 'hey', function(){})
		googleStorage.listFiles("subFolderTest", function(err, data)
		{
			if (err)
			{
				console.log(err.data)
				done(err)
			}
			else
			{
				_.forEach(data, function(toPrint)
						{
							console.log(toPrint)
						})
				done(null, data)
			}
		})

	})

	it('should add a file', function(done)
	{
		var googleStorage = storageManager.start('google', 'lala', function(){})
		googleStorage.addFile('/woo.txt', 'thirdorsecondwoo.txt', done)

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

	it('should give us info if a file doesn\'t exist', function(done)
	{
		var googleStorage = storageManager.start('google','huh', function(){})
		googleStorage.isFile('blah di blah.txt', function(err, fileBool)
				{
					expect(fileBool).to.be(false)
					done(err)
				})

	})


	it('should give us info if a file exists', function(done)
	{
		var googleStorage = storageManager.start('google','huh', function(){})
		googleStorage.isFile('woo.txt', function(err, fileBool)
				{
					expect(fileBool).to.be(true)
					done(err)
				})

	}) 
// end of test suite
})
