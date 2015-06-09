var storageManager = require('../')
//var config = require('c:/dev/config.json')


function genericCallback ()
{
	console.log("Generically called back")
}
var storage = storageManager.start('google', "yaya", genericCallback)

//storage.listFiles("", genericCallback)
storage.addFile("justanothertest.txt", "/var/www/storageManager/storageManager/justanothertest.txt",genericCallback)
//storage.listFiles(""))
storage.getFile("justanothertest.txt", "/var/www/storageManager/storageManager/googletest.txt", genericCallback)
storage.getFileUrl("just_a_test.txt")
storage.getFileUrl("woo.txt")
storage.listFiles("")