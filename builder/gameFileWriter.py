
class GameFileWriter:
	def __init__(self, file:str, mode):
		self.__path = file
		self.__mode = mode
		self.__fp = None

	def __enter__(self):
		self.__fp = open(self.__path, self.__mode)
		return self

	def __exit__(self, arg1, arg2, arg3):
		if self.__fp:
			self.__fp.close()

	def writeLine(self, line:str)->None:
		self.__fp.write(line)

	def __writeHeader(self):
		pass