/*

	Class for a scene

	A scene can be the "title menue", the "game over" screen, different levels in a game etc.

*/

// ----------------------------------------------------------------------------

GDev.Scene = function Scene()
{
    // Check if the static id has been initialized
    if (typeof Scene.prototype._id == 'undefined'){Scene.prototype._id = 0;}
    Scene.prototype._id++;

    // Static counter to keep track of Scene count
    if (typeof GDev.Scene.prototype._count == 'undefined'){GDev.Scene.prototype._count = 0;}
    GDev.Scene.prototype._count++;

    this.type = "scene"; // Just that log output looks nicer
    this.id = Scene.prototype._id;

    // List of all entities in this scene
    this.entities = {};

    // Script
    this.code = "";
    this.func;

    return this;
};

GDev.Scene.prototype.addSceneScript = function addSceneScript(code)
{
    code = code || "";
    this.code = "({ " + code + "})";
};

GDev.Scene.prototype.addEntity = function addEntity(entity)
{
    this.entities[entity.id] = entity;
};

GDev.Scene.prototype.removeEntity = function removeEntity(entity)
{
    // Before deleting the entity, call its onDelete() defined by the user script
    if(entity.components.script)
    {
        entity.func.onDelete();
    }
    // Remove entity data by removing the reference to it.
    delete this.entities[entity.id];
};

// Execute this once before the main loop to assign all scripts to the entities and the scene
GDev.Scene.prototype.init = function sceneInit()
{
    // Assign script to scene
    if(this.code != "")
    {
        this.func = eval(this.code);
    }
    // Assign script to entities
    GDev.ECS.Systems.AssignScript(this.entities);
    // Load sprites of entities
    GDev.ECS.Systems.LoadSprite(this.entities);
};


// Execute the onCreate() function of each entity in the scene
GDev.Scene.prototype.create = function sceneCreate()
{
    
    if(this.code != "")
    {
        this.func.onCreate();
    }
    GDev.ECS.Systems.RunScript("onCreate", this.entities);
};

// Execute the onRender() function of each entity in the scene
// Also execute the engines render function
GDev.Scene.prototype.render = function sceneRender()
{
    if(this.code != "")
    {
        this.func.onRender();
    }
    GDev.ECS.Systems.RunScript("onRender", this.entities);
    GDev.ECS.Systems.Render(this.entities);
};

// Execute the onDelete() function of each entity in the scene
GDev.Scene.prototype.delete = function sceneDelete()
{
    if(this.code != "")
    {
        this.func.onDelete();
    }
    GDev.ECS.Systems.RunScript("onDelete", this.entities);
};