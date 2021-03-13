'use strict';
import {
  throttle
} from "./throttle.js";
window.addEventListener('resize', throttle(onResize, 150))
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function onResize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}