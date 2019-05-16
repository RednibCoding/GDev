using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Transpiler
{
	class GameFileWriter
	{
		public static void WriteFile(string fileName, List<GDevProperty> gdevProperties, List<Scene> hierachy)
		{
			
			string output = "";

			// Write the header

			output += GDevCodeGenerator.CreateHeader();

			// Write the gdev properties
			output += GDevCodeGenerator.CreatePropertyCommand(gdevProperties);

			// Write the scene data
			var firstScene = true;

			foreach(var scene in hierachy)
			{
				if(scene.GetType() == typeof(Scene))
				{
					output += GDevCodeGenerator.CreateSceneCommand(scene.Name, firstScene);
					firstScene = false;

					if(scene.entities.Count > 0)
					{
						foreach (var entity in scene.entities)
						{
							if (entity.GetType() == typeof(Entity))
							{
								output += GDevCodeGenerator.CreateEntityCommand(entity.Name);

								if (entity.components.Count > 0)
								{
									foreach (var component in entity.components)
									{
										if (component.GetType() == typeof(Component))
										{
											if (component.properties.Count > 0)
												output += GDevCodeGenerator.AddComponentCommand(entity.Name, component.Name, component.properties.ToArray());
											else
												output += GDevCodeGenerator.AddComponentCommand(entity.Name, component.Name);
										}
									}
								}
							}
							output += GDevCodeGenerator.AddEntityToSceneCommand(scene.Name, entity.Name);
						}
					}
				}
			}
			output += GDevCodeGenerator.FinalizeComposerCommand();
			output += GDevCodeGenerator.InitGraphicsContextCommand();
			output += GDevCodeGenerator.MainFunctionCommand();

			File.WriteAllText(fileName, output);
		}
	}
}
