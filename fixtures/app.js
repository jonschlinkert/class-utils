function App(options) {
  this.options = options || {};
}
App.prototype.set = function(key, value) {
  this[key] = value;
  return this;
};
App.prototype.get = function(key) {
  return this[key];
};
App.prototype.del = function(key) {
  delete this[key];
};
Object.defineProperty(App.prototype, 'count', {
  get: function () {
    return Object.keys(this).length;
  },
  set: function () {
  }
});

module.exports = App;