/*
    Class for manageing scene entites (entites with the scene component attached)
    This class is a manager class to make managing scene entities easier
*/

// ----------------------------------------------------------------------------
GDev.Composer = function()
{
    // The scene that is currently active (shown)
    this.thisScene;
    // Entry scene of the game
    this.StartScene;

    // List of all scenes entities
    this.scenes = {};

    // Functions from GDev.Systems that should be updated on every tick
    // See gdev_systems.js or GDev.composer.registerTickFunction() below
    this.systemTickFunctions = [];

    return this;
}

// Add a scene to the composer
// ----------------------------------------------------------------------------
GDev.Composer.prototype.addScene = function(sceneEntity)
{
    if(sceneEntity.components.Scene)
    {
        this.scenes[sceneEntity.name] = sceneEntity;
    }
};

// Delete a scene
// ----------------------------------------------------------------------------
GDev.Composer.prototype.deleteScene = function(sceneEntity)
{
    // Delete all entites in the scene as well
    GDev.ECS.Systems.deleteScene(sceneEntity);
    delete this.scenes[sceneEntity.name];
};

// Add an entity to the given scene
// ----------------------------------------------------------------------------
GDev.Composer.prototype.addEntityToScene = function(sceneEntity, newEntity)
{
    GDev.ECS.Systems.addEntityToScene(sceneEntity, newEntity);
};

// Delete an entity
// ----------------------------------------------------------------------------
GDev.Composer.prototype.deleteEntity = function(sceneEntity, entityToDelete)
{
    GDev.ECS.Systems.deleteEntityFromScene(sceneEntity, entityToDelete);
};

// Call this once when all scenes have been created and added
// ----------------------------------------------------------------------------
GDev.Composer.prototype.attachScripts = function()
{
    // Evaluating the scripts attached to the scenes
    GDev.ECS.Systems.evaluateScripts(this.scenes)

    // Also evaluate all the scripts attached to the entities of each scene
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.Scene)
        {
            GDev.ECS.Systems.evaluateScripts(thisScene.components.Scene.entities)
        }
    }
}

// Load the sprites of all scenes and their entities
// Only call this once and after the graphics context has been created (Graphics)
// ----------------------------------------------------------------------------
GDev.Composer.prototype.loadSprites = function()
{
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.Scene)
        {
            // Load the sprite that are directly attached to the scene
            GDev.ECS.Systems.loadSprite(thisScene);

            // Also load the sprites of all entites of each scene
            var thisEntity;
            for(const id in thisScene.components.Scene.entities)
            {
                thisEntity = thisScene.components.Scene.entities[id];
                GDev.ECS.Systems.loadSprite(thisEntity);
            
            }
        }
    }
}

// Set the start scene (the scene with "isStartScene=true" see: Component: Scene)
// ----------------------------------------------------------------------------
GDev.Composer.prototype.setStartScene = function(startScene)
{
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.Scene)
        {
            if(thisScene.name === startScene.name)
            {
                console.log("Start scene set to: '"+thisScene.name+"'")
                this.goToScene(thisScene.name);
            }
        }
    }
};

// Switch to the given scene
// ----------------------------------------------------------------------------
GDev.Composer.prototype.goToScene = function(sceneName)
{
    scene = this.scenes[sceneName];
    if(typeof scene === "undefined")
    {
        console.error("Unknown scene: "+sceneName)
    }
    // Set active scene
    if(scene.components.Scene)
    {
        this.thisScene = scene;
        // Set the clear color to the scenes background color
        ClsColor(this.thisScene.bgRed, this.thisScene.bgGreen, this.thisScene.bgBlue)
        // Call onCreate scripts of scene and it's entities
        this.invokeOnCreate();
        console.log("Switched to scene: '"+this.thisScene.name+"'")
    }
};

// Invoke onCreate functions of this scene and it's entities
// ----------------------------------------------------------------------------
GDev.Composer.prototype.invokeOnCreate = function()
{
    // Invoke "onCreate" of the scene entity
    GDev.ECS.Systems.invoke("onCreate", this.thisScene);

    // Also invoke "onCreate" of each entity in this scene
    var thisEntity;
    for(var id in this.thisScene.components.Scene.entities)
    {
        thisEntity = this.thisScene.components.Scene.entities[id];
        GDev.ECS.Systems.invoke("onCreate", thisEntity);
    }
}

// This is the main game loop
// ----------------------------------------------------------------------------
GDev.Composer.prototype.invokeOnTick = function()
{

    // Invoke "onTick" of the current active scene
    GDev.ECS.Systems.invoke("onTick", this.thisScene);

    // Render this scene
    GDev.ECS.Systems.renderEntity(this.thisScene);

    var thisEntity;

    // Go through each entity in the scene
    for(var id in this.thisScene.components.Scene.entities)
    {
        thisEntity = this.thisScene.components.Scene.entities[id];

        // Invoke all attached GDev.Systems.Tickfunctions
        for(const tickFunction of GDev.systemTickFunctions)
        {
            tickFunction(thisEntity);
        }
        // Run the onTick script of the entity
        GDev.ECS.Systems.invoke("onTick", thisEntity);
        // Render the entity
        GDev.ECS.Systems.renderEntity(thisEntity);
    }
};

// ----------------------------------------------------------------------------
GDev.Composer.prototype.dump = function()
{
    // dump information about the composer
    console.log(JSON.stringify(this, null, 4));
};