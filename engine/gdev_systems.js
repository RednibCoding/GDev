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
GDev.ECS.Systems.loadSprite = (thisEntity) =>
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
            }
            else
            {
                thisEntity.components.sprite.image = LoadImage(path);
            }

            // Set the start frame to the first frame
            thisEntity.components.sprite.currentFrame = 1;

            var isMidHandle = thisEntity.components.sprite.isMidHandle;
            if(typeof thisEntity.components.sprite.image == "undefined")
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

// Render one entity
//  Required components:
//  - Transform
//  - Sprite
//  - Text
// ----------------------------------------------------------------------------
GDev.ECS.Systems.renderEntity = (thisEntity) =>
{
    // Render the sprite image
    if(thisEntity.components.sprite && thisEntity.components.transform)
    {
        // when it is not flagged hidden
        if(thisEntity.components.sprite.isVisible)
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

// Evaluate Script
// Must be called once before main loop
//  Required components:
//  - Script
// ----------------------------------------------------------------------------
GDev.ECS.Systems.evaluateScripts = (entities) =>
{
    // Takes an array of entities
    // and evaluates the script attached to them.
    // Each script must consist of three functions:
    //  - onCreate()
    //  - onTick()
    //  - onDelete()
    // EvaluateScripts parses the source code string of the attached script and creates
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
// ----------------------------------------------------------------------------
GDev.ECS.Systems.invoke = (type, thisEntity) =>
{
    if(thisEntity.components.script)
    {
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

// If an entity has the scene component, then entites can be added to it
//  Required components:
//  - Scene
// ----------------------------------------------------------------------------
GDev.ECS.Systems.addEntityToScene = (sceneEntity, newEntity) =>
{
    if(sceneEntity.components.scene)
    {
        sceneEntity.components.scene.entities[newEntity.id] = newEntity;
    }
}

// If an entity has the scene component, then entites can be deleted from it
//  Required components:
//  - Scene
// ----------------------------------------------------------------------------
GDev.ECS.Systems.deleteEntityFromScene = (sceneEntity, entityToDelete) =>
{
    if(sceneEntity.components.scene)
    {
        // before deleting the entity, call its user defined onDelete function
        GDev.ECS.Systems.invoke("onDelete", entityToDelete);
        delete sceneEntity.components.scene.entities[entityToDelete.id];
    }
}

// If an entity has the scene component, then it can be deleted including all its attached entities
//  Required components:
//  - Scene
// ----------------------------------------------------------------------------
GDev.ECS.Systems.deleteScene = (sceneEntity) =>
{
    if(sceneEntity.components.scene)
    {
        // If the scene entity has a script component
        // then call its user defined onDelete function
        GDev.ECS.Systems.invoke("onDelete", sceneEntity);

        // And remove all entites from the scene (and also call their onDelete function)
        var entityToDelete;
        for(var id in sceneEntity.components.scene.entities)
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
// GDev.composer.registerTickFunction(GDev.ECS.Systems.myFunction(thisEntity))
//
// ----------------------------------------------------------------------------


// Update the Mouselistener for the given entity
//  Required components:
//  - MouseListener
//  - Sprite
//  - Transform
// ----------------------------------------------------------------------------
GDev.ECS.Systems.updateMouseListener = (thisEntity) =>
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
// Register this function to the composer so it gets executed on every tick
GDev.composer.registerTickFunction(GDev.ECS.Systems.updateMouseListener)