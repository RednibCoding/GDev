
/***************************************************************************
 *                                                                         *
 *  This file has been created by the  GDev Game Editor  © Michael Binder  *
 *                                                                         *
 ***************************************************************************/

// GDev Properties
GDev.Properties.AppTitle='GDevApp';
GDev.Properties.CanvasWidth=800;
GDev.Properties.CanvasHeight=600;
GDev.Properties.ClsColor.r=0;
GDev.Properties.ClsColor.g=0;
GDev.Properties.ClsColor.b=0;

// Create the start scene entity
var scene1 = new GDev.ECS.Entity('scene1');
scene1.addComponent(new GDev.ECS.Components.Scene(true));
GDev.composer.addScene(scene1);

// Create an entity
var entity1 = new GDev.ECS.Entity('entity1');
entity1.addComponent(new GDev.ECS.Components.Transform(200,200,0,1,1));
entity1.addComponent(new GDev.ECS.Components.Sprite('media/ship.png',false,true));
entity1.addComponent(new GDev.ECS.Components.MouseListener());
entity1.addComponent(new GDev.ECS.Components.Script(/*
				// The following three functions have to be defined in every script
				// even if they are empty

				onCreate()
				{
					// Here goes code that should be executed
					// at the creation of the entity
					console.log("I have been created");
				},

				onTick()
				{

					// Here goes code that should be executed every game tick

					// To access the entity this script is attached to
					// simply use the keyword "self"
					self.components.transform.x +=1;
					if(self.components.transform.x > GDev.CanvasWidth)
					{
						GDev.composer.removeEntityFromScene(GDev.composer.thisScene, self);
					}
				},
				
				onDelete()
				{
					// Here goes code that should be executed
					// at the deletion of an entity
					this.myFunc(this.myName);
				},
				
				
				// the user can define variables and functions aswell
				// however, these are createt in script context
				// so they have to be reffered with 'this' when used
				
				// A variable
				myName: self.name,
				
				// A Function
				myFunc(val)
				{
					console.log(val);
				}
				
		
*/));

// Create a scene entity
var scene2 = new GDev.ECS.Entity('scene2');
scene2.addComponent(new GDev.ECS.Components.Scene(false));
GDev.composer.addScene(scene2);

// Create an entity
var entity2 = new GDev.ECS.Entity('entity2');
entity2.addComponent(new GDev.ECS.Components.Transform(200,200,0,1,1));
entity2.addComponent(new GDev.ECS.Components.Text('Scene2',false,0,0));
