// coren --test plugins/coren_permissionsManager/test/test_permissionsManager.js

// Vendor Modules
/////////////////////////
var expect = require('expect.js')

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

it('should get files', function(done)
{
	var s3Storage = storageManager.start('s3', config.s3, function(){})
	s3Storage.listFiles("", done)
})

it('should download a file', function(done)
{
	var s3Storage = storageManager.start('s3', config.s3, function(){})
	s3Storage.getFile("just_a_test.txt", "C:/Downloads/just_a_test.txt", done)

})

/*it('should throw an error downloading file', function(done)
{
	var s3Storage = storageManager.start('s3', config.s3, function(){})
	s3Storage.getFile("just_a_text.txt", "C:/Downloads/just_a_text.txt", function(err, data)
	{
		console.log("Errror ", err)
		expect(err).to.be.an.instanceof(Error)
		done()
	})

}) */

it('should add a file', function(done)
{
	var s3Storage = storageManager.start('s3', config.s3, function(){})
	s3Storage.addFile('woo.txt', 'woo.txt', done)
})




// end of test suite
})

var s3Storage = storageManager.start('s3', config.s3, function(){})
s3Storage.getFile("just_a_text.txt", 'C:/Downloads/just_a_text.txt',function(err, data)
{
	if (err)
		console.log(err)
	else
		console.log(data)
} )
