// coren --test plugins/coren_permissionsManager/test/test_permissionsManager.js

// Vendor Modules
/////////////////////////
var expect = require('expect.js')
var _ = require('lodash')

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
	})

	it('should add files', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.addFile("woo.txt", "test/woo.txt", done)
	})

	it('should list files', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.listFiles("", function(err, data)
		{
			if (err)
			{
				done(err)
			}
			else
			{
				var keys = _.map(data, function(entry){return entry.Key})
				_(keys).forEach(function (x)
				{
					expect(_.contains(['woo.txt', 'another folder/'], x)).to.be(true)
				})
				done()
			}
		})
	})

	it('should download a file', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.getFile("woo.txt", "C:/Downloads/woo.txt", done)
	})

	it('should give back a URL', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.getFileUrl("woo.txt", function(err, url)
		{
			if (err)
				{
					done(err)
				}
			else
				{
					expect(url).to.equal("http://ingenuitystudios.s3.amazonaws.com/woo.txt")
					done()
				}
		})
	})



	it('should throw an error downloading file', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.getFile("just_a_text.txt", "C:/Downloads/just_a_text.txt", function(err, data)
		{
			console.log("Errror ", err)
			//expect(err).to.be.an.instanceof(Error)
			done(err)
		})
	})


// end of test suite
})
