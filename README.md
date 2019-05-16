# GDev
GDev is an easy to use, component based game editor based on the simple yet powerfull Javascript game framework [jBB](https://github.com/Farbfinsternis/jBB
).


<p align="center"> 
<img src="doc/editor.png" width="80%">
</p>

## GDev consists of three sub projects:
- The GDev Engine (in a usable state, yet incomplete)
- The Editor (not usable yet)
- The Transpiler (is working)


## The toolchain

<p align="center"> 
<img src="doc/toolchain.png" width="50%">
</p>

- In the editor you can set up scenes and add entites.
- In the code editor you write scripts for your scenes and entites in json/javascript syntax

A script file could look like follows:

<p align="center"> 
<img src="doc/sampleScript.png" width="80%">
</p>

## The Transpiler

The transpiler takes a gdev-project-/gdev-definition- file as input and transpiles it into a game.js, ready to be included into an html file.

The  gdev-project-/gdev-definition- file can look something like this:

<p align="center"> 
<img src="doc/gdp_file.png" width="80%">
</p>


and the transpiler creates a game file out of it:

<p align="center"> 
<img src="doc/gamejs_file.png" width="80%">
</p>
