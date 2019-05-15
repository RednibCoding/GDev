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

GDev.Composer.prototype.addScene = function addScene(sceneEntity)
{
    if(sceneEntity.components.scene)
    {
        this.scenes[sceneEntity.name] = sceneEntity;
    }
};

GDev.Composer.prototype.removeScene = function removeScene(sceneEntity)
{
    GDev.ECS.Systems.FreeSceneEntity(sceneEntity);
    delete this.scenes[sceneEntity.name];
};

GDev.Composer.prototype.addEntityToScene = function addEntityToScene(sceneEntity, newEntity)
{
    GDev.ECS.Systems.AddEntityToScene(sceneEntity, newEntity);
};

GDev.Composer.prototype.removeEntityFromScene = function removeEntityFromScene(sceneEntity, entityToDelete)
{
    GDev.ECS.Systems.RemoveEntityFromScene(sceneEntity, entityToDelete);
};

// Call this once when all scenes have been created and added
GDev.Composer.prototype.finalize = function composerFinalize()
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

GDev.Composer.prototype.setStartSceneAsActiveScene = function setStartSceneAsActiveScene()
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
        GDev.ECS.Systems.RunScript("onCreate", scene)
    }
};

GDev.Composer.prototype.onCreate = function onCreate()
{
    GDev.ECS.Systems.RunScript("onCreate", this.thisScene);
    GDev.ECS.Systems.RunScripts("onCreate", this.thisScene.components.scene.entities);
}

GDev.Composer.prototype.onTick = function onTick()
{
    // Update the attached mouse listener
    GDev.ECS.Systems.UpdateMouseListeners(this.thisScene.components.scene.entities);

    // Run the scripts
    //  of scene entity
    GDev.ECS.Systems.RunScript("onTick", this.thisScene);
    //  of all entites of scene
    GDev.ECS.Systems.RunScripts("onTick", this.thisScene.components.scene.entities);
    // Render
    //  scene entity
    GDev.ECS.Systems.RenderEntity(this.thisScene);
    //  all entites of scene
    GDev.ECS.Systems.RenderEntites(this.thisScene.components.scene.entities);
};

GDev.Composer.prototype.serialize = function serialize()
{
    var composerAsString = "";
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.scene)
        {
            composerAsString += "\n{SCENE}:"+thisScene.name;;

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
                        //for (var property in sceneEntity.components[component]) 
                        //{
                        //    composerAsString += "\n\t\t\t\t\t{PROPERTY}:"+property + "="+sceneEntity.components[component].property;
                        //}
                        for (let [key, value] of Object.entries(sceneEntity.components[component])) {
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