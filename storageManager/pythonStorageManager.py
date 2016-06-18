from abc import ABCMeta, abstractmethod

class storageManager:

	__metaclass__ = ABCMeta

	@abstractmethod
	def listFiles(self):
		pass

	@abstractmethod
	def getFile(self):
		pass

	@abstractmethod
	def addFile(self):
		pass

	@abstractmethod
	def deleteFile(self):
		pass

	@abstractmethod
	def getFileUrl(self):
		pass


