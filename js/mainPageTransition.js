'use strict';
import {
  mainAnimateDown
} from "./mainAnimationDown.js";
const main = document.getElementById('main');
let IsIntersecting;
// set top section class
main.children[0].classList.add('top-section');
// set event listeners
window.addEventListener('keydown', handleKeyPressAnimation);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchMove, false);

function handleKeyPressAnimation(e) {
  console.log(11);
  if (e.code === 'ArrowDown') {
    console.log('down');
  } else if (e.code === 'ArrowUp') {
    console.log('up');
  }
}
// ==============================================================
let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.changedTouches[0].clientY;
}
let animationObserver
let animationObserverBottom

function handleTouchMove(evt) {
  let yUp = evt.changedTouches[0].clientY;
  if (yDown > yUp) {
    const onEntry = (entry, observe) => {
      if (entry[0].isIntersecting) {
        // if () {  проверка
        animateUp()
        // }
        observe.disconnect(animationObserver);
      }
    }
    animationObserver = new IntersectionObserver(onEntry, {});
    const currentTopBlock = document.querySelector('.top-section .bottom-block');
    if (currentTopBlock) {
      animationObserver.observe(currentTopBlock);
    }
  } else {
    const onEntry2 = (entry, observe) => {
      if (entry[0].isIntersecting) {
        // if () { проверка
        animateDown()
        // }
      }
    }
    animationObserverBottom = new IntersectionObserver(onEntry2, {});
    const currentBottomBlock = document.querySelector('.top-section .top-block');
    if (currentBottomBlock) {
      animationObserverBottom.observe(currentBottomBlock);
    }
  }
}
// ==============================================================
function isIntersecting({
  scrollEvent,
  elementClass
}) {
  const onEntry = (entry) => {
    if (entry[0].isIntersecting) {
      IsIntersecting = true;
      animation(scrollEvent, IsIntersecting)
    }
  }
  const animationObserver = new IntersectionObserver(onEntry, {});
  const observerEl = document.querySelector(elementClass);
  if (observerEl) {
    animationObserver.observe(observerEl);
  }
}
// ==============================================================
function animation(e, IsIntersecting) {
  console.log('e:', e.direction);
  if (e.direction === 'up' && IsIntersecting) { //проверка
    console.log('up');
  } else if (e.direction === 'down' && IsIntersecting) { //проверка
    mainAnimateDown()
  }
}
const indicatorUp = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    if (e.direction === 'up') {
      isIntersecting({
        scrollEvent: e,
        elementClass: '.top-section .top'
      })
    }
  }
});
indicatorUp.getOption('preventMouse');
// ==============================================================
const indicatorDown = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    if (e.direction === 'down') {
      isIntersecting({
        scrollEvent: e,
        elementClass: '.top-section .bottom'
      })
    }
  }
});
indicatorDown.getOption('preventMouse');
// ==============================================================
// const indicatorDown = new WheelIndicator({
//   elem: document.body,
//   callback: function (e) {
//     if (e.direction === 'down') {
//       isIntersecting({
//         scrollEvent: e,
//         elementClass: '.top-section .bottom'
//       })
//     }
//   }
// });
// indicatorDown.getOption('preventMouse');