
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var gcloud = require('gcloud')

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
	this.storage = gcloud.storage(
	{
		projectId: options.storage.google.projectId,
		keyFilename: options.storage.google.keyFilename,
	})
	this.bucket = this.storage.bucket(options.storage.google.bucket)
	callback()
},




listFiles: function(path, callback)
{
	this.bucket.getFiles(
	{
		prefix: path
	},
	function(err, files)
	{
		if (err)
		{
			return callback(err)
		}
		var fileData=[]
		_.forEach(files, function(entry)
		{
			var data =
			{
				key: entry.metadata.name,
				name: entry.metadata.name,
				size: entry.metadata.size,
				updated: entry.metadata.updated
			}
			fileData.push(data)
		})

		callback(null, fileData)
	})
},

getFile: function(sourcePath, destinationPath, callback)
{
	var fileToDownload = this.bucket.file(sourcePath)
	fileToDownload.download(
		{
			destination: destinationPath
		},
		callback)
},

addFile: function(sourcePath, destinationPath, callback)
{
	var options =
	{
		destination: destinationPath,
	//	resumable: true,
		validation: 'crc32c',
	}
	this.bucket.upload(sourcePath, options, callback)
},

// May not retrieve a valid link!
//If this were to be bercome a more secure private app, better to use file.getSignedUrl method
// which returns a temporary link (time to be specified)
getFileUrl: function(file, callback)
{
	var url = 'http://storage.googleapis.com/'+config.bucket+'/'+file
	callback(null, url)
},



deleteFile : function(file, callback)
{
	var fileToDelete = this.bucket.file(file)
	fileToDelete.delete(callback)
},



isFile: function(file, callback)
{
	var fileToGet = this.bucket.file(file)
	fileToGet.getMetadata(function(err)
			{
			 if (err)
				 callback(null, false)
			else
				callback(null, true)
			})
},

// end of class
})

StorageManager.addPlugin('google', googleStorage)
