// Vendor Modules
/////////////////////////
var expect = require('expect.js')
var fs = require('fs.extra')
var path = require('path')

// Our Modules
/////////////////////////
var storageManager = require('../')
var config = require('c:/temp/config.js')

// Testing variables
var testingPath
var localStorage
var localPath

describe('storageManager: localStorage', function()
{
	this.timeout(5000)

	before(function()
	{
		fs.mkdir('testing', function(){})
		testingPath = path.resolve('testing')
		localStorage = storageManager.start('local', null, function(){})
		localPath = __dirname
	})


	it('should load', function(done)
	{
		var testStorage = storageManager.start('local', null, done)
	})

	it('should list Files as being empty', function(done)
	{
		//var localStorage = storageManager.start('local', 'nothing', function(){})
		localStorage.listFiles(testingPath, function(err, data)
		{
			expect(data.length).to.equal(0)
			done(err)
		})
	})

	it('should add files ', function(done)
	{
		localStorage.addFile(path.resolve(__dirname, 'file1.txt'), 'testing/file1.txt',
		localStorage.addFile(path.resolve(__dirname, 'file2.txt'), 'testing/subFolder/otherSubFolder/file2.txt',
		localStorage.addFile(path.resolve(__dirname, 'file3.txt'), 'testing/subFolder/file3.txt', done)))
	})

	it('should throw an error when specifying a nonexistent file to add', function(done)
	{
		localStorage.addFile(path.resolve(__dirname,'nonexistentfile.txt'), 'testing/file3.txt', function(err, data)
			{
			expect(err).to.exist
			done()
			})
	})

	it('should throw an error when trying to overwrite a file', function(done)
	{
		localStorage.addFile(path.resolve(__dirname, 'corruptfile1.txt'), 'testing/file1.txt', function(err, data)
		{
			expect(err).to.exist
			done()
		})
	})

	it('should list files with stuff inside of them', function(done)
	{
		localStorage.listFiles(testingPath, function(err, data)
		{
			console.log(data)
		})
		localStorage.listFiles(path.resolve(testingPath, 'subFolder'), function(err, data)
		{
			console.log(data)
			done()
		})
	})

	it('should give back file URL for a given file', function(done)
	{
		localStorage.getFileUrl('testing/file1.txt', done)
	})

	it('should throw an error trying to remove a nonexistent file', function(done)
	{
		localStorage.deleteFile('testing/file4.txt', function(err, data)
		{
			expect(err).to.exist
			done()
		})
	})

	it('should remove files cleanly', function(done)
	{
		localStorage.deleteFile('testing/file1.txt',
		localStorage.deleteFile('testing/subFolder/otherSubFolder/file2.txt',
		localStorage.deleteFile('testing/subFolder/file3.txt', done)))
	})

	after(function()
	{
		fs.rmrf('testing')
	})

})