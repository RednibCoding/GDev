using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler.Components
{
	class TransformComponent : Component
	{
		public int X { set; get; }
		public int Y { set; get; }
		public int Rotation { set; get; }
		public int ScaleX { set; get; }
		public int ScaleY { set; get; }

		public TransformComponent(string name, int x, int y, int rotation, int scaleX, int scaleY) : base(name)
		{
			X = x;
			Y = y;
			Rotation = rotation;
			ScaleX = scaleX;
			ScaleY = scaleY;
		}
	}
}
