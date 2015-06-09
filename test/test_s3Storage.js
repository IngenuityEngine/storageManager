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

	this.timeout(5000)

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

	it('should throw a download error if file doesn\'t exist', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.getFile('hello.txt', 'C:/dev/hello.txt', function(err, data)
		{
			expect(err).to.exist
			done()
		})
	})


	it('should throw a URL error', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.getFileUrl("elephant.txt", function(err, url)
		{
			expect(err).to.exist
			done()
		})
	})

	it('should list directories', function(done)
	{
		var s3Storage = storageManager.start('s3', config.s3, function(){})
		s3Storage.listDirs("", function(err, dirs)
		{
			expect(dirs[0].Key).to.be.equal("another folder/")
			done()
		})
	})


})

// end of test suite

