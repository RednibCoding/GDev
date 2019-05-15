using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler.Components
{
	class TextComponent : Component
	{
		public string Value { set; get; }
		public bool IsHidden { set; get; }
		public int OffsetX { set; get; }
		public int OffsetY { set; get; }

		public TextComponent(string name, string value, bool isHidden, int offsetX, int offsetY) : base(name)
		{
			Value = value;
			IsHidden = isHidden;
			OffsetX = offsetX;
			OffsetY = offsetY;
		}
	}
}
