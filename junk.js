({

// the following three functions have to be defined in every script
// even if they are empty
onCreate()
{
    this.myFunc(this.test + this.x);
},
,
onRender()
{
},

onDelete()
{
},

// the user can define variables and functions aswell
// however, these are createt in script context
// so they have to be reffered with 'this' when used

test: 'Value of x is: ',

// To access the entity this script is attached to
// simply use the keyword "self"
x: self.components.scene.entities[2].components.position.x,

myFunc(val)
{
    console.log(val);
},

})















})