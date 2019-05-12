/*
    Class for manageing scenes entites (entites with the scene component attached)
    This class is just a manager class to make managing scene entities easier
*/

GDev.Composer = function Composer()
{
    this.type = "composer"; // Just that log output looks nicer

    // List of all scenes entities
    this.scenes = {};

    // The scene that is currently active (shown)
    this.activeScene;

    return this;
}

GDev.Composer.prototype.addScene = function addScene(sceneEntity)
{
    if(sceneEntity.components.scene)
    {
        this.scenes[sceneEntity.id] = sceneEntity;
    }
};

GDev.Composer.prototype.removeScene = function removeScene(sceneEntity)
{
    GDev.ECS.Systems.FreeSceneEntity(sceneEntity);
    delete this.scenes[sceneEntity.id];
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

GDev.Composer.prototype.goToScene = function goToScene(scene)
{
    // Set active scene.
    if(scene.components.scene)
    {
        this.activeScene = scene;
        GDev.ECS.Systems.RunScript("onCreate", scene)
    }
};

GDev.Composer.prototype.renderActiveScene = function renderActiveScene()
{
    // Update the attached mouse listener
    GDev.ECS.Systems.UpdateMouseListeners(this.activeScene.components.scene.entities);

    // Run the scripts
    //  of scene entity
    GDev.ECS.Systems.RunScript("onRender", this.activeScene);
    //  of all entites of scene
    GDev.ECS.Systems.RunScripts("onRender", this.activeScene.components.scene.entities);
    // Render
    //  scene entity
    GDev.ECS.Systems.RenderEntity(this.activeScene);
    //  all entites of scene
    GDev.ECS.Systems.RenderEntites(this.activeScene.components.scene.entities);
};