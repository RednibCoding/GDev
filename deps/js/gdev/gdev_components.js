// ##################################################################
// Component
//  To create components, just add them here.
//  Some examples are already given below.
//  For more info, see: gdev_ecs.js
// ##################################################################



// Position component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Position = function ComponentPosition(x, y)
{
    x = x || 0;
    y = y || 0;
    this.x = x;
    this.y = y;
    return this;
};
GDev.ECS.Components.Position.prototype.name = 'position';


// Health component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Health = function ComponentHealth(value)
{
    value = value || 0;
    this.value = value;
    return this;
};
GDev.ECS.Components.Health.prototype.name = 'health';


// Text component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Text = function ComponentText(value)
{
    value = value || "";
    this.value = value;
    // Determines if a text is hidden or not
    this.isHidden = false;

    this.offsetX = 0;
    this.offsetY = 0;
    return this;
};
GDev.ECS.Components.Text.prototype.name = 'text';


// Sprite component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Sprite = function ComponentSprite(imagePath)
{
    imagePath = imagePath || "";
    this._imagePath = imagePath;

    // Must be loaded via 'LoadImage(this._imagePath)'
    this.image;

    // Determines if a sprite is hidden or not
    this.isHidden = false;

    // Set the image origin point to the middle
    this.isMidHandle = true;

    // Rotation of the sprite
    this.rotation = 0;

    // Scale of the image
    this.scaleX = 1;
    this.scaleY = 1;

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
// ----------------------------------------------------------------------------
GDev.ECS.Components.Script = function ComponentScript(code)
{
    code = code || "";
    this.code = code;
    return this;
};
GDev.ECS.Components.Script.prototype.name = 'script';


// Scene component
// A scene component is a container for entities
// This way a scene like behavior can be realised
// ----------------------------------------------------------------------------
GDev.ECS.Components.Scene = function ComponentScene()
{
    // List of all entities in this scene
    this.entities = {};
    return this;
};
GDev.ECS.Components.Scene.prototype.name = 'scene';


// MouseListener
// Makes it possible for an entity to check if the mouse is hovering over it
// or if it was clicked
// ----------------------------------------------------------------------------
GDev.ECS.Components.MouseListener = function ComponentMouseListener()
{
    //this.isMouseHit=false;
    this.isMouseDown=false;
    this.isMouseHover=false;
    return this;
};
GDev.ECS.Components.MouseListener.prototype.name = 'mouseListener';