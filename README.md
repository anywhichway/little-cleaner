# little-cleaner
A small utility for reducing the chance of XSS and HTML injection

# usage

npm install little-cleaner

see the browser directory for browser files

# API

see the [Medium article](https://medium.com/@anywhichway/a-little-cleaner-preventing-html-javascript-injection-fb10ae748b9e)

# release history (reverse chronological order)

2022-02-15 v1.0.3 Fixed a stack overflow on line 44 when cleaning arrays.

2022-02-06 v1.0.2 Made Function matching more general. Some functions were getting through. Change initial cleaner to respond to window.DOMContentLoaded rather than window.load. 
This sets protection earlier. Eliminate browser directory. Final code preparartion is now left upto the
build pipeline of the package consumer.

2018-01-21 v0.0.4 Enhanced so that "onXXX" attributes can take functions

2018-01-19 v0.0.3 Firefox and Edge compatibility

2018-01-19 v0.0.2 Added automatic full document protection

2018-01-19 v0.0.1 First public release
