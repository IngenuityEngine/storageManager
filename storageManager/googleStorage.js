
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
	var fileToDownload = this.bucket.file(sourcePath)
	fileToDownload.download(
		{
			destination: destinationPath
		},
	       	function(err)
		{
			callback(err)
		})
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

	var fileToGet = this.bucket.file(file)
	fileToGet.getSignedUrl(
			{
				action: 'read',
				expires: Math.round(Date.now() / 1000) + (60*60*24*14), //2 weeks
			},
			function(err, url)
			{
				callback(err, url)
			})
},



deleteFile : function(file, callback)
{
	//delete a file
},



isFile: function(file, callback)
{
	var fileToGet = this.bucket.file(file)
	fileToGet.getMetadata(function(err, metaData, apiResponse)
			{ 
			 if (err)
				 callback(null, false)
			else
				callback(null, true)
			})
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
