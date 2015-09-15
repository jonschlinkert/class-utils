var cu = require('./');

function App() {}
Object.defineProperty(App.prototype, 'count', {
  get: function () {
    return Object.keys(this).length;
  }
});
console.log(cu.getDescriptor(App.prototype, 'count'));
