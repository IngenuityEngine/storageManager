
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var gcloud = require('gcloud')({
	projectId: 'metal-sky-96603',
	keyFilename: '/tmp/otherGoogleConfig.json'
})
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
	this.bucket.getFiles(
			{
				prefix: path
			},function(err, files, nextQuery, apiResponse)
	{
				if (err)
				{
					callback(err)
				}
				else
				{
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
				}
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
	//	resumable: true,
		validation: 'crc32c',
	}
	this.bucket.upload(sourcePath, options, function(err, file)
		{
				if (err)
				{
					callback(err)
				}
				else
				{
					callback()
				}
			})
},

// May not retrieve a valid link!
//If this were to be bercome a more secure private app, better to use file.getSignedUrl method
// which returns a temporary link (time to be specified)
getFileUrl: function(file, callback)
{
	var url = "http://storage.googleapis.com/"+config.bucket+"/"+file
	callback(null, url)
},



deleteFile : function(file, callback)
{
	var fileToDelete = this.bucket.file(file)
	fileToDelete.delete(function(err)
			{ 
			callback(err)
			})	
//	console.log(fileToDelete)
/*	this.isFile(file, function(err, fileBool)
	{
		if (fileBool)
		{
			filetoDelete.delete(function(err)
			{
				callback(err)
			}) // potentially function(err, apiResponse)
		}
		else
		{
				callback(new Error("The file you tried to delete does not exist"))
		}
	})*/
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

// end of class
})

StorageManager.addPlugin('google', googleStorage)
