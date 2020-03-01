from typing import Dict
import sys
from gdpReader import GdpReader

class GdpParser:
	def __init__(self, gdpFile:str):
		self.__gdpProject = None
		self.__gdevProperties = None

		with GdpReader(gdpFile) as file:
			self.__gdpProject = file.toDict()

	def parse(self):
		self.__parse(self.__gdpProject)

	def __parse(self, projectDict:Dict):
		for key, value in projectDict.items():
			if isinstance(value, Dict):
				getattr(GdpParser, f"_GdpParser__parse_{key}")(self, projectDict[key])

	# Add for each key in the gdp file that is a dict a new function
	# __parse() will then call the corresponding function depending on the given key
	# -> def __parse_key where "key" is a key in the gdp file (properties, scenes, entities, components etc.)
	def __parse_properties(self, propertiesDict:Dict):
		self.__gdevProperties = propertiesDict

	def __parse_scenes(self, scenesDict:Dict):
		#print(scenesDict)
		pass

	def __parse_entities(self, entitiesDict:Dict):
		#TODO
		pass

	def __parse_components(self, componentsDict:Dict):
		#TODO
		pass

	# Helpers



parser = GdpParser("exampleProject.gdp")
parser.parse()