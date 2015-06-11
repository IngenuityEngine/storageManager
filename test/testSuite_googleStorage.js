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
var after = global.after
//var config = require('c:/temp/config.js')
var config = require('/tmp/config.js')

// Testing variables
var testingPath = 'testing'
var googleStorage
var localPath

describe('storageManager: googleStorage', function()
{
	this.timeout(5000)

	before(function()
	{
		googleStorage = storageManager.start('google', config, function(){})
		localPath = __dirname
	})


	it('should load', function(done)
	{
		storageManager.start('google', config, done)
	})

	it('should list Files as being empty', function(done)
	{
		googleStorage.listFiles(testingPath, function(err, data)
		{
			expect(data.length).to.equal(0)
			done(err)
		})
	})

	it('should add files ', function(done)
	{
		googleStorage.addFile(path.resolve(__dirname, 'file1.txt'), 'testing/file1.txt', function(err){
			expect(err).to.not.be.ok()
		})
		googleStorage.addFile(path.resolve(__dirname, 'file2.txt'), 'testing/subFolder/otherSubFolder/file2.txt', function(err){
			expect(err).to.not.be.ok()
		})
		googleStorage.addFile(path.resolve(__dirname, 'file3.txt'), 'testing/subFolder/file3.txt', function(err){
			expect(err).to.not.be.ok()
			done()
		})
	})

	it('should get files', function(done)
	{
		googleStorage.getFile('testing/file1.txt', path.resolve(__dirname, 'downloadedfile1.txt'), function(err)
		{
		//	expect(fs.fileExists(path.resolve(__dirname), 'downloadedfile1.txt')).to.be(true)
			expect(err).to.not.be.ok()
			done()
		})
	})

	it('should throw an error when specifying a nonexistent file to add', function(done)
	{
		googleStorage.addFile(path.resolve(__dirname,'nonexistentfile.txt'), 'testing/file3.txt', function(err)
			{
				expect(err).to.be.ok()
				done()
			})
	})

	it('should throw an error when trying to overwrite a file', function(done)
	{
		googleStorage.addFile(path.resolve(__dirname, 'corruptfile1.txt'), 'testing/file1.txt', function(err)
		{
			expect(err).to.be.ok()
			done()
		})
	})

	it('should list files with stuff inside of them', function(done)
	{
		googleStorage.listFiles(testingPath, function(err, data)
		{
			expect(data.length).to.not.equal(0)
		})
		googleStorage.listFiles('testing/subFolder/otherSubFolder', function(err, data)
		{
			expect(data.length).to.equal(1)
			done()
		})
	})

	it('should give back file URL for a given file', function(done)
	{
		googleStorage.getFileUrl('testing/file1.txt', function(err, data)
		{
			//check data
			expect(data).to.be.ok()
			done()
		})
	})

	it('should throw an error trying to remove a nonexistent file', function(done)
	{
		googleStorage.deleteFile('testing/file4.txt', function(err)
		{
			expect(err).to.be.ok()
			done()
		})
	})

	it('should remove files cleanly', function(done)
	{
		googleStorage.deleteFile('testing/file1.txt', function(err)
		{
			expect(err).to.not.be.ok()
		})
		googleStorage.deleteFile('testing/subFolder/otherSubFolder/file2.txt', function(err)
		{
			expect(err).to.not.be.ok()
		})
		googleStorage.deleteFile('testing/subFolder/file3.txt', function(err)
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
