using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler.Components
{
	class SpriteComponent : Component
	{
		public string ImagePath { set; get; }
		// image = null - image gets set in the gdev engine
		public bool IsHidden { set; get; }
		public bool IsMidHandle { set; get; }


		public SpriteComponent(string name, string imagePath, bool isHidden, bool isMidHandle) : base(name)
		{
			ImagePath = imagePath;
			IsHidden = isHidden;
			IsMidHandle = isMidHandle;
		}
	}
}
