import unittest
import sys
import os

sys.path.append(os.getcwd().replace('\\','/') + '/../')

from googleStorage import GoogleStorage

#These tests assume an empty bucket


class googleStorageTest(unittest.TestCase):

	def setUp(self):
		self.googleStorage = GoogleStorage('nothing')


	def test_shouldListAllFiles(self):
		results = list(self.googleStorage.listFiles(''))
		self.assertEqual(len(results), 0)

		for i in range(3):
			self.googleStorage.addFile(os.getcwd()+'/testfiles/test1.txt', 'listTest'+str(i)+'.txt')

		results = list(self.googleStorage.listFiles(''))
		self.assertEqual(len(results), 3)

		for i in range(3):
			self.googleStorage.deleteFile('listTest'+str(i)+'.txt')


	def test_shouldAddFile(self):
		self.googleStorage.addFile(os.getcwd()+'/testfiles/test1.txt', 'addTest.txt')
		self.assertTrue(self.googleStorage.isFile('addTest.txt'))
		self.googleStorage.deleteFile('addTest.txt')

	def test_shouldDeleteFile(self):
		self.googleStorage.addFile(os.getcwd()+'/testfiles/test1.txt', 'deleteTest.txt')
		self.assertTrue(self.googleStorage.isFile('deleteTest.txt'))
		self.googleStorage.deleteFile('deleteTest.txt')
		self.assertFalse(self.googleStorage.isFile('deleteTest.txt'))

	def test_shouldGetFile(self):
		self.googleStorage.addFile(os.getcwd()+'/testfiles/test1.txt', 'downloadTest.txt')
		self.googleStorage.getFile('downloadTest.txt', os.getcwd()+'/downloadedFile.txt')
		self.assertTrue(os.path.isfile(os.getcwd()+'/downloadedFile.txt'))
		os.remove(os.getcwd()+'/downloadedFile.txt')
		self.googleStorage.deleteFile('downloadTest.txt')

	def test_shouldGetFileUrl(self):
		self.googleStorage.addFile(os.getcwd()+'/testfiles/test1.txt', 'fileUrlTest.txt')
		result = self.googleStorage.getFileUrl('fileUrlTest.txt')
		self.assertEqual(result, 'https://www.googleapis.com/storage/'\
									+ self.googleStorage.bucket.id + '/fileUrlTest.txt' )
		self.googleStorage.deleteFile('fileUrlTest.txt')

	def test_shouldGetNonExistentFileUrl(self):
		self.assertRaises(OSError, self.googleStorage.getFileUrl, 'nonExistentFile.txt')

	def test_isFileTrue(self):
		self.googleStorage.addFile(os.getcwd()+'/testfiles/test1.txt', 'addTest.txt')
		self.assertTrue(self.googleStorage.isFile('addTest.txt'))
		self.googleStorage.deleteFile('addTest.txt')

	def test_isFileFalse(self):
		self.assertFalse(self.googleStorage.isFile('nonExistentFile.txt'))

	def test_shouldUpdatefile(self):
		self.googleStorage.addFile(os.getcwd()+'/testfiles/test1.txt', 'fileToUpdate.txt')
		self.googleStorage.getFile('fileToUpdate.txt', os.getcwd()+'fileUpdating.txt')
		fd = os.open(os.getcwd()+'fileUpdating.txt', os.O_RDWR)
		self.assertEqual(os.read(fd, 13), 'Test file One')
		os.close(fd)
		self.googleStorage.addFile(os.getcwd()+'/testfiles/test3.txt', 'fileToUpdate.txt')
		self.googleStorage.getFile('fileToUpdate.txt',os.getcwd()+'fileUpdating.txt')
		fd = os.open(os.getcwd()+'fileUpdating.txt', os.O_RDWR)
		self.assertEqual(os.read(fd, 15), 'Third test file')
		os.close(fd)
		os.remove(os.getcwd()+'fileUpdating.txt')
		self.googleStorage.deleteFile('fileToUpdate.txt')


if __name__ == '__main__':
	unittest.main()