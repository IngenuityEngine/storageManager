
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var AWS = require('aws-sdk')
var s3 = require('s3')


// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')
var s3Config = require('./awsconfig').s3 // To get the bucket name



// Main Script
/////////////////////////
var s3Storage = module.exports = StorageManager.Base.extend({


start: function(options, callback)
{
	//This path should load to a config.json file
	//with accessKeyId, secretAccessKey and region
	//fields corresponding to S3's credentials.
	AWS.config.loadFromPath('C:/dev/config.json')

	this.AWSConnection = new AWS.S3()
	var awsOptions =
	{
		s3Client: this.AWSConnection
	}
	this.client = s3.createClient(awsOptions)
	this.bucket = s3Config.bucket
	callback()
},

listFiles: function(path, callback)
{
	var fileList = this.client.listObjects(
	{
		s3Params:{
			Bucket : this.bucket
		},
		recursive:true
	})

	var results = undefined

	fileList.on('error', function(err)
	{
		console.log("Error listing files")
		callback(err)
	})
	.on('end', function()
	{
		console.log("Done!")
		callback(null, results)
	})
	.on('data', function(data)
	{
		//console.log("data",data)
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

	var downloader = this.client.downloadFile(params)
	.on('error', function(err)
	{
		callback(err)
	})
	.on('end', function() {
		callback()
	})
},

addFile: function(file, path, callback)
{
	console.log("found this")
	var params =
	{
		localFile: path,
		s3Params:
			{
				Bucket: this.bucket,
				Key: file
			}
	}

	//var uploader =
	this.client.uploadFile(params)
	.on('error', function(err)
	{
		console.error("An error occurred uploading the file")
	})
	.on('end', function()
	{
		console.log("done uploading")
	})
		callback()

},

getFileUrl: function(info, options, callback)
{
	// use info (ex id or name) to build a file path
	return s3.getPublicUrlHttp(this.bucket, info)
},

// end of class
})

StorageManager.addPlugin('s3', s3Storage)

