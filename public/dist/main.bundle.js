!function(t){function e(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var o={};e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=241)}({241:function(t,e,o){"use strict";var n=o(46),r=(0,n.$$)(".flash-message");r.length>0&&setTimeout(function(){r.forEach(function(t){t.childNodes[0].click()})},3e3)},46:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=document.querySelector.bind(document),r=document.querySelectorAll.bind(document);Node.prototype.on=window.on=function(t,e){this.addEventListener(t,e)},NodeList.prototype.__proto__=Array.prototype,NodeList.prototype.on=NodeList.prototype.addEventListener=function(t,e){this.forEach(function(o){o.on(t,e)})},e.$=n,e.$$=r}});