// ######################################################
// This is just an example game for testing the GDev lib
// ######################################################

// Creating the composer (manager for scene entities)
GDev.composer = new GDev.Composer();

// Creating a scene entity
var scene1 = new GDev.ECS.Entity("scene1");
scene1.addComponent(new GDev.ECS.Components.Scene(true));
//scene1.components.scene.isStartScene = true;
//scene1.addComponent(new GDev.ECS.Components.Script(document.getElementById('file').textContent));
// And adding it to the composer
GDev.composer.addScene(scene1);


var scene2 = new GDev.ECS.Entity("scene2");
scene2.addComponent(new GDev.ECS.Components.Scene());
GDev.composer.addScene(scene2);


// Creating an entity
var entity1 = new GDev.ECS.Entity("entity1");
entity1.addComponent(new GDev.ECS.Components.Transform(200,200));
entity1.addComponent(new GDev.ECS.Components.Sprite("media/ship.png"));
entity1.addComponent(new GDev.ECS.Components.MouseListener());
entity1.addComponent(new GDev.ECS.Components.Script(document.getElementById('file').textContent));
//"x:10, onCreate(){this.test(self.components.position.x)}, onRender(){}, onDelete(){}, test(val){ console.log(val) }"
//document.getElementById('testCode').textContent)


var entity2 = new GDev.ECS.Entity("entity2");
entity2.addComponent(new GDev.ECS.Components.Transform(200,200));
entity2.addComponent(new GDev.ECS.Components.Text("Scene2"));


GDev.composer.addEntityToScene(scene1, entity1);
GDev.composer.addEntityToScene(scene2, entity2);

entity2.log();

GDev.composer.finalize();

GDev.composer.setStartSceneAsActiveScene();

GDev.composer.serialize();

GDev.composer.onCreate();

// Initialize the graphics context
Graphics(GDev.Properties.CanvasWidth, GDev.Properties.CanvasHeight, GDev.Properties.AppTitle);
ClsColor(GDev.Properties.ClsColor.r, GDev.Properties.ClsColor.g, GDev.Properties.ClsColor.b);
TFormFilter(false);

GDev.composer.loadSprites();


// Main function with AppTitle as function name 
window[GDev.Properties.AppTitle] = function()
{
    Cls();
    GDev.Update();

    GDev.composer.onTick();
}