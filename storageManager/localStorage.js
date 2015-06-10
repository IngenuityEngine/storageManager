
// Vendor Modules
/////////////////////////
// var async = require('async')
var _ = require('lodash')
var fs = require('fs')
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
	var calledBack = false

	var mkdirParent = function(dirPath, internalCall)
	{
		fs.mkdir(dirPath, 0777, function(error)
		{
			if (error && error.code === 'ENOENT')
			{
				mkdirParent(path.dirname(dirPath), internalCall)
				mkdirParent(dirPath, internalCall)
			}
			internalCall && internalCall(error)
		})
	}

	mkdirParent(path.parse(sourcePath).dir,
	mkdirParent(path.parse(destinationPath).dir, function()
	{
		var read = fs.createReadStream(sourcePath,
		{
			flags: 'r'
		})
		read.on("error", function(err)
		{
			done(err)
		})

		var write = fs.createWriteStream(destinationPath,
		{
			flags: 'wx'
		})
		write.on("error", function(err)
		{
			console.log("An error is made!")
			write.destroy()
			done(err)
		})
		write.on("close", function(ex)
		{
			done()
		})

	read.pipe(write)
	}))

	function done(err)
	{
		if (!calledBack)
		{
			callback(err)
			calledBack = true
		}
	}

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

isFile: function(file, callback)
{

}

// end of class
})

StorageManager.addPlugin('local', LocalStorage)
