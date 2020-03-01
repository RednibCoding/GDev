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
    },

    systemTickFunctions: [],

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

GDev.registerTickFunction = function(tickFunction)
{
    if(typeof tickFunction === "function")
    {
        this.systemTickFunctions.push(tickFunction);
    }
    else
    {
        console.log("Unable to register System-Tick-Function!")
    }
}

GDev.Update = () =>
{
    GDev.Keys.MouseX = MouseX();
    GDev.Keys.MouseY = MouseY();
    GDev.Keys.MouseDown = MouseDown(0);

    GDev.CanvasWidth = GraphicsWidth();
    GDev.CanvasHeight = GraphicsHeight();
};