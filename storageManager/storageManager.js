
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var Class = require('uberclass')


// Main Script
/////////////////////////
var StorageManager = module.exports = {


// Base class
Base: Class.extend({

	init: function()
	{
		_.bindAll(this)
	},

	start: function(options, callback)
	{
		this.options = options
		callback()
	},

	listFiles: function(filePath, callback)
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

	deleteFile : function(file, callback)
	{
		//delete a file
	},

	getFileUrl: function(file, callback)
	{
		// use info (ex id or name) to build a file path
	},

	isFile: function(file, callback)
	{
		// Check whether file exists
	},

	listDirs: function(path, callback)
	{
		//List all directories in a certain path
	},

// end of class
}),


// Plugin Management
/////////////////////////
start: function(pluginName, options, callback)
{
	var storageManager = new StorageManager.plugins[pluginName]()
	storageManager.start(options, callback)
	return storageManager
},

plugins: {},

addPlugin: function(pluginName, plugin)
{
	StorageManager.plugins[pluginName] = plugin
}


// end of module
}

