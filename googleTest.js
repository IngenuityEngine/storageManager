var gcloud = require('gcloud')({
	projectId: 'metal-sky-96603',
	keyFilename: '/tmp/otherGoogleConfig.json'
})


var storage = gcloud.storage()

storage.createBucket("just_another_test_bucket", function(err, bucket)
		{
			if (err)
				console.log(err.stack)
			console.log(bucket)
		}

		)
storage.getBuckets(function(err,buckets, nextQuery)
		{
			if (err)
			{
				console.log("Sad error")
				console.log(err.stack)
			}
			console.log("buckets")
			console.log(buckets)
		}
	 )

