using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Transpiler
{
	static class ProjectFileReader
	{
		static public string[] ReadFile(string fileName)
		{
			List<string> gdevpList = new List<string>();
			var lines = File.ReadAllLines(fileName);
			return lines;
		}
		
	}
}
