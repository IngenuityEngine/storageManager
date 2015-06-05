
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')

// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')

// Main Script
/////////////////////////
var s3Storage = module.exports = StorageManager.Base.extend({

start: function(options, callback)
{
	// do auth or whatever
	this.options = options
	callback()
},

listFiles: function(path, callback)
{
	// download a file
},

getFile: function(sourcePath, destinationPath, callback)
{
	// download a file
},

addFile: function(file, path, callback)
{
	// store a file
},

getFileUrl: function(info, options, callback)
{

	// use info (ex id or name) to build a file path

},

// end of class
})

StorageManager.addPlugin('s3', s3Storage)
