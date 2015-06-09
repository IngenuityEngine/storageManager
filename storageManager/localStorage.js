
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')

// Our Modules
/////////////////////////
var StorageManager = require('./storageManager')

// Main Script
/////////////////////////
var LocalStorage = module.exports = StorageManager.Base.extend({

listFiles: function(path, callback)
{
	// download a file
},

getFile: function(sourcePath, destinationPath, callback)
{
	// download a file
},

addFile: function(sourcePath, destinationPath, callback)
{
	// store a file
},

getFileUrl: function(file, callback)
{

	// use info (ex id or name) to build a file path

},

// end of class
})

StorageManager.addPlugin('local', LocalStorage)
