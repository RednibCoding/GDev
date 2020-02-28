"use-strict"

// Transform component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Transform = function(x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	return this;
};GDev.ECS.Components.Transform.prototype.name = "Transform";

/* @@ Component
	NAME Text;
	DESC Blabla;

	ARGS.text [
		TYPE string;
		DESC blabla;
	];

	ARGS.text [
		TYPE string;
		DESC blabla;
	];

*/
// ----------------------------------------------------------------------------
GDev.ECS.Components.Text = function(text = "", isVisible = true, offsetX = 0, offsetY = 0)
{
	this.text = text;
	this.isVisible = isVisible;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	return this;
};GDev.ECS.Components.Text.prototype.name = "Text";

// Sprite component
// ----------------------------------------------------------------------------
GDev.ECS.Components.Sprite = function(imagePath, isVisible = true, isMidHandle = true, cellColumns = 1, cellRows = 1)
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

/*@ COMPONENT
	NAME Script;
	DOC DESC The script must contain the following three functions: onCreate, onTick, onDelete;

	# This is a comment

	DOC ARGS code [
		TYPE string;
		DESC blabla;
	]
	EDITOR ARGS path [
		TYPE string;
		DESC blabla;
	]
*/
// ----------------------------------------------------------------------------
GDev.ECS.Components.Script = function(code = "")
{
	this.code = code;
	return this;
};GDev.ECS.Components.Script.prototype.name = "Script";


// Scene component
// A scene component is a container for entities
// This way a scene like behavior can be realised
/*@ COMPONENT
	NAME Scene;
	DESC Blabla;

	DOC ARGS isStartScene [
		TYPE bool;
		DESC blabla;
	]
*/
// ----------------------------------------------------------------------------
GDev.ECS.Components.Scene = function(isStartScene = false)
{
	if(isStartScene !== true && isStartScene !== false)
	{
		console.error("isStartScene must be of type Boolean!")
	}

	this.bgRed = 0;
	this.bgGreen = 0;
	this.bgBlue = 0;

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
GDev.ECS.Components.MouseListener = function()
{
	this.isMouseDown;
	this.isMouseHover;
	return this;
};GDev.ECS.Components.MouseListener.prototype.name = "MouseListener";


