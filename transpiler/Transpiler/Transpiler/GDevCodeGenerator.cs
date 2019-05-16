using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler
{
	class GDevCodeGenerator
	{
		// Create Scene
		public static string CreateSceneCommand(string name, bool isFirstScene)
		{
			string code = "\n";

			if (isFirstScene)
				code += "// Create the start scene entity\n";
			else
				code += "// Create a scene entity\n";

			code += "var " + name + " = new GDev.ECS.Entity(" + name + ");\n";
			code += name + ".addComponent(new GDev.ECS.Components.Scene(" + name + "))\n;";

			if (isFirstScene)
				code += name + ".components.scene.isStartScene = true;\n";

			code += "GDev.composer.addScene(" + name + ")\n;";

			return code;
		}

		// Create Entity
		public static string CreateEntityCommand(string name)
		{
			string code = "\n";

			code += "// Create an entity\n";
			code += "var " + name + " = GDev.ECS.Entity(" + name + ");\n";

			return code;
		}

		// Add Component
		public static string AddComponentCommand(string name)
		{
			// TODO
		}

}