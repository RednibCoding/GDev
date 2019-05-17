/*
    Class for manageing scenes entites (entites with the scene component attached)
    This class is just a manager class to make managing scene entities easier
*/

GDev.Composer = function Composer()
{
    // The scene that is currently active (shown)
    this.thisScene;

    // List of all scenes entities
    this.scenes = {};

    return this;
}

// Add a scene to the composer
GDev.Composer.prototype.addScene = function addScene(sceneEntity)
{
    if(sceneEntity.components.scene)
    {
        this.scenes[sceneEntity.name] = sceneEntity;
    }
};

// Delete a scene
GDev.Composer.prototype.deleteScene = function deleteScene(sceneEntity)
{
    // Delete all entites in the scene as well
    GDev.ECS.Systems.FreeSceneEntity(sceneEntity);
    delete this.scenes[sceneEntity.name];
};

// Add an entity to the given scene
GDev.Composer.prototype.addEntityToScene = function addEntityToScene(sceneEntity, newEntity)
{
    GDev.ECS.Systems.AddEntityToScene(sceneEntity, newEntity);
};

// Delete an entity
GDev.Composer.prototype.deleteEntity = function deleteEntity(sceneEntity, entityToDelete)
{
    GDev.ECS.Systems.DeleteEntity(sceneEntity, entityToDelete);
};

// Call this once when all scenes have been created and added
GDev.Composer.prototype.attachScripts = function attachScripts()
{
    // Evaluating the scripts attached to the scenes
    GDev.ECS.Systems.TranspileScripts(this.scenes)

    // Also evaluate all the scripts attached to the entities of each scene
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.scene)
        {
            GDev.ECS.Systems.TranspileScripts(thisScene.components.scene.entities)
        }
    }
}

// Load the sprites of all scenes and their entities
// Only call this once and after the graphics context has been created (Graphics)
GDev.Composer.prototype.loadSprites = function loadSprites()
{
    // Load the sprites directly attached to the scene
    GDev.ECS.Systems.LoadSprites(this.scenes);

    // Also load the sprites of all entites of each scene
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.scene)
        {
            GDev.ECS.Systems.LoadSprites(thisScene.components.scene.entities);
        }
    }
}

GDev.Composer.prototype.setStartScene = function setStartScene()
{
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.scene)
        {
            if(thisScene.components.scene.isStartScene)
            {
                this.goToScene(thisScene.name);
            }
        }
    }
};

GDev.Composer.prototype.goToScene = function goToScene(sceneName)
{
    scene = this.scenes[sceneName];
    if(typeof scene === 'undefined')
    {
        console.error("Unknown scene: "+sceneName)
    }
    // Set active scene.
    if(scene.components.scene)
    {
        this.thisScene = scene;
        GDev.ECS.Systems.RunScript("onCreate", this.thisScene);
        GDev.ECS.Systems.RunScripts("onCreate", this.thisScene.components.scene.entities);

    }
};

GDev.Composer.prototype.onCreate = function onCreate()
{
    GDev.ECS.Systems.RunScript("onCreate", this.thisScene);
    GDev.ECS.Systems.RunScripts("onCreate", this.thisScene.components.scene.entities);
}

// This is the main game loop
GDev.Composer.prototype.onTick = function onTick()
{

    // Run the script of the current active scene
    GDev.ECS.Systems.RunScript("onTick", this.thisScene);

    // Render this scene
    GDev.ECS.Systems.RenderEntity(this.thisScene);

    var thisEntity;

    // Go through each entity in the scene
    for(var id in this.thisScene.components.scene.entities)
    {
        thisEntity = this.thisScene.components.scene.entities[id];

        // Update the attached mouse listener
        GDev.ECS.Systems.UpdateMouseListener(thisEntity);
        // Run the script of the entity
        GDev.ECS.Systems.RunScript("onTick", thisEntity);
        // Render the entity
        GDev.ECS.Systems.RenderEntity(thisEntity);
    }
};



// --- Debug ---
GDev.Composer.prototype.serialize = function serialize()
{
    var composerAsString = "";
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.scene)
        {
            composerAsString += "\n{SCENE}:"+thisScene.name;

            var sceneEntity;
            for(var id in thisScene.components.scene.entities)
            {
                sceneEntity = thisScene.components.scene.entities[id];
                composerAsString += "\n\t{ENTITY}:"+sceneEntity.name;

                for (var component in sceneEntity.components) 
                {
                    composerAsString += "\n\t\t{COMPONENT}:"+component;

                    if(component == "script")
                    {
                        composerAsString += "\n\t\t\t{PROPERTY}:code="+sceneEntity.components[component].code;
                    }
                    else
                    {
                        for (let [key, value] of Object.entries(sceneEntity.components[component]))
                        {
                            if(typeof value == "string")
                            {
                                value = "'" + value + "'";
                            }
                            composerAsString += "\n\t\t\t{PROPERTY}:"+key + "="+value;
                        }
                        composerAsString += "\n\t\t{END}";
                    }
                }
                composerAsString += "\n\t{END}";
            }
            composerAsString += "\n{END}";

        }
    }
    console.log(composerAsString)
}

GDev.Composer.prototype.log = function log()
{
    // Print / log information about the composer
    console.log(JSON.stringify(this, null, 4));
};