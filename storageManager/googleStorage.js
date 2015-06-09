
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var gcloud = require('gcloud')({
	projectId: 'metal-sky-96603',
	keyFilename: '/tmp/otherGoogleConfig.json'
})
var fs = require('fs')
//bucket name
var config =
{
	bucket: 'just_a_test'
}



// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')

// Main Script
/////////////////////////
var googleStorage = module.exports = StorageManager.Base.extend({

start: function(options, callback)
{
	this.storage = gcloud.storage()
	this.bucket = this.storage.bucket(config.bucket)
	callback()
},




listFiles: function(path, callback)
{
	this.bucket.getFiles(function(err, files, nextQuery, apiResponse)
			{
				if (err)
					callback(err)
				else
					callback(null, files)
			})
},

getFile: function(sourcePath, destinationPath, callback)
{
	bucket
},

addFile: function(sourcePath, destinationPath, callback)
{
	var options = 
	{
		destination: destinationPath,
		resumable: true,
		validation: 'crc32c',
	}
	this.bucket.upload(sourcePath, options, function(err, file)
			{
				if (err)
				{
					console.log(err.stack)
					callback(err)
				}
				else
				{
					callback()
				}
			})
},

getFileUrl: function(file, callback)
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
