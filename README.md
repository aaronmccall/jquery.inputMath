jQuery Input Math Plugin
========================

Use Case:
---------

You need to allow users to perform basic calculations in your forms, but you don't want to incorporate a GUI calculator in a modal or some other "heavy" solution. 

This plugin allows you to apply a blur (default behavior) handler that will perform simple (addition, subtraction, multiplication, and division) arithmetic if the initial character is an equal sign (=).

Usage:
------
**HTML**

&lt;input id="math_input" type="text" size="20" /&gt;

**JS**
Add a script tag with src set to the path to jquery.inputMath.js.
Add '$('#math_input').inputMath();' at the bottom of your jQuery $(document).ready handler
$(function(){
  ...
  $('#math_input').inputMath();
})
