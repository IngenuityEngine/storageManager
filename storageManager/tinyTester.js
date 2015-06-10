var storageManager = require('../')
//var config = require('c:/dev/config.json')


function genericCallback ()
{
	console.log("Generically called back")
}
var storage = storageManager.start('local', "yaya", genericCallback)

//storage.listFiles("", genericCallback)
//storage.addFile("justanothertest.txt", "/var/www/storageManager/storageManager/justanothertest.txt",genericCallback)
//storage.listFiles(""))
//storage.getFile("justanothertest.txt", "/var/www/storageManager/storageManager/googletest.txt", genericCallback)
storage.getFileUrl("just_a_test.txt", function(err, data){
	console.log(data)
})
storage.getFileUrl("woo.txt", function(err, data){
	console.log(data)
})
storage.listFiles("C:/dev/storageManager/test/testing", function(err, data){
	console.log(data)
})