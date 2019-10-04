# Herosaver

Methodology to Save Configuration and STLs from websites using the THREE.JS framework for academic and educational purposes.

Please **Always** think about the **developers** of such websites and try to **support them whenever possible**, as without them, there would be no such tools.

## Usage
### Browser Console
  1. Go to the intended website
  2. Open the Javascript Console [F12], then click on Console
  3. Paste the following

```
var xhr=new XMLHttpRequest;xhr.open("get","https://raw.githubusercontent.com/lillypath869/Herosaver/master/dist/saver.min.js",true);xhr.onreadystatechange=function(){if(xhr.readyState==4){var script=document.createElement("script");script.type="text/javascript";script.text=xhr.responseText;document.body.appendChild(script)}};xhr.send(null);
```

### ~~Loading via Greecemonkey or other script loader~~
~~This method should automatically load the script on page load. Current it doesn't work if the page is reloaded (Open for suggestions?)~~

1. ~~Install Greasemonkey Browser Addon (or alternative)~~
2. ~~Click the icon and select 'New User Script' from the dropdown menu~~
3. ~~Copy and pase from [Autoloader.js](Autoloader.js), editing the intended website~~
4. ~~Save

## Buttons
* STL - Exports the current model and downloads a STL of it.
* OBJ - Exports the current model and downloads a OBJ of it.
* Subdivision Passes - Number of loop subdivision passes for the model.
* Save - Exports the current model settings in a JSON format.
* Load - Imports a previously exported JSON file with model settings.

## Bugs

Current bugs, open to solutions/suggestions

* ~~Reset Scale Button doesnt work first press, need a second refresh to work.~~
* ~~Autoloader.js doesnt work when page is reloaded, only on first page load.~~
* ~~Some Geometry like facial experessions are not implemented, need to work on the THREE.js section.~~
* Shaders are not included, causing a more _'blocky'_ output, work on the THREE.js section is needed for this.

## Future work

Current things to work on, open to solutions/suggestions

* ~~Rotation is off by 90 degrees, simple fix~~
* ~~The buttons for enlarge and reset scale are a quick and ugly method, needs reworking to not affect the scale in brower if possible, if not, automatically change scale when downloading and resetting scale when downloaded. My lack of THREE.js experience means I am unsure how to do the latter.~~


## Limitations

Currently this is a compiled selection of various bits of code, so the output is not 100% great. If you want higher quality exports, consider purchasing the stl files or help work on the code :)
