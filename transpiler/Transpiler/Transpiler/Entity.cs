using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler
{
	class Entity
	{
		public string Name { set; get; }
		public List<Component> components = new List<Component>();

		public Entity(string name)
		{
			Name = name;
		}
	}
}
