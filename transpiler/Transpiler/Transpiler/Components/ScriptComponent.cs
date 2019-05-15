using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler.Components
{
	class ScriptComponent : Component
	{
		public string Code { set; get; }

		public ScriptComponent(string name, string code) : base(name)
		{
			Code = code;
		}
	}
}
