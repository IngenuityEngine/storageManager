
// Vendor Modules
/////////////////////////
// var async = require('async')
//var _ = require('lodash')
var AWS = require('aws-sdk')
var s3 = require('s3')


// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')



// Main Script
/////////////////////////
var s3Storage = module.exports = StorageManager.Base.extend({


start: function(options, callback)
{
	//This path should load to a config.json file
	//with accessKeyId, secretAccessKey and region
	//fields corresponding to S3's credentials.
	AWS.config.loadFromPath(options.storage.s3.keyPath)

	this.AWSConnection = new AWS.S3()
	var awsOptions =
	{
		s3Client: this.AWSConnection
	}
	this.AWSConnection = new AWS.S3()
	this.client = s3.createClient(awsOptions)
	this.bucket = options.storage.s3.bucket
	callback()
},

listFiles: function(path, callback)
{
	var fileList = this.client.listObjects(
	{
		s3Params:{
			Bucket : this.bucket,
			Prefix: path
		},
		recursive:true
	})

	var results

	fileList.on('error', function(err)
	{
		console.log('Error listing files')
		callback(err)
	})
	.on('end', function()
	{
		callback(null, results)
	})
	.on('data', function(data)
	{
		if (results)
			results += data.Contents
		else
			results = data.Contents
	})
},

getFile: function(sourcePath, destinationPath, callback)
{
	var params =
	{
		localFile: destinationPath,
		s3Params:
		{
			Bucket: this.bucket,
			Key: sourcePath,
		},
	}

	this.client.downloadFile(params)
	.on('error', function(err)
	{
		callback(err)
	})
	.on('end', function()
	{
		callback()
	})
},

addFile: function(sourcePath, destinationPath, callback)
{
	var params =
	{
		localFile: sourcePath,
		s3Params:
			{
				Bucket: this.bucket,
				Key: destinationPath
			}
	}

	this.client.uploadFile(params)
	.on('error', function(err)
	{
		callback(err)
	})
	.on('end', function()
	{
		callback()
	})
},

deleteFile: function(file, callback)
{
	var params =
	{
		Bucket: this.bucket,
		Delete:
		{
			Objects:
			[{
					Key: file
			}]
		}
	}

	this.client.deleteObjects(params)
	.on('error', function(err)
	{
		callback(err)
	})
	.on('end', function()
	{
		callback()
	})
},

//Note: this method may timeout and return false; can be called several times in approx five-second
// intervals to counter this potential mistake
isFile: function(file, callback)
{
	var params =
	{
		Bucket: this.bucket,
		Key: file
	}
	this.AWSConnection.headObject(params, function(err)
	{
		if (err)
			callback(null, false)
		else
			callback(null, true)
	})
},


getFileUrl: function(file, callback)
{
	var tmpBucket = this.bucket
	this.isFile(file, function(err, fileExists){
		if (err)
			return callback(err)
		if (fileExists)
			callback(null, s3.getPublicUrlHttp(tmpBucket, file))
		else
			callback(new Error(file,' does not exist!'))
	})
},

// end of class
})

StorageManager.addPlugin('s3', s3Storage)

