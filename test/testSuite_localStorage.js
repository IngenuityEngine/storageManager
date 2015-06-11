// Vendor Modules
/////////////////////////
var expect = require('expect.js')
var fs = require('fs.extra')
var path = require('path')

// Our Modules
/////////////////////////
var storageManager = require('../')
var config = require('c:/temp/config.js')

var describe = global.describe
var before = global.before
var after = global.after
var it = global.it

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
		localStorage = storageManager.start('local', config, function(){})
		localPath = __dirname
	})


	it('should load', function(done)
	{
		storageManager.start('local', config, done)
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
		localStorage.addFile(path.resolve(__dirname, 'file1.txt'), 'testing/file1.txt', function(err)
		{
			expect(err).to.not.be.ok()
		})
		localStorage.addFile(path.resolve(__dirname, 'file2.txt'), 'testing/subFolder/otherSubFolder/file2.txt', function(err)
		{
			expect(err).to.not.be.ok()
		})
		localStorage.addFile(path.resolve(__dirname, 'file3.txt'), 'testing/subFolder/file3.txt', function(err)
		{
			expect(err).to.not.be.ok()
			done()
		})
	})

	it('should get files', function(done)
	{
		localStorage.getFile('testing/file1.txt', path.resolve(__dirname, 'downloadedfile1.txt'), function(err)
		{
			expect(err).to.not.be.ok()
			done()
		})
	})

	it('should throw an error when specifying a nonexistent file to add', function(done)
	{
		localStorage.addFile(path.resolve(__dirname,'nonexistentfile.txt'), 'testing/file3.txt', function(err)
			{
			expect(err).to.be.ok()
			done()
			})
	})

	it('should throw an error when trying to overwrite a file', function(done)
	{
		localStorage.addFile(path.resolve(__dirname, 'corruptfile1.txt'), 'testing/file1.txt', function(err)
		{
			expect(err).to.be.ok()
			done()
		})
	})

	it('should list files with stuff inside of them', function(done)
	{
		localStorage.listFiles(testingPath, function(err, data)
		{
			expect(data.length).to.not.equal(0)
		})
		localStorage.listFiles(path.resolve(testingPath, 'subFolder/otherSubFolder'), function(err, data)
		{
			//console.log(data)
			expect(data.length).to.equal(1)
			done()
		})
	})

	it('should give back file URL for a given file', function(done)
	{
		localStorage.getFileUrl('testing/file1.txt', function(err, data)
		{
			expect(data).to.equal(path.resolve(testingPath, 'file1.txt'))
			done()
		})
	})

	it('should throw an error trying to remove a nonexistent file', function(done)
	{
		localStorage.deleteFile('testing/file4.txt', function(err)
		{
			expect(err).to.be.ok()
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
		console.log("is this being called?")
		fs.unlink('C:/dev/storageManager/test/downloadedfile1.txt')
		fs.rmrf('C:/dev/storageManager/testing/subFolder/otherSubFolder/')
		fs.rmrf('C:/dev/storageManager/testing/subFolder/')
		fs.rmrf('C:/dev/storageManager/testing')

	})

})