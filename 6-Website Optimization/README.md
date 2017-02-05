# Udacity Website Optimization
This project is a part of
[Udacity's Frontend Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).
The target of this project consists of two tasks, the first is to optimize a given website to achieve a target Google PageSpeed score,
and the second is to make the sub-site in ```views``` run at 60fps.

## Getting Started
###### Live version

https://melzareix.github.io/website-optimization/
    
###### Installation
**1.** Clone this repo:
```
git clone https://github.com/melzareix/website-optimization.git
```
**2.** Install nodejs and npm (if not installed)

Refer to here on how to install [Node and npm installation guide](https://docs.npmjs.com/getting-started/installing-node)

**3.** Open the repo folder and install dependencies:
```
    cd website-optimization
    npm install
```

**4.** Run the index file
```
    open index.html
```

## Optimizations made
#### Task 1
- Minified and concatenated `HTML` `CSS` `JS` files.
- Reduced Images sizes.
- Changed the behaviour of `JS` files to use the `async` tag.
- Inlined the `CSS and JS` files to save requests.
- Included media queries in `CSS`.
- Utilized HTML gziping by hosting on `Github pages`
- The usage of `Gulp` build tool to automate the process.

#### Task 2
- Updated `updatePositions` to make use of code reuse, and not
request layout for every element.

```
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var items = document.querySelectorAll('mover');
  var const_theta = document.body.scrollTop / 1250;
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin(const_theta + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

- Wrapped `updatePositions` in requestAnimationFrame when appropriate.
- Replaced all `querySelector, querySelectorAll` calls to either `getElementByID`
or `getElementsByClassName` when appropriate.

- Refactored `changePizzaSizes` to use relative width using
`sizeSwitcher`.

- Changed number of pizzas in `DOMContentLoaded` event to be **30**
instead of 200, which is sufficient to fill the screen.

- Removed width and height changes from `DOMContentLoaded` listener
and used css to avoid unnecessary paints.