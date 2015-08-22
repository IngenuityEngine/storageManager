
// Vendor Modules
/////////////////////////
// var async = require('async')
//var _ = require('lodash')
var fs = require('fs.extra')
var path = require('path')

// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')

// Main Script
/////////////////////////
var LocalStorage = module.exports = StorageManager.Base.extend({

// Callback gets two functions (err, file)
listFiles: function(filePath, callback)
{
	fs.readdir(filePath, callback)
},


getFile: function(sourcePath, destinationPath, callback)
{
	fs.mkdirp(path.parse(destinationPath).dir, function(err)
	{
		if (err)
			return callback(err)
		fs.copy(sourcePath, destinationPath, callback)
	})
},

addFile: function(sourcePath, destinationPath, callback)
{
	//Identical because the file system is the same
	this.getFile(sourcePath, destinationPath, callback)
},

getFileUrl: function(file, callback)
{
	callback(null, path.resolve(file))
},

deleteFile: function(file, callback)
{
	fs.unlink(file, callback)
},

// end of class
})

StorageManager.addPlugin('local', LocalStorage)
