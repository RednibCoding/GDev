// ##################################################################
// Systems
//  To create systems, just add them here.
//  Some examples are already given below.
//  For more info, see: gdev_ecs.js
// ##################################################################

// LoadSprite
// Load the sprites of the given entites
//  Required components:
//  - Sprite
// ----------------------------------------------------------------------------
GDev.ECS.Systems.LoadSprite = function SystemLoadSprite(thisEntity)
{
    if(thisEntity.components.sprite)
    {
        var path = thisEntity.components.sprite._imagePath;
        if(path == "")
        {
            console.error("ECS.Systems.LoadSprite: 'imagePath' may not be empty! Entity id: "+thisEntity.id);
        }
        else
        {
            // Calculate cellCount
            thisEntity.components.sprite.cellCount = thisEntity.components.sprite.cellRows * thisEntity.components.sprite.cellColumns;

            // If cellcount is greater than 1, this sprite is a spritesheet
            if(thisEntity.components.sprite.cellCount > 1)
            {
                thisEntity.components.sprite.isSpritesheet = true;
            }
            else
            {
                thisEntity.components.sprite.isSpritesheet = false;   
            }

            if(thisEntity.components.sprite.isSpritesheet)
            {
                thisEntity.components.sprite.image = LoadImage2(path, thisEntity.components.sprite.cellColumns, thisEntity.components.sprite.cellRows, 0);
                //thisEntity.components.sprite.image = LoadImage(path, 46, 40, 1, 4);
            }
            else
            {
                thisEntity.components.sprite.image = LoadImage(path);
            }
            // Set the start frame to the first frame
            thisEntity.components.sprite.currentFrame = 3;
            var isMidHandle = thisEntity.components.sprite.isMidHandle;
            if(typeof thisEntity.components.sprite.image == 'undefined')
            {
                console.error("ECS.Systems.LoadSprite: Unable to load image: " + path + " Entity.id: "+thisEntity.id);
            }
            else
            {
                MidHandle(thisEntity.components.sprite.image, isMidHandle);
            }

        }
    }
}

// LoadSprites
// Load the sprites of all given entites
//  Required components:
//  - Sprite
// ----------------------------------------------------------------------------
GDev.ECS.Systems.LoadSprites = function SystemLoadSprites(entities)
{
    // Takes an array of entities
    // and loads their sprite image into memory
    // (Optimization: only pass entities with ComponentSprite attached)

    var thisEntity;

    for(var id in entities)
    {
        thisEntity = entities[id];
        GDev.ECS.Systems.LoadSprite(thisEntity);
       
    }
}

// Render one entity
//  Required components:
//  - Transform
//  - Sprite
// ----------------------------------------------------------------------------
GDev.ECS.Systems.RenderEntity = function SystemRenderEntity(thisEntity)
{
    // Render the sprite image
    if(thisEntity.components.sprite && thisEntity.components.transform)
    {
        // when it is not flagged hidden
        if(!thisEntity.components.sprite.isHidden)
        {
            var image = thisEntity.components.sprite.image;
            var x = thisEntity.components.transform.x;
            var y = thisEntity.components.transform.y;
            var scaleX = thisEntity.components.transform.scaleX;
            var scaleY = thisEntity.components.transform.scaleY;
            var rotation = thisEntity.components.transform.rotation;

            RotateImage(image, rotation);
            ScaleImage(image, scaleX, scaleY);
            DrawImage(image, x, y, thisEntity.components.sprite.currentFrame);
            
            // when this entity is a combination of a sprite and text
            // then render the text aswell
            if(thisEntity.components.text)
            {
                // when it is not flagged hidden
                if(!thisEntity.components.text.isHidden)
                {
                    var x = thisEntity.components.transform.x + thisEntity.components.text.offsetX;
                    var y = thisEntity.components.transform.y + thisEntity.components.text.offsetY;
                    var text = thisEntity.components.text.value;
                    DrawText(text, x, y);
                }
            }
        }
    }
    // If this entity only has text and no sprite then render just the text
    else if(thisEntity.components.text && thisEntity.components.transform)
    {
        // when it is not flagged hidden
        if(!thisEntity.components.text.isHidden)
        {
            var x = thisEntity.components.transform.x + thisEntity.components.text.offsetX;
            var y = thisEntity.components.transform.y + thisEntity.components.text.offsetY;
            var text = thisEntity.components.text.value;
            DrawText(text, x, y);
        }
    }
}

// Transpile Script
// Must be called once before main loop
//  Required components:
//  - Script
GDev.ECS.Systems.TranspileScripts = function TranspileScripts(entities)
{
    // Takes an array of entities
    // and evaluates the script attached to them.
    // Each script must consist of three functions:
    //  - onCreate()
    //  - onRender()
    //  - onDelete()
    // TranspileScript parses the source code string of the attached script and creates
    // these three function and attaches them to the assosiated entity.
    // The RunScript System can then simply call these functions.
    // (Optimization: only pass entities with ComponentScript attached)

    // The entity (named self to be able to access the entity with "self" within the script)
    var self;

    for(var id in entities)
    {
        self = entities[id];

        // Attaching the variables and functions defined in the script file
        // to the entity to make them available in javascript
        if(self.components.script)
        {
            var code = self.components.script.code;
            // Assign the script variable with the actual script functions
            self.script = eval(code);
        }
    }
}

