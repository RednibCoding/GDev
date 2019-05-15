// ##################################################################
// Component
//  To create components, just add them here.
//  Some examples are already given below.
//  For more info, see: gdev_ecs.js
//
// Note: All variables that can be changed by the user must be passable
// as function argument
// ##################################################################



// Transform component
// Note: All variables that can be changed by the user must be passable
// as function argument
// ----------------------------------------------------------------------------
GDev.ECS.Components.Transform = function ComponentTransform(x = 0, y = 0, rot = 0, sX = 1, sY = 1)
{
    this.x = x;
    this.y = y;
    this.rotation = rot;
    this.scaleX = sX;
    this.scaleY = sY;
    return this;
};
GDev.ECS.Components.Transform.prototype.name = 'transform';


// Text component
// Note: All variables that can be changed by the user must be passable
// as function argument
// ----------------------------------------------------------------------------
GDev.ECS.Components.Text = function ComponentText(value = "", isHidden = false, offsetX = 0, offsetY = 0)
{
    this.value = value;
    this.isHidden = isHidden;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    return this;
};
GDev.ECS.Components.Text.prototype.name = 'text';


// Sprite component
// Note: All variables that can be changed by the user must be passable
// as function argument
// ----------------------------------------------------------------------------
GDev.ECS.Components.Sprite = function ComponentSprite(imagePath, image = null, isHidden = false, isMidHandle = true)
{
    imagePath = imagePath || "";
    this._imagePath = imagePath;

    // Must be loaded via 'LoadImage(this._imagePath)'
    this.image;

    // Determines if a sprite is hidden or not
    this.isHidden = isHidden;

    // Set the image origin point to the middle
    this.isMidHandle = isMidHandle;

    return this;
};
GDev.ECS.Components.Sprite.prototype.name = 'sprite';


// Script component
// The script must contain the following three functions:
//  - onCreate()
//  - onRender()
//  - onDelete()
// So the script file must lool like as follows:
/*
    onCreate()
    {
        // your code here
        console.log('This comes from onCreate');
    },
    onRender()
    {
        // your code here
    },
    onDelete()
    {
        // your code here
    }
*/
// Note: All variables that can be changed by the user must be passable
// as function argument
// ----------------------------------------------------------------------------
GDev.ECS.Components.Script = function ComponentScript(code = "")
{
    this.code = code;
    return this;
};
GDev.ECS.Components.Script.prototype.name = 'script';


// Scene component
// A scene component is a container for entities
// This way a scene like behavior can be realised
// Note: All variables that can be changed by the user must be passable
// as function argument
// ----------------------------------------------------------------------------
GDev.ECS.Components.Scene = function ComponentScene(isStartScene = false)
{
    this.isStartScene = isStartScene;
    // List of all entities in this scene
    this.entities = {};
    return this;
};
GDev.ECS.Components.Scene.prototype.name = 'scene';


// MouseListener
// Makes it possible for an entity to check if the mouse is hovering over it
// or if it was clicked
// Note: All variables that can be changed by the user must be passable
// as function argument
// ----------------------------------------------------------------------------
GDev.ECS.Components.MouseListener = function ComponentMouseListener()
{
    //this.isMouseHit=false;
    this.isMouseDown;
    this.isMouseHover;
    return this;
};
GDev.ECS.Components.MouseListener.prototype.name = 'mouseListener';