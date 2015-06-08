
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

	getFileUrl: function(info, callback)
	{

		// use info (ex id or name) to build a file path

	},

	isFile: function (path, callback)
	{

		// Checks whether there is a file at path

	}

	//ListDirs

	//TODO
	//removeFile

	//removeDirectory

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

