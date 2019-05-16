using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Transpiler
{
	class ProjectDataProcessor
	{
		static List<Scene> hierachy = new List<Scene>();
		static List<GDevProperty> gdevProperties = new List<GDevProperty>();

		const string KEY_SCENE = "{SCENE}:";
		const string KEY_ENTITY = "{ENTITY}:";
		const string KEY_COMPONENT = "{COMPONENT}:";
		const string KEY_PROPERTY = "{PROPERTY}:";
		const string KEY_END = "{END}";
		const string KEY_GDEV_PROPERTY = "{GDEV_PROPERTY}:";

		public static List<GDevProperty> ProcessGDevPropertyData(string[] projectData)
		{
			string line;
			for (int i = 0; i < projectData.Length; i++)
			{
				line = projectData[i];

				if (IsKey(KEY_GDEV_PROPERTY, line))
				{
					gdevProperties.Add(new GDevProperty(GetKeyValuePairFrom(KEY_GDEV_PROPERTY, line)));
				}
			}

			return gdevProperties;
		}

		public static List<Scene> ProcessComposerData(string[] projectData)
		{
			string line;
			for(int i = 0; i < projectData.Length; i++)
			{
				line = projectData[i];

				// Is it a scene?
				if (IsKey(KEY_SCENE, line))
				{
					// Create a new scene
					hierachy.Add(new Scene(GetValueFrom(KEY_SCENE, line)));
				}

				// Is it an entity?
				if (IsKey(KEY_ENTITY, line))
				{
					// Add the entity to the scene
					var currentEntity = new Entity(GetValueFrom(KEY_ENTITY, line));
					var lastScene = hierachy.Count - 1;
					hierachy[lastScene].entities.Add(currentEntity);
				}

				// Is it a component of an entity?
				if (IsKey(KEY_COMPONENT, line))
				{
					// Add the component to the entity
					var component = new Component(GetValueFrom(KEY_COMPONENT, line));
					var lastScene = hierachy.Count - 1;
					var lastEntity = hierachy[lastScene].entities.Count - 1;
					hierachy[lastScene].entities[lastEntity].components.Add(component);
				}

				// Is it a property of a component?
				if (IsKey(KEY_PROPERTY, line))
				{
					string property = "";
					
					var lastScene = hierachy.Count - 1;
					var lastEntity = hierachy[lastScene].entities.Count - 1;
					var lastComponent = hierachy[lastScene].entities[lastEntity].components.Count - 1;

					// If this is a code property of a script component
					// then it can be more than one line
					if (hierachy[lastScene].entities[lastEntity].components[lastComponent].Name == "script")
					{
						if (line.Contains(KEY_PROPERTY+"code="))
						{
							property += "/*"+ GetValueFrom(KEY_PROPERTY, line)+"\n";
							line = projectData[++i];
							// So read the entire script, not just one line
							while (!IsKey(KEY_END, line))
							{
								property += line + "\n";
								line = projectData[++i];
							}
							property += "*/";
						}
					}
					else
					{
						property = GetValueFrom(KEY_PROPERTY, line);
					}
					hierachy[lastScene].entities[lastEntity].components[lastComponent].properties.Add(property);
				}
			}
			return hierachy;
		}

		static bool IsKey(string key, string line)
		{
			if(line.Contains(key))
			{
				return true;
			}
			return false;
		}

		static string GetValueFrom(string key, string line)
		{
			// Remove all whitespaces (space, tabs, etc)
			line = Regex.Replace(line, @"\s+", "");
			line = line.Remove(0, key.Length);
			line = line.Substring(line.IndexOf('=') + 1);
			return line;
		}

		static string GetKeyValuePairFrom(string key, string line)
		{
			// Remove all whitespaces (space, tabs, etc)
			line = Regex.Replace(line, @"\s+", "");
			line = line.Remove(0, key.Length);
			return line;
		}
	}
}