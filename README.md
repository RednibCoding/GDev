# GDev

## What is GDev?
GDev is an easy to use, component based game engine based on the simple yet powerfull Javascript game framework [jBB](https://github.com/Farbfinsternis/jBB).
GDev comes bundled with GDev-Edit - an editor allowing you to quickly set up your scenes and objects. With the build-in code-editor, you can create scripts in a Javascript/JSON-like syntax and attach them to scenes and objects.

<p align="center"> 
<img src="doc/gdev_edit.png" width="80%">
</p>

## GDev consists of three sub projects:
- GDev-Engine (in a usable state, yet incomplete)
- GDev-Edit the editor (not usable yet)
- The Transpiler (working)


## The toolchain

<p align="center"> 
<img src="doc/toolchain.png" width="50%">
</p>

- In the editor you can set up scenes and add entites.
- In the code editor you can write scripts for your scenes and entites in a json/javascript syntax

A script file could look like as follows:

<p align="center"> 
<img src="doc/sampleScript.png" width="80%">
</p>

## The Transpiler

The transpiler takes a gdp-file (GDev-Edit project file) as input and transpiles it into a game.js, ready to be included into an html file.

The gdp-file can look something like this:

<p align="center"> 
<img src="doc/gdp_file.png" width="80%">
</p>


and the transpiler creates a game file out of it:

<p align="center"> 
<img src="doc/gamejs_file.png" width="80%">
</p>
