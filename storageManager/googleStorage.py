
from gcloud import storage
#import storageManager
import os


#GOOGLE_APPLICATION_CREDENTIALS = 'c:/temp/googlePythonKey.json'

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'c:/temp/googlePythonKey.json' #<path to private key>
os.environ['GCLOUD_DATASET_ID'] = 'metal-sky-96603'

class GoogleStorage(object):

	def __init__(self, options):
		self.bucket = storage.get_bucket('just_a_test')
		self.bucket.make_public(recursive=True, future=True)

	def listFiles(self, path):
		return list(self.bucket.list_blobs())

	def getFile(self, sourcePath, destinationPath):
		try:
			blob = self.bucket.get_blob(sourcePath)
			blob.download_to_filename(destinationPath)
		except AttributeError:
			raise OSError('the File was not found on the google filesystem')

	def addFile(self, sourcePath, destinationPath):
		self.bucket.upload_file(sourcePath, destinationPath)

	def deleteFile(self, fileName):
		try:
			blob = self.bucket.get_blob(fileName)
			blob.delete()
		except AttributeError:
			raise OSError('The file to delete was not found on the Google Filesystem')

	def getFileUrl(self, fileName):

		blob = self.bucket.get_blob(fileName)
		if blob:
			result = 'https://www.googleapis.com/storage/'+self.bucket.id+'/'+fileName
			return result
		else:
			raise OSError('The file was not found on the google filesystem')


	def isFile(self, fileName):
		blob = self.bucket.get_blob(fileName)
		if blob:
			return True
		else:
			return False

