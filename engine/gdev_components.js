"use-strict"

// Transform component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Transform = (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) =>
{
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    return this;
};GDev.ECS.Components.Transform.prototype.name = "Transform";

// Text component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Text = (value = "", isHidden = false, offsetX = 0, offsetY = 0) =>
{
    this.value = value;
    this.isHidden = isHidden;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    return this;
};GDev.ECS.Components.Text.prototype.name = "Text";

// Sprite component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Sprite = (imagePath, isHidden = false, isMidHandle = true, cellColumns = 1, cellRows = 1) =>
{
    imagePath = imagePath || "";
    this._imagePath = imagePath;

    // Must be loaded via 'LoadImage(this._imagePath)'
    this.image;

    // Determines if a sprite is visible or not
    this.isVisible = isVisible;

    // Set the image origin point to the middle
    this.isMidHandle = isMidHandle;

    // If this image is a sprite sheet
    // These parameters can be changed according to the spritesheet
    // If cellCount is greater than 1, this sprite is considered as spritesheet
    // For more info see: System LoadSprite
    this.cellColumns = cellColumns;
    this.cellRows = cellRows;
    this.cellCount;
    this.cellWidth;
    this.cellHeight;
    this.isSpritesheet;
    this.currentFrame;

    return this;
};GDev.ECS.Components.Sprite.prototype.name = "Sprite";

// Script component
// The script must contain the following three functions:
//  - onCreate()
//  - onTick()
//  - onDelete()
// So the script file must lool like as follows:
/*
    onCreate()
    {
        // your code here
        console.log('This comes from onCreate');
    },
    onTick()
    {
        // your code here
    },
    onDelete()
    {
        // your code here
    }
*/
// ----------------------------------------------------------------------------
GDev.ECS.Components.Script = (code = "") =>
{
    this.code = code;
    return this;
};GDev.ECS.Components.Script.prototype.name = "Script";

// Scene component
// A scene component is a container for entities
// This way a scene like behavior can be realised
// ----------------------------------------------------------------------------
GDev.ECS.Components.Scene = (isStartScene = false) =>
{
    if(isStartScene !== true && isStartScene !== false)
    {
        console.error("isStartScene is not of type Boolean!")
    }

    // Entry scene of the game
    this.isStartScene = isStartScene;

    // List of all entities in this scene
    this.entities = {};
    return this;
};GDev.ECS.Components.Scene.prototype.name = "Scene";

// MouseListener
// Makes it possible for an entity to check if the mouse is hovering over it
// or if it was clicked
// Note: All variables that can be changed by the user must be passable
// as function argument
// ----------------------------------------------------------------------------
GDev.ECS.Components.MouseListener = () =>
{
    this.isMouseDown;
    this.isMouseHover;
    return this;
};GDev.ECS.Components.MouseListener.prototype.name = "MouseListener";