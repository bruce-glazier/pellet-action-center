## About

I developed this software specifically for the "Master Forge 2500-sq ft Pellet Stove with 140-lb Hopper" from Lowes. This stove has an issue where it will randomly shut off with the message "Goodbye" on the display and never turn back on without someone pressing the power button. This is a huge problem if you depend on this stove as your primary heating source.

## What this does?

There is another project that is required to run this solution which I am calling the communication bridge to the stove: https://www.github.com/bruce-glazier/pellet-comm-bridge

This project can be thought of as the action center where decisions about how to interact with the stove can be made. 

After much fine tuning I've settled on a very simple rule that I find to be very effective:

**If the temperature sensor on the stove reads that the ambient air is 3 degrees below the temperature set on the stove AND the stove is currently OFF, send the ON signal to the stove.**

This can be adjusted by modifying the temperatureThreshold variable in the script.

## Setup

1. Install Node.js (Last tested on v22)
1. Run `npm install` in this directory
1. Run `npm run stove` to start the script

You will receive a Temp/Power reading every 1 minute in the console output OR you may see unable to connect if the communication bridge isn't running. 

Make sure to set the PC running this script to never go to sleep.



