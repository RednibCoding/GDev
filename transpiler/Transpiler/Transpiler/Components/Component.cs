using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler.Components
{
	class Component
	{
		public string Name { set; get; }

		public List<string> properties = new List<string>();

		public Component(string name)
		{
			Name = name;
		}
	}
}
