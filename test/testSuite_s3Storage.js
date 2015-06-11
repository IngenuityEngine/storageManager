// Vendor Modules
/////////////////////////
var expect = require('expect.js')
var fs = require('fs.extra')
var path = require('path')

// Our Modules
/////////////////////////
var storageManager = require('../')
var config = require('C:/temp/config.js')

var describe = global.describe
var before = global.before
var it = global.it
var after = global.after

// Testing variables
var testingPath = "testing"
var s3Storage

describe('storageManager: s3Storage', function()
{
	this.timeout(5000)

	before(function()
	{
		s3Storage = storageManager.start('s3', config, function(){})
	})


	it('should load', function(done)
	{
		storageManager.start('s3', config, done)
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
		s3Storage.addFile(path.resolve(__dirname, 'file1.txt'), 'testing/file1.txt', function(err){
			expect(err).to.not.be.ok()
		})
		s3Storage.addFile(path.resolve(__dirname, 'file2.txt'), 'testing/subFolder/otherSubFolder/file2.txt', function(err){
			expect(err).to.not.be.ok()
		})
		s3Storage.addFile(path.resolve(__dirname, 'file3.txt'), 'testing/subFolder/file3.txt', function(err){
			expect(err).to.not.be.ok()
			done()
		})
	})

	it('should get files', function(done)
	{
		s3Storage.getFile('testing/file1.txt', path.resolve(__dirname, 'downloadedfile1.txt'), function(err)
		{
			//expect(fs.fileExists(path.resolve(__dirname), 'downloadedfile1.txt')).to.be(true)
			expect(err).to.not.be.ok()
			done()
		})
	})


	it('should throw an error when specifying a nonexistent file to add', function(done)
	{
		s3Storage.addFile(path.resolve(__dirname,'nonexistentfile.txt'), 'testing/file3.txt', function(err)
			{
				expect(err).to.be.ok()
				done()
			})
	})

/*	it('should throw an error when trying to overwrite a file', function(done)
	{
		s3Storage.addFile(path.resolve(__dirname, 'corruptfile1.txt'), 'testing/file1.txt', function(err)
		{
			expect(err).to.be.ok()
			done()
		})
	}) */

	it('should list files with stuff inside of them', function(done)
	{
		s3Storage.listFiles(testingPath, function(err, data)
		{
			expect(data.length).to.not.equal(0)
		})
		s3Storage.listFiles('testing/subFolder/otherSubFolder', function(err, data)
		{
			expect(data.length).to.equal(1)
			done()
		})
	})

	it('should give back file URL for a given file', function(done)
	{
		s3Storage.getFileUrl('testing/file1.txt', function(err, data)
		{
			console.log(data)
			expect(data).to.be.equal('http://'+config.storage.s3.bucket+'.s3.amazonaws.com/testing/file1.txt')
			done()
		})
	})

/*	it('should throw an error trying to remove a nonexistent file', function(done)
	{
			console.log(s3Storage.isFile('testing/file4.txt', function(){}))
		s3Storage.deleteFile('testing/file4.txt', function(err)
		{
			expect(err).to.be.ok()
			done()
		})
	})  */

	it('should remove files cleanly', function(done)
	{
		s3Storage.deleteFile('testing/file1.txt', function(err)
		{
			expect(err).to.not.be.ok()
		})
		s3Storage.deleteFile('testing/subFolder/otherSubFolder/file2.txt', function(err)
		{
			expect(err).to.not.be.ok()
		})
		s3Storage.deleteFile('testing/subFolder/file3.txt', function(err)
		{
			expect(err).to.not.be.ok()
			done()
		})
	})

	after(function()
	{
		fs.rmrf('testing')
	})

})