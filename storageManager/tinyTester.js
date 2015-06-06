var storageManager = require('../')
var config = require('c:/dev/config.json')


function genericCallback ()
{
	console.log("Generically called back")
}
var storage = storageManager.start('s3', config, genericCallback)

//storage.listFiles("", genericCallback)
//storage.addFile("woo.txt", "woo.txt",
//storage.listFiles(""))
storage.getFile("just_a_test.txt", "C:/dev/storageManager/storageManager/just_a_test.txt", genericCallback)
storage.getFileUrl("just_a_test.txt")
storage.getFileUrl("woo.txt")