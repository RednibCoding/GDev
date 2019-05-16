/*
    GDev main file.
    GDev lib is based on the simple game framework "jbb.js".
*/


var GDev = {
    // General settings for GDev
    Properties: {
        AppTitle:"GDevApp",
        CanvasWidth:800,
        CanvasHeight:600,
        ClsColor: {r:0, g:0, b:0},
    },

    Keys: {
        MouseX:0,
        MouseY:0,
        MouseDown:false,
        MouseHit:false,
    },

    // Entity Component System
    ECS: {
        Components: {},
        Systems: {}
    }
};

GDev.Update = function GDevUpdate()
{
    GDev.Keys.MouseX = MouseX();
    GDev.Keys.MouseY = MouseY();
    GDev.Keys.MouseDown = MouseDown(0);
    //GDev.Keys.MouseHit = MouseHit(0); // BOTH doesn't work

    GDev.CanvasWidth = GraphicsWidth();
    GDev.CanvasHeight = GraphicsHeight();
};

GDev.Serialize = function GDevSerialize(composer)
{
    if(typeof composer === 'undefined')
    {
        console.error("Unable to serialize: composer is undefined!")
    }

    var gdevAsString = "";

    gdevAsString += "\n{GDEV_PROPERTY}:AppTitle='"+GDev.Properties.AppTitle+"'";
    gdevAsString += "\n{GDEV_PROPERTY}:CanvasWidth="+GDev.Properties.CanvasWidth;
    gdevAsString += "\n{GDEV_PROPERTY}:CanvasHeight="+GDev.Properties.CanvasHeight;
    gdevAsString += "\n{GDEV_PROPERTY}:ClsColor.r="+GDev.Properties.ClsColor.r;
    gdevAsString += "\n{GDEV_PROPERTY}:ClsColor.g="+GDev.Properties.ClsColor.g;
    gdevAsString += "\n{GDEV_PROPERTY}:ClsColor.b="+GDev.Properties.ClsColor.b;
    
    console.log(gdevAsString);

    composer.serialize();

};