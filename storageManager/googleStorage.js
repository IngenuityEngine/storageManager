
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var gcloud = require('gcloud')({
	projectId: 'ingenuitystudios',
	keyFilename: '/tmp/gConfig.json'
})
var fs = require('fs')




// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')

// Main Script
/////////////////////////
var googleStorage = module.exports = StorageManager.Base.extend({

start: function(options, callback)
{
	this.storage = gcloud.storage()
	this.bucket = this.storage.bucket('test')
	this.storage.getBuckets(function(err, buckets, nextQuery)
			{
				console.log("found buckets",buckets)
				console.log(err, "were errors")
			})

	callback()
},




listFiles: function(path, callback)
{
	// download a file
},

getFile: function(sourcePath, destinationPath, callback)
{
	bucket
},

addFile: function(file, path, callback)
{
	fs.createReadStream(sourcePath).pipe(this.bucket.file(destinationPath).createWriteStream())
	callback()
},

getFileUrl: function(info, options, callback)
{

	// use info (ex id or name) to build a file path

},



deleteFile : function(file, callback)
{
	//delete a file
},



isFile: function(file, callback)
{
	// Check whether file exists
},

listDirs: function(path, callback)
{
	//List all directories in a certain path
},

makeDir: function(path, callback)
{
	//Creates a new directory in the specified location
},

removeDir: function(path, callback)
{
	//Removes a directory and all its contents
}

// end of class
})

StorageManager.addPlugin('google', googleStorage)
