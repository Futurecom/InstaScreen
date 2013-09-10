Futurecom InstaScreen
=====================

Displays an Instagram feed for a specific user.	
We built it as a fullscreen web app for a vertical mounted tv screen. It is kind of responsive (landscape/portrait), but still depends on a certain aspect ratio (16/9 or 16/10).

Have fun
 
Demo
---------------------

[![Build Status](https://travis-ci.org/Futurecom/InstaScreen.png?branch=travis)](https://travis-ci.org/Futurecom/InstaScreen)

* Live Demo: [http://futurecom.github.io/InstaScreen/](http://futurecom.github.io/InstaScreen/)

Usage
---------------------

### config.js ###

All the important variables are stored in the Config.js file.

### data.json ###

API calls are stored in the data.json file.

#### Geo Fence Filters ####
Filters out images that are outside of the targeted area.
TL: Top Left Coordinate in Lat/Lon
BR: Top Left Coordinate in Lat/Lon

[] = no filter

#### JSON Example ####

```JSON
{
    [{
        "apiCall": "/tags/catsofinstagram/media/recent",
        "maxTagNumber": 20,
        "filterTags": ["kitten", "cute"],
        "blacklistTags": ["dog","dogs"],
        "geoFenceFilters": [{
			"TL": {
				"latitude": 48.500000,
				"longitude": 5.00000
			},
			"BR": {
				"latitude": 45.000000,
				"longitude": 12.00000
			}
		}]
    }]
}
```

### LESS ###

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

License
---------------------

Copyright (c) 2013 Futurecom interactive

Licensed under the [AGPL license](https://github.com/Futurecom/InstaScreen/blob/master/agpl.txt).
