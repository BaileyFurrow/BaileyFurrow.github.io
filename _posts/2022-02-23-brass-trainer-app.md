---
layout: post
title: "Brass Fingering Trainer App Journal"
---

The first parts of this post will be written in the third person, as I did not
narratively document or journal for this project until part-way through
completion. A clear notice will be left for going to present tense.

# Idea

I first got the idea for this app from my experience as a long-term substitute
for middle school band classes for three months in 2021. To better engrain the
fingerings for the brass musicians (especially the ones starting off), I
assigned them tasks to complete in a fingering trainer app. I was not a fan of
this app: there were little to no options for exercise customization, not
very intuitive, and had outdated design. This gave me the idea to create this
app for learning brass fingerings.

# Planning

After getting this idea, I began to plan for the project. This involved
looking at a few different areas.

## Instrument Support

I first had to figure out what instruments should be supported. This is when I
decided that this would be an app for learning **brass fingerings**, which
includes trumpet, horn, trombone, baritone/euphonium, and tuba. In the far
future, I would like to add support for woodwind instruments as well, but this
will be done after a full version of the app is released.

## Platform

*The web app platform makes the most sense out of all options.* This would
simplify many parts of the app that I would like to implement. Additionally,
it would provide the best access to people wishing to use the app.

## Framework

After deciding the web platform, I needed to decide on the framework in which
to develop on. Initially, I decided on vanilla JavaScript, but later decided to
use React. It allows me to associate functions that draw the required graphics
with the appropriate component.

# Development

This is done in hindsight, so the first few parts are brief and less specific.
First, I created basic graphics for the fingerings in hard-coded SVG: three
circles that can be selected (with an optional fourth ellipse for horn). 
Next, the fingerings became stored as a 4-bit binary number that could be
compared to a list of other binary numbers representing other fingerings. Then,
a system was implemented to check for (and show) correct fingerings.

This was when I decided to switch to React from traditional JavaScript.
Converting the project over to React took a little time, but was eventually
achieved so the project could continue. After that, I created a very small staff
drawing library to create the visual prompts for the user, then I implemented
the library in my project.

At this point, my project was *mostly* functional, just needing design to finish
up. One more functionality needed to be added before design: trombone support.
This was easier said than done, as trombone "fingerings" are displayed
differently compared to all other brass instruments. While the rest use actual
fingerings, trombone uses slide positions, which means the use of different
graphics, different storage, and different comparison methods.

## A Slightly Sliding Issue

Here is when the narrative enters the present tense, as I am now writing and
updating the post as I complete the project.

I need to add trombone support to make this a fully functional brass
"fingerings" app. There are a couple of methods I could use to integrate this
into the app: static and interactive.

### Static Trombone Slides

The way this would work is simple: I could either use the same circles from the
other instruments and add numbers to the center of each circle to label
different slide positions or I could model out a trombone in SVG and label
the slide positions on there. The main concern with either of these methods is
clarity; users may learn to compare the notes and slide position numbers, but
there would not be a clear visual for the user to **see** the slide position.

### Interactive Trombone Slides

This method involves drawing out the entire trombone in two pieces: one for the
main body, and the other for the slide. The user could then either drag the
slide to the correct position or use markers under the slides to set the slide
at the correct position. This would be prefered from a functionality and user
interface perspective, but it would asthetically go against the design of the
rest of the app. All other instruments would use basic circles for the
fingerings while the trombone would have its instrument drawn out.

### Decision and Implementation