// ######################################################
// This is just an example game for testing the GDev lib
// ######################################################

// Creating the composer (manager for scene entities)
var composer = new GDev.Composer();

// Creating a scene entity
var scene1 = new GDev.ECS.Entity();
scene1.addComponent(new GDev.ECS.Components.Scene());
//scene1.addComponent(new GDev.ECS.Components.Script(document.getElementById('file').textContent));
// And adding it to the composer
composer.addScene(scene1);

// Creating an entity
var entity1 = new GDev.ECS.Entity();
entity1.addComponent(new GDev.ECS.Components.Position(200,200));
entity1.addComponent(new GDev.ECS.Components.Health(20));
entity1.addComponent(new GDev.ECS.Components.Sprite("media/ship.png"));
entity1.addComponent(new GDev.ECS.Components.MouseListener());
entity1.addComponent(new GDev.ECS.Components.Script(document.getElementById('file').textContent));
//"x:10, onCreate(){this.test(self.components.position.x)}, onRender(){}, onDelete(){}, test(val){ console.log(val) }"
//document.getElementById('testCode').textContent)
entity1.log();

composer.addEntityToScene(scene1, entity1);
scene1.log();

composer.finalize();

// Initialize the graphics context
Graphics(GDev.Properties.CanvasWidth, GDev.Properties.CanvasHeight, GDev.Properties.AppTitle);
ClsColor(GDev.Properties.ClsColor.r, GDev.Properties.ClsColor.g, GDev.Properties.ClsColor.b);
TFormFilter(false);

composer.loadSprites();

composer.goToScene(scene1);


// Main function with AppTitle as function name 
window[GDev.Properties.AppTitle] = function()
{
    Cls();
    GDev.Update();

    composer.renderActiveScene();
}