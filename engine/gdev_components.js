// ##################################################################
// Component
//  To create components, just add them here.
//  Some examples are already given below.
//  For more info, see: gdev_ecs.js
//
//
// Note: All variables that get not only declared but also defined
// in the function, will automatically be exported to the .gdp-file when calling the GDev.Serializer.
// That means, that the transpiler will consider them when creating the game.js out of the .gdp-file.
//
// Example:
//  When you have created a new component:
//      GDev.ECS.Components.MyComponent = function ComponentMyComponent(a = 1, b = 2, c = 3)
//      {
//          // When you want the serializer to ignore a variable
//          // then just define them without declaring them
//          this.foo;
//
//          // When you want the serializer to export a variable as component {PROPERTY}
//          // Then give them any initial value:
//          this.bar=0;
//
//          Note that the transpiler will pass arguments in the same order
//          they were serialized / declared here.
//          So when you want, that arguments get passed in the correct order
//          You have to declare them in the right order:
//          this.a = a;
//          this.b = b;
//          this.c = c;
//          
//      }
//      GDev.ECS.Components.MyComponent.prototype.name = 'mycomponent';
//
//  The serializer will serialze them in the following order:
//  {PROPERTY}:a=1
//  {PROPERTY}:b=2
//  {PROPERTY}:c=3
//
//  The transpiler will create the corresponding code out of it:
//  addComponent(new GDev.ECS.Components.MyComponent(1,2,3));
//  
//  If you would declare the variables in a different order, they will be passed in a different order.
//  So for example declaring them in this order:
//  this.c = c;
//  this.a = a;
//  this.b = b;
//
//  Will create the following .gdp output from the serializer
//  {PROPERTY}:c=3
//  {PROPERTY}:a=1
//  {PROPERTY}:b=2
//
//  And the transpiler would generate the following output:
//  addComponent(new GDev.ECS.Components.MyComponent(3,1,2));
//
//  So keep in mind: always declare the variables in the order they should passed in as arguments
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
GDev.ECS.Components.Sprite = function ComponentSprite(imagePath, isHidden = false, isMidHandle = true, cellColumns = 1, cellRows = 1)
{
    imagePath = imagePath || "";
    this._imagePath = imagePath;

    // Must be loaded via 'LoadImage(this._imagePath)'
    this.image;

    // Determines if a sprite is hidden or not
    this.isHidden = isHidden;

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
};
GDev.ECS.Components.Sprite.prototype.name = 'sprite';


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
    if(isStartScene !== true && isStartScene !== false)
    {
        console.error("isStartScene is not of type Boolean!")
    }

    // Entry scene of the game
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