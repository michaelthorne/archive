/*
 * Avoiding the FOUC v3.0
 * http://paulirish.com/2009/avoiding-the-fouc-v3/
 */

document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');