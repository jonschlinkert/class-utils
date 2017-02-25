var cu = require('./');

// function App() {}
// Object.defineProperty(App.prototype, 'count', {
//   get: function () {
//     return Object.keys(this).length;
//   }
// });
// console.log(cu.getDescriptor(App.prototype, 'count'));

function defineProp (obj, name, fn) {
  Object.defineProperty(obj, name, {
    enumerable: true,
    configurable: true,
    get: function () {
      return fn();
    }
  });
}

function fn() {
  console.log('hey!');
  return function (msg) {
    return 'foo ' + msg;
  };
}

var one = {
  bar: function (msg) {
    return 'bar ' + msg;
  }
};
var two = {};
defineProp(one, 'foo', fn);

cu.copyDescriptor(two, one, 'foo');
cu.copyDescriptor(two, one, 'bar');

console.log(two.foo('a'))
console.log(two.bar('b'))
