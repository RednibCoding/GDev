using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Editor
{
	public class Entity_Item
	{
		public Entity_Item(string name)
		{
			Id=++entityID;
			Name=name;
		}
		static int entityID;
		public int Id { get; set; }
		public string Name { get; set; }

		public List<string> components = new List<string>();

		public override string ToString()
		{
			return Name;
		}
	}
}