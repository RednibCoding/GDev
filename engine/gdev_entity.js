/* Entity-Component-System (ECS)

    With ECS, entities are just collections of components; just a collection of data.

    - Entity:       An entity is just an ID
    - Component:    Components are just data.
    - System:       Logic that runs on every entity that has a component of the system.

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
            entity1.log();

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
//  An entity can be everything in the game:
//      - background of a scene
//      - the player
//      - an enemy
//      - a pickup
//      - a bullet
//      - ...
// ##################################################################

"use-strict"

// ----------------------------------------------------------------------------
GDev.ECS.Entity = function(name)
{
    // Check if the static id has been initialized
    if (typeof GDev.ECS.Entity.prototype._id == "undefined"){GDev.ECS.Entity.prototype._id = 0;}
    GDev.ECS.Entity.prototype._id++;

    // Static counter to keep track of entity count
    if (typeof GDev.ECS.Entity.prototype._count == "undefined"){GDev.ECS.Entity.prototype._count = 0;}
    GDev.ECS.Entity.prototype._count++;

    this.type = "entity";
    if(typeof name === "undefined")
    {
        console.error("Name of entity can not be 'undefined'!");
        return null;
    }
    this.name = name; // Must be unique
    this.id = GDev.ECS.Entity.prototype._id;

    // Component data will be stored here
    this.components = {};

    return this;
};

// ----------------------------------------------------------------------------
GDev.ECS.Entity.prototype.addComponent = function(component)
{
    // Add component data to the entity
    // NOTE: The component must have a name property
    // which is a prototype of a component function
    this.components[component.name] = component;
};

// ----------------------------------------------------------------------------
GDev.ECS.Entity.prototype.removeComponent = function(componentName)
{
    // Remove component data by removing the reference to it.
    // Allows either a component function or a string of a component name to be
    // passed in
    var name = componentName; // assume a string was passed in

    if(typeof componentName === "function")
    {
        // get the name from the prototype of the passed component function
        name = componentName.prototype.name;
    }

    // Remove component data by removing the reference to it
    delete this.components[name];
};

// ----------------------------------------------------------------------------
GDev.ECS.Entity.prototype.dump = function()
{
    // dump information about the entity
    console.log(JSON.stringify(this, null, 4));
};