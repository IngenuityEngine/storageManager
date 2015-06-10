// Vendor Modules
/////////////////////////
var expect = require('expect.js')
var fs = require('fs.extra')
var path = require('path')

// Our Modules
/////////////////////////
var storageManager = require('../')

var describe = global.describe
var before = global.before
var it = global.it

// Testing variables
var testingPath = "testing"
var s3Storage
var localPath

describe('storageManager: s3Storage', function()
{
	this.timeout(5000)

	before(function()
	{
		//fs.mkdir('testing', function(){})
		//testingPath = path.resolve('testing')
		s3Storage = storageManager.start('s3', null, function(){})
		localPath = __dirname
	})


	it('should load', function(done)
	{
		storageManager.start('s3', null, done)
	})

	it('should list Files as being empty', function(done)
	{
		s3Storage.listFiles(testingPath, function(err, data)
		{
			expect(data.length).to.equal(0)
			done(err)
		})
	})

	it('should add files ', function(done)
	{
		s3Storage.addFile(path.resolve(__dirname, 'file1.txt'), 'testing/file1.txt', function(){})
		s3Storage.addFile(path.resolve(__dirname, 'file2.txt'), 'testing/subFolder/otherSubFolder/file2.txt', function(){})
		s3Storage.addFile(path.resolve(__dirname, 'file3.txt'), 'testing/subFolder/file3.txt', done)
	})

	it('should get files', function(done)
	{
		s3Storage.getFile('testing/file1.txt', path.resolve(__dirname, 'downloadedfile1.txt'), done)
	})


	it('should throw an error when specifying a nonexistent file to add', function(done)
	{
		s3Storage.addFile(path.resolve(__dirname,'nonexistentfile.txt'), 'testing/file3.txt', function(err)
			{
				expect(err).to.exist
				done()
			})
	})

	it('should throw an error when trying to overwrite a file', function(done)
	{
		s3Storage.addFile(path.resolve(__dirname, 'corruptfile1.txt'), 'testing/file1.txt', function(err, data)
		{
			expect(err).to.exist
			done()
		})
	})

	it('should list files with stuff inside of them', function(done)
	{
		s3Storage.listFiles(testingPath, function(err, data)
		{
			//console.log(data)
		})
		s3Storage.listFiles('testing/subFolder/otherSubFolder', function(err, data)
		{
			//console.log(data)
			done()
		})
	})

	it('should give back file URL for a given file', function(done)
	{
		s3Storage.getFileUrl('testing/file1.txt', function(err, data)
		{
			//console.log(data)
			done()
		})
	})

	it('should throw an error trying to remove a nonexistent file', function(done)
	{
		s3Storage.deleteFile('testing/file4.txt', function(err, data)
		{
			expect(err).to.exist
			done()
		})
	})

	it('should remove files cleanly', function(done)
	{
		s3Storage.deleteFile('testing/file1.txt', function(){})
		s3Storage.deleteFile('testing/subFolder/otherSubFolder/file2.txt', function(){})
		s3Storage.deleteFile('testing/subFolder/file3.txt', done)
	})

	after(function()
	{
		fs.rmrf('testing')
	})

})