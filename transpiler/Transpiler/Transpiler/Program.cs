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
			var gdpData = ProjectFileReader.ReadFile("example/exampleProject.gdp");
			var gdevProperties = ProjectDataProcessor.ProcessGDevPropertyData(gdpData);
			var sceneHierachy = ProjectDataProcessor.ProcessComposerData(gdpData);
			GameFileWriter.WriteFile("example/exampleGame.js", gdevProperties, sceneHierachy);
		}
	}
}
