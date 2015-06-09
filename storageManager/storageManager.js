
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

	deleteFile : function(file, callback)
	{
		//delete a file
	},

	getFileUrl: function(info, callback)
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

	makeDir: function(path, callback)
	{
		//Creates a new directory in the specified location
	},

	removeDir: function(path, callback)
	{
		//Removes a directory and all its contents
	}

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
	console.log(pluginName, "gets called to become plugin")
	StorageManager.plugins[pluginName] = plugin
}


// end of module
}

