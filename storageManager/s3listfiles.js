// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var AWS = require('aws-sdk')
var s3 = require('s3')


// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')
var awsConfig = require('./awsconfig').s3

AWS.config.loadFromPath('C:/dev/config.json')
	var AWSClient = new AWS.S3()
	var awsOptions =
	{
		s3Client: AWSClient
	}

var bucket = awsConfig.bucket
var client = s3.createClient(awsOptions)

var bucket = "ingenuitystudios"
var fileList = client.listObjects(
	{
		s3Params:{
			Bucket : bucket
		},
		recursive:true
	})
	var result


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
		result += data
		console.log("data",data)
	})
	.on('progress', function()
	{
		console.log("progress", fileList.progressAmount, fileList.progressTotal)
	})