// Runs the script attached to an entity
// type is the function type that should be run (onCreate, onRender, onDelete)
//  Required components:
//  - Script
GDev.ECS.Systems.RunScript = function RunScripts(type, thisEntity)
{
    if(thisEntity.components.script)
    {
        // TODO: find a better solution than switch
        switch(type)
        {
            case "onCreate":
                thisEntity.script.onCreate();
                break;
            case "onTick":
                thisEntity.script.onTick();
                break;
            case "onDelete":
                thisEntity.script.onDelete();
                break;
        }
    }
}

// Runs the scripts attached to all the given entities
// type is the function type that should be run (onCreate, onRender, onDelete)
//  Required components:
//  - Script
GDev.ECS.Systems.RunScripts = function RunScripts(type, entities)
{
    var thisEntity;

    for(var id in entities)
    {
        thisEntity = entities[id];
        GDev.ECS.Systems.RunScript(type, thisEntity);
    }
}

// If an entity has the scene component, then entites can be added to it
//  Required components:
//  - Scene
GDev.ECS.Systems.AddEntityToScene = function AddEntityToScene(sceneEntity, newEntity)
{
    if(sceneEntity.components.scene)
    {
        sceneEntity.components.scene.entities[newEntity.id] = newEntity;
    }
}

// If an entity has the scene component, then entites can be deleted from it
//  Required components:
//  - Scene
GDev.ECS.Systems.DeleteEntity = function DeleteEntity(sceneEntity, entityToDelete)
{
    if(sceneEntity.components.scene)
    {
        // before deleting the entity, call its user defined onDelete function
        GDev.ECS.Systems.RunScript("onDelete", entityToDelete);
        delete sceneEntity.components.scene.entities[entityToDelete.id];
    }
}

// If an entity has the scene component, then it can be freed so all its attached entities getting deleted
//  Required components:
//  - Scene
GDev.ECS.Systems.FreeSceneEntity = function FreeSceneEntity(sceneEntity)
{
    if(sceneEntity.components.scene)
    {
        // If the scene entity has a script component
        // then call its user defined onDelete function
        GDev.ECS.Systems.RunScript("onDelete", sceneEntity);

        // And remove all entites from the scene (and also call their onDelete function)
        var entityToDelete;
        for(var id in sceneEntity.components.scene.entities)
        {
            entityToDelete = entities[id];
            GDev.ECS.Systems.RemoveEntityFromScene(sceneEntity, entityToDelete)
        }
    }
}

// Update the Mouselistener for the given entity
//  Required components:
//  - MouseListener
//  - Sprite
//  - Transform
GDev.ECS.Systems.UpdateMouseListener = function UpdateMouseListener(thisEntity)
{
    if(thisEntity.components.mouseListener && thisEntity.components.sprite && thisEntity.components.transform)
    {

        var spriteX = thisEntity.components.transform.x;
        var spriteY = thisEntity.components.transform.y;
        var spriteWidth = ImageWidth(thisEntity.components.sprite.image);
        var spriteHeight = ImageHeight(thisEntity.components.sprite.image);
        var isMidhandle = thisEntity.components.sprite.isMidHandle;

        thisEntity.components.mouseListener.isMouseHover = false;

        // Checking if mouse is hovering over the sprite
        if(isMidhandle)
        {
            if(GDev.Keys.MouseX >= spriteX-spriteWidth/2 && GDev.Keys.MouseX <= spriteX + spriteWidth/2)
            {
                if(GDev.Keys.MouseY >= spriteY-spriteHeight/2 && GDev.Keys.MouseY <= spriteY + spriteHeight/2)
                {
                    thisEntity.components.mouseListener.isMouseHover = true;
                }
            }
        }
        else
        {
            if(GDev.Keys.MouseX >= spriteX && GDev.Keys.MouseX <= spriteX + spriteWidth)
            {
                if(GDev.Keys.MouseY >= spriteY && GDev.Keys.MouseY <= spriteY + spriteHeight)
                {
                    thisEntity.components.mouseListener.isMouseHover = true;
                }
            }
        }

        if (thisEntity.components.mouseListener.isMouseHover)
        {
            //thisEntity.components.mouseListener.isMouseHit = GDev.Keys.MouseHit;
            thisEntity.components.mouseListener.isMouseDown = GDev.Keys.MouseDown;
        }
        else
        {
            //thisEntity.components.mouseListener.isMouseHit = false;
            thisEntity.components.mouseListener.isMouseDown = false;
        }
    }
}
