// ##################################################################
// Systems
//  To create systems, just add them here.
//  Some examples are already given below.
//  For more info, see: gdev_entity.js
// ##################################################################

"use-strict"

// LoadSprite
// Load the sprites of the given entity
//  Required components:
//  - Sprite
// ----------------------------------------------------------------------------
GDev.ECS.Systems.loadSprite = function(thisEntity)
{
    if(thisEntity.components.Sprite)
    {
        var path = thisEntity.components.Sprite._imagePath;
        if(path == "")
        {
            console.error("ECS.Systems.LoadSprite: 'imagePath' may not be empty! Entity id: "+thisEntity.id);
        }
        else
        {
            // Calculate cellCount
            thisEntity.components.Sprite.cellCount = thisEntity.components.Sprite.cellRows * thisEntity.components.Sprite.cellColumns;

            // If cellcount is greater than 1, this sprite is a spritesheet
            if(thisEntity.components.Sprite.cellCount > 1)
            {
                thisEntity.components.Sprite.isSpritesheet = true;
            }
            else
            {
                thisEntity.components.Sprite.isSpritesheet = false;   
            }

            if(thisEntity.components.Sprite.isSpritesheet)
            {
                thisEntity.components.Sprite.image = LoadImage2(path, thisEntity.components.Sprite.cellColumns, thisEntity.components.Sprite.cellRows, 0);
            }
            else
            {
                thisEntity.components.Sprite.image = LoadImage(path);
            }

            // Set the start frame to the first frame
            thisEntity.components.Sprite.currentFrame = 1;

            var isMidHandle = thisEntity.components.Sprite.isMidHandle;
            if(typeof thisEntity.components.Sprite.image == "undefined")
            {
                console.error("ECS.Systems.LoadSprite: Unable to load image: " + path + " Entity.id: "+thisEntity.id);
            }
            else
            {
                MidHandle(thisEntity.components.Sprite.image, isMidHandle);
            }
        }
    }
}

// Render one entity
//  Required components:
//  - Transform
//  - Sprite
//  - Text
// ----------------------------------------------------------------------------
GDev.ECS.Systems.renderEntity = function(thisEntity)
{
    // Render the sprite image
    if(thisEntity.components.Sprite && thisEntity.components.Transform)
    {
        // when it is not flagged hidden
        if(thisEntity.components.Sprite.isVisible)
        {
            var image = thisEntity.components.Sprite.image;
            var x = thisEntity.components.Transform.x;
            var y = thisEntity.components.Transform.y;
            var scaleX = thisEntity.components.Transform.scaleX;
            var scaleY = thisEntity.components.Transform.scaleY;
            var rotation = thisEntity.components.Transform.rotation;

            RotateImage(image, rotation);
            ScaleImage(image, scaleX, scaleY);
            DrawImage(image, x, y, thisEntity.components.Sprite.currentFrame);
            
            // when this entity is a combination of a sprite and text
            // then render the text aswell
            if(thisEntity.components.text)
            {
                // when it is flagged visible
                if(thisEntity.components.text.isVisible)
                {
                    var x = thisEntity.components.Transform.x + thisEntity.components.Text.offsetX;
                    var y = thisEntity.components.Transform.y + thisEntity.components.Text.offsetY;
                    var text = thisEntity.components.Text.text;
                    DrawText(text, x, y);
                }
            }
        }
    }
    // If this entity only has text and no sprite then render just the text
    else if(thisEntity.components.Text && thisEntity.components.Transform)
    {
        // when it is flagged visible
        if(thisEntity.components.Text.isVisible)
        {
            var x = thisEntity.components.Transform.x + thisEntity.components.Text.offsetX;
            var y = thisEntity.components.Transform.y + thisEntity.components.Text.offsetY;
            var text = thisEntity.components.Text.text;
            DrawText(text, x, y);
        }
    }
}

// Evaluate Script
// Must be called once before main loop
//  Required components:
//  - Script
// ----------------------------------------------------------------------------
GDev.ECS.Systems.evaluateScripts = function(entities)
{
    // Takes an array of entities
    // and evaluates the script attached to them.
    // Each script must consist of three functions:
    //  - onCreate()
    //  - onTick()
    //  - onDelete()
    // EvaluateScripts parses the source code string of the attached script and creates
    // these three function and attaches them to the assosiated entity.
    // The Invoke System can then simply call these functions.
    // (Optimization: only pass entities with ComponentScript attached)

    // The entity (named self to be able to access the entity with "self" within the script)
    var self;

    for(var id in entities)
    {
        self = entities[id];

        // Attaching the variables and functions defined in the script file
        // to the entity to make them available in javascript
        if(self.components.Script)
        {
            var code = self.components.Script.code;
            code = "({"+code+"})"
            // Assign the script variable with the actual script functions
            self.call = eval(code);
        }
    }
}

