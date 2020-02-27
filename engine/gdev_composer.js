/*
    Class for manageing scene entites (entites with the scene component attached)
    This class is just a manager class to make managing scene entities easier
*/

// ----------------------------------------------------------------------------
GDev.Composer = () =>
{
    // The scene that is currently active (shown)
    this.thisScene;

    // List of all scenes entities
    this.scenes = {};

    // Functions from GDev.Systems that should be updated on every tick
    // See gdev_systems.js or GDev.composer.registerTickFunction() below
    this.systemTickFunctions = [];

    return this;
}

GDev.Composer.prototype.registerTickFunction = (tickFunction) =>
{
    if(typeof tickFunction === "function")
    {
        this.systemTickFunctions.push(tickFunction);
    }
    else
    {
        console.log("Unable to register System-Tick-Function!")
    }
}

// Add a scene to the composer
// ----------------------------------------------------------------------------
GDev.Composer.prototype.addScene = (sceneEntity) =>
{
    if(sceneEntity.components.scene)
    {
        this.scenes[sceneEntity.name] = sceneEntity;
    }
};

// Delete a scene
// ----------------------------------------------------------------------------
GDev.Composer.prototype.deleteScene = (sceneEntity) =>
{
    // Delete all entites in the scene as well
    GDev.ECS.Systems.deleteScene(sceneEntity);
    delete this.scenes[sceneEntity.name];
};

// Add an entity to the given scene
// ----------------------------------------------------------------------------
GDev.Composer.prototype.addEntityToScene = (sceneEntity, newEntity) =>
{
    GDev.ECS.Systems.addEntityToScene(sceneEntity, newEntity);
};

// Delete an entity
// ----------------------------------------------------------------------------
GDev.Composer.prototype.deleteEntity = (sceneEntity, entityToDelete) =>
{
    GDev.ECS.Systems.deleteEntityFromScene(sceneEntity, entityToDelete);
};

// Call this once when all scenes have been created and added
// ----------------------------------------------------------------------------
GDev.Composer.prototype.attachScripts = () =>
{
    // Evaluating the scripts attached to the scenes
    GDev.ECS.Systems.evaluateScripts(this.scenes)

    // Also evaluate all the scripts attached to the entities of each scene
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.scene)
        {
            GDev.ECS.Systems.evaluateScripts(thisScene.components.scene.entities)
        }
    }
}

// Load the sprites of all scenes and their entities
// Only call this once and after the graphics context has been created (Graphics)
// ----------------------------------------------------------------------------
GDev.Composer.prototype.loadSprites = () =>
{
    // Load the sprites that are directly attached to the scene
    GDev.ECS.Systems.loadSprites(this.scenes);

    // Also load the sprites of all entites of each scene
    var thisScene;
    for(var id in this.scenes)
    {
        thisScene = this.scenes[id];
        if(thisScene.components.scene)
        {
            var thisEntity;
            for(const id in thisScene.components.scene.entities)
            {
                thisEntity = thisScene.components.scene.entities[id];
                GDev.ECS.Systems.loadSprite(thisEntity);
            
            }
        }
    }
}

// Set the start scene (the scene with "isStartScene=true" see: Component: Scene)
// ----------------------------------------------------------------------------
GDev.Composer.prototype.setStartScene = () =>
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

// Switch to the given scene
// ----------------------------------------------------------------------------
GDev.Composer.prototype.goToScene = (sceneName) =>
{
    scene = this.scenes[sceneName];
    if(typeof scene === "undefined")
    {
        console.error("Unknown scene: "+sceneName)
    }
    // Set active scene
    if(scene.components.scene)
    {
        this.thisScene = scene;
        // Call onCreate scripts of scene and it's entities
        this.invokeOnCreate();
    }
};

// Invoke onCreate functions of this scene and it's entities
// ----------------------------------------------------------------------------
GDev.Composer.prototype.invokeOnCreate = () =>
{
    // Invoke "onCreate" of the scene entity
    GDev.ECS.Systems.invoke("onCreate", this.thisScene);

    // Also invoke "onCreate" of each entity in this scene
    var thisEntity;
    for(var id in this.thisScene.components.scene.entities)
    {
        thisEntity = this.thisScene.components.scene.entities[id];
        GDev.ECS.Systems.invoke("onCreate", thisEntity);
    }
}

// This is the main game loop
// ----------------------------------------------------------------------------
GDev.Composer.prototype.invokeOnTick = () =>
{

    // Invoke "onTick" of the current active scene
    GDev.ECS.Systems.invoke("onTick", this.thisScene);

    // Render this scene
    GDev.ECS.Systems.renderEntity(this.thisScene);

    var thisEntity;

    // Go through each entity in the scene
    for(var id in this.thisScene.components.scene.entities)
    {
        thisEntity = this.thisScene.components.scene.entities[id];

        // Invoke all attached GDev.Systems.Tickfunctions
        for(const tickFunction of this.systemTickFunctions)
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
GDev.Composer.prototype.dump = () =>
{
    // dump information about the composer
    console.log(JSON.stringify(this, null, 4));
};