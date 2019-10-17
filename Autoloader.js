// ==UserScript==
// @name            Herosaver Autoloader
// @author          TeaWithLucas
// @namespace       https://github.com/TeaWithLucas/Herosaver/
// @description     Autoloader for the Herosaver Script
// @version	        1
// @include         *example.com/*
// @installURL      https://raw.githubusercontent.com/TeaWithLucas/Herosaver/master/Autoloader.js
// @downloadURL     https://raw.githubusercontent.com/TeaWithLucas/Herosaver/master/Autoloader.js
// @updateURL       https://raw.githubusercontent.com/TeaWithLucas/Herosaver/master/Autoloader.js
// @run-at          document-end
// ==/UserScript==
 
/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
 
//object constructor
function runinsert(){

  // run the Herosaver Script
  var xhr=new XMLHttpRequest;xhr.open("get","https://raw.githubusercontent.com/TeaWithLucas/Herosaver/master/dist/saver.min.js",true);xhr.onreadystatechange=function(){if(xhr.readyState==4){var script=document.createElement("script");script.type="text/javascript";script.text=xhr.responseText;document.body.appendChild(script)}};xhr.send(null);

};

//instantiate and run 
runinsert();
