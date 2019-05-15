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
			var gdevpData = ProjectFileReader.ReadFile("example/exampleProject.gdevp");
			var hierachy = Processor.ProcessGdevpData(gdevpData);
		}
	}
}
