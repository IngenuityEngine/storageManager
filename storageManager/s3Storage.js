
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
	var AWSClient = new AWS.S3()
	var awsOptions =
	{
		s3Client: AWSClient
	}
	this.client = s3.createClient(awsOptions)
	this.bucket = s3Config.bucket
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

	fileList.on('error', function(err)
	{
		console.log("Error:", err)
	})
	.on('end', function()
	{
		console.log("Done!")
	})
	.on('data', function(data)
	{
		console.log("data",data)
	})
	.on('progress', function()
	{
		console.log("progress", fileList.progressAmount, fileList.progressTotal)
	})

	callback()
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
		console.log("an error occurred while downloading the file")
		callback(err)
	})
	.on('progress', function()
	{
		console.log("progress", downloader.progressAmount, downloader.progressTotal);
	})
	.on('end', function() {
		console.log("done downloading")

	})
},

addFile: function(file, path, callback)
{
	console.log("found this")
	var params = {
	localFile: "C:/dev/storageManager/storageManager/woo.txt",

	s3Params:
		{
			Bucket:"ingenuitystudios",
			Key:'woo.txt'
		}
	}

	var uploader = this.client.uploadFile(params)
	.on('error', function(err)
	{
		console.error("unable to upload:", err.stack)
	})
	.on('progress', function()
	{
		console.log("progress", uploader.progressMd5Amount,
		uploader.progressAmount, uploader.progressTotal)
	})
	.on('end', function()
	{
		console.log("done uploading");
	})
},

getFileUrl: function(info, options, callback)
{

	// use info (ex id or name) to build a file path
	var result = s3.getPublicUrlHttp(this.bucket, info)
	console.log(result)
},

// end of class
})

StorageManager.addPlugin('s3', s3Storage)

