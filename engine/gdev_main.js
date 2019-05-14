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
}