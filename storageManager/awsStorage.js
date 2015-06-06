var AWS = require('aws-sdk')
var s3 = require('s3')

AWS.config.loadFromPath('C:/dev/config.json')
var awsS3Client = new AWS.S3()
var options = {
	s3Client: awsS3Client
}
var client = s3.createClient(options)

var fileList = client.listObjects(
	{
		s3Params:
		{
			Bucket : "ingenuitystudios"
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
