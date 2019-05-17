using System;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace Transpiler
{
	class Program
	{
		static void Main(string[] args)
		{
			string fileIn = args[0];
			string fileOut = fileIn.Replace(".gdp", "_game.js");

			var gdpData = ProjectFileReader.ReadFile(fileIn);
			var gdevProperties = ProjectDataProcessor.ProcessGDevPropertyData(gdpData);
			var sceneHierachy = ProjectDataProcessor.ProcessComposerData(gdpData);
			GameFileWriter.WriteFile(fileOut, gdevProperties, sceneHierachy);
		}
	}
}
