using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler
{
	class Entity
	{
		public string Name { set; get; }
		public List<Components.Component> components = new List<Components.Component>();

		public Entity(string name)
		{
			Name = name;
		}
	}
}
