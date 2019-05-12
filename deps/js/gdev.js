

var GDev = {
    Properties: {
        AppTitle:"GDevApp",
        CanvasWidth:800,
        CanvasHeight:600,
        ClsColor: {r:0, g:0, b:0}
    },
    ECS: {
        Components: {},
        Systems: {}
    }
};

/* Entity-Component-System (ECS)

    With ECS, entities are just collections of components; just a collection of data.

    - Entity:       An entity is just an ID
    - Component:    Components are just data.
    - System:       Logic that runs on every entity that has a component of the system.
                    For example, a "Renderer" system would draw all entities
                    that have a "appearance" component.

    Example:
        |         | component-health  | component-position |  component-appearance |
        |---------|-------------------|--------------------|-----------------------|
        |entity1  | 100               | {x: 0, y: 0}       | {color: green}        |
        |entity2  |                   | {x: 0, y: 0}       |                       |
        |entity3  |                   |                    | {color: blue}         |

    
    Usage:
        Create an entity:
            var entity1 = new ECS.Entity();

        Debug an entity:
            entity1.print();

        Create a new component (e.g. Position):
            ECS.Components.Position = function ComponentPosition(x, y)
            {
                x = x || 0;
                y = y || 0;
                this.x = x;
                this.y = y;
                return this;
            };
            // Each component needs a unique name!
            ECS.Components.Position.prototype.name = 'position';

        Add a component 'Position' to an entity:
            entity1.addComponent( new ECS.Components.Position(10, 10) );

        Change a variable of a component (e.g. 'x' of position component)
            entity1.components.position.x = 20;

*/

// ##################################################################
// Entity
// ##################################################################

GDev.ECS.Entity = function Entity()
{
    // Check if the static id has been initialized
    if (typeof Entity.prototype._id == 'undefined'){Entity.prototype._id = 0;}
    Entity.prototype._id++;

    // Static counter to keep track of entity count
    if (typeof GDev.ECS.Entity.prototype._count == 'undefined'){GDev.ECS.Entity.prototype._count = 0;}
    GDev.ECS.Entity.prototype._count++;

    this.type = "entity"; // Just that log output looks nicer
    this.id = Entity.prototype._id;

    // The component data will live in this object
    this.components = {};

    return this;
};

GDev.ECS.Entity.prototype.addComponent = function addComponent(component)
{
    // Add component data to the entity
    // NOTE: The component must have a name property
    // which is a prototype of a component function
    this.components[component.name] = component;
};

GDev.ECS.Entity.prototype.removeComponent = function removeComponent(component)
{
    // Remove component data by removing the reference to it.
    // Allows either a component function or a string of a component name to be
    // passed in
    var name = componentName; // assume a string was passed in

    if(typeof componentName === 'function')
    {
        // get the name from the prototype of the passed component function
        name = componentName.prototype.name;
    }

    // Remove component data by removing the reference to it
    delete this.comonent[name];

    return this;
};

GDev.ECS.Entity.prototype.log = function log()
{
    // Print / log information about the entity
    console.log(JSON.stringify(this, null, 4));
};



// ##################################################################
// Component
//  To create components, just add them here.
//  Some examples are already given below.
// ##################################################################

// Position component
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
GDev.ECS.Components.Health = function ComponentHealth(value)
{
    value = value || 0;
    this.value = value;
    return this;
};
GDev.ECS.Components.Health.prototype.name = 'health';

// Text component
GDev.ECS.Components.Text = function ComponentText(value)
{
    value = value || "";
    this.value = value;
    // Determines if a text is hidden or not
    this.isHidden = false;
    return this;
};
GDev.ECS.Components.Text.prototype.name = 'text';

// Sprite component
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
GDev.ECS.Components.Script = function ComponentScript(code)
{
    code = code || "";
    this.code = code;
    return this;
};
GDev.ECS.Components.Script.prototype.name = 'script';



// ##################################################################
// Systems
//  To create systems, just add them here.
//  Some examples are already given below.
// ##################################################################

// LoadSprite
GDev.ECS.Systems.LoadSprite = function SystemLoadSprite(entities)
{
    // Takes an array of entities
    // and loads their sprite image into memory
    // (Optimization: only pass entities with ComponentSprite attached)

    var thisEntity

    for(var id in entities)
    {
        thisEntity = entities[id];

        if(thisEntity.components.sprite)
        {
            var path = thisEntity.components.sprite._imagePath;
            if(path == "")
            {
                console.error("ECS.Systems.LoadSprite: 'imagePath' may not be empty! Entity id: "+thisEntity.id);
            }
            else
            {
                var isMidHandle = thisEntity.components.sprite.isMidHandle;
                thisEntity.components.sprite.image = LoadImage(path);
                if(typeof thisEntity.components.sprite.image == 'undefined')
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
}

// Render
GDev.ECS.Systems.Render = function SystemRender(entities)
{
    // Takes an array of entities
    // and draws them onto the screen
    // NOTE: Sprites must be loaded before, via GDev.ECS.Systems.LoadSprite
    // (Optimization: only pass entities with ComponentSprite/ComponentText and ComponentPosition attached)

    // Required components:
    //  - ComponentPosition
    //  - ComponentSprite

    var thisEntity

    for(var id in entities)
    {
        thisEntity = entities[id];

        // Render the sprite image
        if(thisEntity.components.sprite && thisEntity.components.position)
        {
            // when it is not flagged hidden
            if(!thisEntity.components.sprite.isHidden)
            {
                var image = thisEntity.components.sprite.image;
                var x = thisEntity.components.position.x;
                var y = thisEntity.components.position.y;
                var scaleX = thisEntity.components.sprite.scaleX;
                var scaleY = thisEntity.components.sprite.scaleY;
                var rotation = thisEntity.components.sprite.rotation;

                RotateImage(image, rotation);
                ScaleImage(image, scaleX, scaleY);
                DrawImage(image, x, y);
            }
        }
        // If this entity only has text and no sprite then render just the text
        else if(thisEntity.components.text && thisEntity.components.position)
        {
            // when it is not flagged hidden
            if(!thisEntity.components.text.isHidden)
            {
                var x = thisEntity.components.position.x;
                var y = thisEntity.components.position.y;
                var text = thisEntity.components.text.value;
                DrawText(text, x, y);
            }
        }
    }
}





// ######################################################

var entities = {};

var entity1 = new GDev.ECS.Entity();
entity1.addComponent(new GDev.ECS.Components.Position(200,200));
entity1.addComponent(new GDev.ECS.Components.Health(20));
entity1.addComponent(new GDev.ECS.Components.Sprite("media/ship.png"));
entity1.log();

entities[entity1.id] = entity1;


Graphics(GDev.Properties.CanvasWidth, GDev.Properties.CanvasHeight, GDev.Properties.AppTitle);
ClsColor(GDev.Properties.ClsColor.r, GDev.Properties.ClsColor.g, GDev.Properties.ClsColor.b);
TFormFilter(false);


GDev.ECS.Systems.LoadSprite(entities);



// Main function with AppTitle as function name 
window[GDev.Properties.AppTitle] = function()
{
    Cls();

    GDev.ECS.Systems.Render(entities);
}

// var entity2 = new ECS.Entity();
// var entity3 = new ECS.Entity();

/*
Execute Javascript stored in a string:

    var jsCode = "alert('Hello World'); var x = 100";
    var script=new Function (jsCode);
    return(script());

*/