// Runs the script attached to an entity
// type is the function type that should be run (onCreate, onTick, onDelete)
//  Required components:
//  - Script
// ----------------------------------------------------------------------------
GDev.ECS.Systems.invoke = function(type, thisEntity)
{
    if(thisEntity.components.Script)
    {
        switch(type)
        {
            case "onCreate":
                thisEntity.call.onCreate();
                break;
            case "onTick":
                thisEntity.call.onTick();
                break;
            case "onDelete":
                thisEntity.call.onDelete();
                break;
        }
    }
}

// If an entity has the scene component, then entites can be added to it
//  Required components:
//  - Scene
// ----------------------------------------------------------------------------
GDev.ECS.Systems.addEntityToScene = function(sceneEntity, newEntity)
{
    if(sceneEntity.components.Scene)
    {
        sceneEntity.components.Scene.entities[newEntity.id] = newEntity;
    }
}

// If an entity has the scene component, then entites can be deleted from it
//  Required components:
//  - Scene
// ----------------------------------------------------------------------------
GDev.ECS.Systems.deleteEntityFromScene = function(sceneEntity, entityToDelete)
{
    if(sceneEntity.components.Scene)
    {
        // before deleting the entity, call its user defined onDelete function
        GDev.ECS.Systems.invoke("onDelete", entityToDelete);
        delete sceneEntity.components.Scene.entities[entityToDelete.id];
    }
}

// If an entity has the scene component, then it can be deleted including all its attached entities
//  Required components:
//  - Scene
// ----------------------------------------------------------------------------
GDev.ECS.Systems.deleteScene = function(sceneEntity)
{
    if(sceneEntity.components.Scene)
    {
        // If the scene entity has a script component
        // then call its user defined onDelete function
        GDev.ECS.Systems.invoke("onDelete", sceneEntity);

        // And remove all entites from the scene (and also call their onDelete function)
        var entityToDelete;
        for(var id in sceneEntity.components.Scene.entities)
        {
            entityToDelete = entities[id];
            GDev.ECS.Systems.deleteEntityFromScene(sceneEntity, entityToDelete)
        }
    }
}


// ----------------------------------------------------------------------------
//
// Below are the System functions that should be called on every tick
// and takes an entity as argument.
// Therefore, they should be registered via:
// GDev.registerTickFunction(GDev.ECS.Systems.myFunction(thisEntity))
//
// ----------------------------------------------------------------------------


// Update the Mouselistener for the given entity
//  Required components:
//  - MouseListener
//  - Sprite
//  - Transform
// ----------------------------------------------------------------------------
GDev.ECS.Systems.updateMouseListener = function(thisEntity)
{
    if(thisEntity.components.MouseListener && thisEntity.components.Sprite && thisEntity.components.Transform)
    {

        var spriteX = thisEntity.components.Transform.x;
        var spriteY = thisEntity.components.Transform.y;
        var spriteWidth = ImageWidth(thisEntity.components.Sprite.image);
        var spriteHeight = ImageHeight(thisEntity.components.Sprite.image);
        var isMidhandle = thisEntity.components.Sprite.isMidHandle;

        thisEntity.components.MouseListener.isMouseHover = false;

        // Checking if mouse is hovering over the sprite
        if(isMidhandle)
        {
            if(GDev.Keys.MouseX >= spriteX-spriteWidth/2 && GDev.Keys.MouseX <= spriteX + spriteWidth/2)
            {
                if(GDev.Keys.MouseY >= spriteY-spriteHeight/2 && GDev.Keys.MouseY <= spriteY + spriteHeight/2)
                {
                    thisEntity.components.MouseListener.isMouseHover = true;
                }
            }
        }
        else
        {
            if(GDev.Keys.MouseX >= spriteX && GDev.Keys.MouseX <= spriteX + spriteWidth)
            {
                if(GDev.Keys.MouseY >= spriteY && GDev.Keys.MouseY <= spriteY + spriteHeight)
                {
                    thisEntity.components.MouseListener.isMouseHover = true;
                }
            }
        }

        if (thisEntity.components.MouseListener.isMouseHover)
        {
            //thisEntity.components.mouseListener.isMouseHit = GDev.Keys.MouseHit;
            thisEntity.components.MouseListener.isMouseDown = GDev.Keys.MouseDown;
        }
        else
        {
            //thisEntity.components.mouseListener.isMouseHit = false;
            thisEntity.components.MouseListener.isMouseDown = false;
        }
    }
}
// Register this function to GDev so it gets executed on every tick
GDev.registerTickFunction(GDev.ECS.Systems.updateMouseListener)