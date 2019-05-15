using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler
{
	class Scene : Entity
	{
		public List<Entity> entities = new List<Entity>();
		public Scene(string name) : base(name)
		{
		}
	}
}
