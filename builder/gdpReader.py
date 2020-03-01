
from typing import Dict
import json

class GdpReader:
	def __init__(self, file:str):
		self.__path = file
		self.__fp = None

	def __enter__(self):
		self.__fp = open(self.__path, "r")
		return self

	def __exit__(self, arg1, arg2, arg3):
		if self.__fp:
			self.__fp.close()

	def toDict(self)->Dict:
		return json.loads(self.__fp.read())