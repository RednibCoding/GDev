/*
    GDev main file.
    GDev lib is based on the simple game framework "jbb.js".
*/

"use-strict"

let GDev = {
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

GDev.Update = () =>
{
    GDev.Keys.MouseX = MouseX();
    GDev.Keys.MouseY = MouseY();
    GDev.Keys.MouseDown = MouseDown(0);

    GDev.CanvasWidth = GraphicsWidth();
    GDev.CanvasHeight = GraphicsHeight();
};