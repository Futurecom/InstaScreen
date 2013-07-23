Futurecom InstaScreen
===========

Displays an Instagram feed for a specific user.	
We built it as a fullscreen web app for a vertical mounted tv screen. It is kind of responsive (landscape/portrait), but still depends on a certain aspect ratio (16/9 or 16/10).

Have fun

### License ###

<a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">InstaScreen</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/deed.en_US">Creative Commons Attribution-NonCommercial 3.0 Unported License</a>.
### Demo ###

[![Build Status](https://travis-ci.org/Futurecom/InstaScreen.png?branch=travis)](https://travis-ci.org/Futurecom/InstaScreen)

* Live Demo: [http://futurecom.github.io/InstaScreen/](http://futurecom.github.io/InstaScreen/)

### Usage ###

##### Config.js #####

All the important variables are stored in the Config.js file.

##### LESS #####

To compile LESS into CSS you need to install the Less Compiler.  
Download here: http://lesscss.org/

Install LESS
```shell
$ npm install -g less
```

Compile LESS to CSS
```shell
$ lessc -x main.less main.css
```
