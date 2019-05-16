using System;
using System.Collections.Generic;
using System.Text;

namespace Transpiler
{
	class GDevCodeGenerator
	{
		// Create Header
		public static string CreateHeader()
		{
			string code = "\n";

			code += "/***************************************************************************\n";
			code += " *                                                                         *\n";
			code += " *  This file has been created by the  GDev Game Editor  © Michael Binder  *\n";
			code += " *                                                                         *\n";
			code += " ***************************************************************************/\n";
			
			return code;
		}

		// Properties
		public static string CreatePropertyCommand(List<GDevProperty> properties)
		{
			string code = "\n";

			code += "// GDev Properties\n";

			foreach(var property in properties)
				code += "GDev.Properties." + property.Value + ";\n";

			return code;
		}

		// Create Scene
		public static string CreateSceneCommand(string name, bool isFirstScene)
		{
			string code = "\n";

			if (isFirstScene)
				code += "// Create the start scene entity\n";
			else
				code += "// Create a scene entity\n";

			code += "var " + name + " = new GDev.ECS.Entity('" + name + "');\n";
			code += name + ".addComponent(new GDev.ECS.Components.Scene(" + FirstCharToLower(isFirstScene.ToString()) + "));\n";

			code += "GDev.composer.addScene(" + name + ");\n";

			return code;
		}

		// Create Entity
		public static string CreateEntityCommand(string name)
		{
			string code = "\n";

			code += "// Create an entity\n";
			code += "var " + name + " = new GDev.ECS.Entity('" + name + "');\n";

			return code;
		}

		// Add Component
		public static string AddComponentCommand(string entityName, string componentName, string[] componentProperties = null)
		{
			string code = "";
			code += entityName + ".addComponent(new GDev.ECS.Components.";
			code += FirstCharToUpper(componentName) + "(";

			if (componentProperties != null)
			{
				for (int i = 0; i < componentProperties.Length; i++)
				{
					if (i == componentProperties.Length - 1)
						code += componentProperties[i] + "));\n";
					else
						code += componentProperties[i] + ",";
				}
			}
			else
			{
				code += "));\n";
			}
			return code;
		}

		static string FirstCharToUpper(string input)
		{
			return input[0].ToString().ToUpper() + input.Substring(1);
		}

		static string FirstCharToLower(string input)
		{
			return input[0].ToString().ToLower() + input.Substring(1);
		}
	}
}