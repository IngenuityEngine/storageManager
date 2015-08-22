
# Storage Manager

Simplifies file storage by abstracting a variety of cloud and local storage protocols. Implemented for local storage, Google Cloud and Amazon S3.


What to know about each:

All have the following methods:
- start: the first arguments specifies 'local', 'google' or 's3' dependent on which storage you want.
- listFiles
- getFile
- addFile
- getFileUrl
- deleteFile
- isFile

Note: the Google storage npm api has not proven to install well on Windows and has only been tested on Fedora. If you find yourself using this storageManager on Windows, be sure to comment out the googlestorage require in index.js.
Google storage needs a couple of options given to it:
	- options.storage.google.projectId
	- options.storage.google.keyFilename, which points to a json file with a service account key. (this is the same service account key as used in the cloudManager)\
	- options.storage.google.bucket, the bucket that things are stored in

s3 storage wants:
	- options.storage.s3.keyPath, which has a file containing the access key and ID
	- options.storage.s3.bucket

local storage just wants your computer.



