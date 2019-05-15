{
    "scene": {
        "name": "scene1",
        "entities": {
            "name": "entity1",
            "components": {
                "position": {
                    "x": 200,
                    "y": 200
                },
                "health": {
                    "value": 20
                },
                "sprite": {
                    "_imagePath": "media/image.png",
                    "isHidden": false,
                    "isMidHandle": true,
                    "rotation": 0,
                    "scaleX": 1,
                    "scaleY": 1
                },
                "mouseListener": {
                    "isMouseDown": false,
                    "isMouseHover": false
                }
            }
        }
    }
}

// Creating the composer (manager for scene entities)
var mycomposer = new GDev.Composer();

// Creating a scene entity
var scene1 = new GDev.ECS.Entity();
scene1.name = "scene1";
scene1.addComponent(new GDev.ECS.Components.Scene());

mycomposer.addScene(scene1);

// Creating an entity
var entity1 = new GDev.ECS.Entity();
entity1.addComponent(new GDev.ECS.Components.Position(200,200));
entity1.addComponent(new GDev.ECS.Components.Health(20));
entity1.addComponent(new GDev.ECS.Components.Sprite("media/image.png"));
entity1.addComponent(new GDev.ECS.Components.MouseListener());

mycomposer.addEntityToScene(scene1, entity1);

// Initialize the graphics context
Graphics(GDev.Properties.CanvasWidth, GDev.Properties.CanvasHeight, GDev.Properties.AppTitle);
ClsColor(GDev.Properties.ClsColor.r, GDev.Properties.ClsColor.g, GDev.Properties.ClsColor.b);
TFormFilter(false);

// Go to first scene
mycomposer.goToScene(scene1);

// Main function with AppTitle as function name 
window[GDev.Properties.AppTitle] = function()
{
    Cls();
    GDev.Update();

    mycomposer.renderActiveScene();
}