# HW08

### Neon Mondrian:

Defined a function to determine whether two colors are similar by checking if difference between values for all 3 channels are below a threshold. This threshold is determined by a html slider element dynamically.

Code replaces all colors, including B&W. For one of the colors, I'm using modulus and division to draw a striped pattern.

And for another color, the replacement color is selected via a html color picker element.

### Sound Visualization:

I chose the song "Catch It" from a database of free songs online. It's upbeat, medium paced and matched the feeling I wanted to invoke with my visualization.

Inspired by the grooves on old records, I wanted to use polar coordinates to create a drawing that spiraled out from the center of the canvas, but also looked like a random walk through the canvas.

I split the array returned by ```getPeaks()``` into 2, so different parts of the song contributed to the *radius* and *angle* coordinates of the drawing.

In the end I added some sliders to control some scaling factors that could be used to adjust the drawing and how much space it takes on the screen.
