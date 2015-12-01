'use strict';
require('mocha');
require('should');
var assert = require('assert');
var App = require('./fixtures/app');
var cu = require('./');

assert.hasAll = function(a, b) {
  assert(cu.hasAll(a, b));
};
assert.contains = function(a, b) {
  assert(cu.has(a, b));
};


describe('noop', function() {
  it('should return undefined:', function() {
    assert(typeof cu.noop({}) === 'undefined');
    assert(typeof cu.noop('foo') === 'undefined');
  });
});

describe('isObject', function() {
  it('should be true if the value is an object:', function() {
    assert(cu.isObject({}));
  });
  it('should be true if the value is a function:', function() {
    assert(cu.isObject(function() {}));
  });
  it('should be false if the value is an object:', function() {
    assert(!cu.isObject('foo'));
  });
});

describe('identity', function() {
  it('should return the given value:', function() {
    assert.deepEqual(cu.identity({}), {});
    assert.deepEqual(cu.identity('foo'), 'foo');
    assert.deepEqual(cu.identity(['foo']), ['foo']);
    assert.deepEqual(cu.identity([]), []);
  });
});

describe('hasAll', function() {
  describe('object', function() {
    it('should be true if an object has all given value:', function() {
      assert(cu.hasAll({
        a: 'b',
        b: 'c',
        c: 'd'
      }, 'c'));
      assert(cu.hasAll({
        a: 'b',
        b: 'c',
        c: 'd'
      }, ['c', 'b']));
      assert(cu.hasAll({
        a: 'b',
        b: 'c',
        c: 'd'
      }, ['a', 'b', 'c']));
    });

    it('should be false if an object does not have all given value:', function() {
      assert(!cu.hasAll({
        a: 'b',
        b: 'c',
        c: 'd'
      }, 'd'));
      assert(!cu.hasAll({
        a: 'b',
        b: 'c',
        c: 'd'
      }, ['c', 'b', 'z']));
    });
  });

  describe('arrays', function() {
    it('should be true if an array has all given value:', function() {
      assert(cu.hasAll(['a', 'b', 'c'], 'c'));
      assert(cu.hasAll(['a', 'b', 'c'], ['c', 'b']));
      assert(cu.hasAll(['a', 'b', 'c'], ['a', 'b', 'c']));
    });

    it('should be false if an array does not have all given value:', function() {
      assert(!cu.hasAll(['a', 'b', 'c'], 'd'));
      assert(!cu.hasAll(['a', 'b', 'c'], ['c', 'b', 'z']));
    });
  });
});

describe('has', function() {
  describe('objects', function() {
    it('should return true if an array has the given value:', function() {
      assert(cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, 'c'));
      assert(cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, 'b'));
    });
    it('should return false if an array does not have the given value:', function() {
      assert(!cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, 'd'));
      assert(!cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, 'e'));
    });
    it('should return true if an array has any given values:', function() {
      assert(cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, ['c', 'z']));
      assert(cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, ['a', 'z']));
    });
    it('should return false if an array does not have any given values:', function() {
      assert(!cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, ['x', 'z']));
      assert(!cu.has({
        a: 'b',
        b: 'c',
        c: 'd'
      }, ['y', 'z']));
    });
  });

  describe('arrays', function() {
    it('should return true if an array has the given value:', function() {
      assert(cu.has(['a', 'b', 'c'], 'c'));
      assert(cu.has(['a', 'b', 'c'], 'b'));
    });
    it('should return false if an array does not have the given value:', function() {
      assert(!cu.has(['a', 'b', 'c'], 'd'));
      assert(!cu.has(['a', 'b', 'c'], 'e'));
    });
    it('should return true if an array has any given values:', function() {
      assert(cu.has(['a', 'b', 'c'], ['c', 'z']));
      assert(cu.has(['a', 'b', 'c'], ['a', 'z']));
    });
    it('should return false if an array does not have any given values:', function() {
      assert(!cu.has(['a', 'b', 'c'], ['x', 'z']));
      assert(!cu.has(['a', 'b', 'c'], ['y', 'z']));
    });
  });

  it('should throw an error when the value is not an array or object:', function() {
    (function() {
      cu.has('foo');
    }).should.throw('expected an array or object.');
  });
});

describe('hasConstructor', function() {
  it('should return true if a value is an object and has a constructor:', function() {
    assert(cu.hasConstructor({
      a: 'b',
      b: 'c',
      c: 'd'
    }));
    assert(cu.hasConstructor(function() {}));
    assert(cu.hasConstructor(App));
    assert(cu.hasConstructor(new App()));
    assert(cu.hasConstructor(Object.create(new App())));
  });

  it('should return false if a value is not object:', function() {
    assert(!cu.hasConstructor('foo'));
    assert(!cu.hasConstructor(5));
  });

  it('should return false if an object does not have a constructor:', function() {
    assert(!cu.hasConstructor(Object.create(null)));
    assert(!cu.hasConstructor(null));
  });
});

describe('nativeKeys', function() {
  it('should get the native keys of an object:', function() {
    assert.hasAll(cu.nativeKeys({
      a: 'b',
      b: 'c',
      c: 'd'
    }), ['a', 'b', 'c']);
    assert.hasAll(cu.nativeKeys(function() {}), ['length', 'name', 'prototype']);
    assert.hasAll(cu.nativeKeys(App), ['length', 'name', 'prototype']);
    assert.hasAll(cu.nativeKeys(App.prototype), ['constructor', 'set', 'get', 'del']);
    assert.hasAll(cu.nativeKeys(App.constructor), ['length', 'name', 'caller']);
    assert.hasAll(cu.nativeKeys(App.prototype.constructor), ['length', 'caller']);
    assert.hasAll(cu.nativeKeys(new App()), ['options']);
    assert.hasAll(cu.nativeKeys(Object.create(new App())), []);
  });

  it('should return empty array if a value does not have native keys:', function() {
    assert.deepEqual(cu.nativeKeys(Object.create(null)), []);
    assert.deepEqual(cu.nativeKeys(null), []);
  });
});

describe('getDescriptor', function() {
  it('should get the native keys of an object:', function() {
    assert.contains(cu.getDescriptor(App.prototype, 'count'), ['get',
      'set'
    ]);
    assert(typeof cu.getDescriptor(App.prototype, 'foo') ===
      'undefined');
  });

  it('should throw an error when key is not a string:', function() {
    (function() {
      cu.getDescriptor({}, {}, null);
    }).should.throw('expected key to be a string.');
  });

  it('should throw an error when receiver is not an object:', function() {
    (function() {
      cu.getDescriptor('foo');
    }).should.throw('expected an object.');
  });
});

describe('copyDescriptor', function() {
  it('should copy a descriptor from the provider to receiver:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.copyDescriptor(obj, proto, 'count');
    assert.contains(cu.getDescriptor(obj, 'count'), ['get', 'set']);
  });

  it('should do nothing when the descriptor does not exist:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.copyDescriptor(obj, proto, 'foo');
    assert.deepEqual(obj, {});
  });

  it('should throw an error when name is not a string:', function() {
    (function() {
      cu.copyDescriptor({}, {}, null);
    }).should.throw('expected name to be a string.');
  });

  it('should throw an error when receiver is not an object:', function() {
    (function() {
      cu.copyDescriptor('foo');
    }).should.throw('expected receiving object to be an object.');
  });

  it('should throw an error when provider is not an object:', function() {
    (function() {
      cu.copyDescriptor({}, 'foo');
    }).should.throw('expected providing object to be an object.');
  });
});

describe('copy', function() {
  it('should copy descriptors from the provider to receiver:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.copy(obj, proto);
    assert.contains(cu.getDescriptor(obj, 'count'), ['get', 'set']);
  });

  it('should copy properties from the provider to receiver:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.copy(obj, proto);
    obj.set('a', 'b');
    assert(obj.a === 'b');
    assert.contains(obj, ['get', 'set']);
  });

  it('should do nothing when the property does not exist:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.copy(obj, proto, 'foo');
    assert.deepEqual(obj, {});
  });

  it('should throw an error when receiver is not an object:', function() {
    (function() {
      cu.copy('foo');
    }).should.throw('expected receiving object to be an object.');
  });

  it('should throw an error when provider is not an object:', function() {
    (function() {
      cu.copy({}, 'foo');
    }).should.throw('expected providing object to be an object.');
  });
});

describe('inherit', function() {
  it('should inherit descriptors from provider:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.inherit(obj, proto);
    assert.contains(cu.getDescriptor(obj, 'count'), ['get', 'set']);
  });

  it('should inherit properties from provider:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.inherit(obj, proto);
    obj.set('a', 'b');
    assert(obj.a === 'b');
    assert.contains(obj, ['get', 'set', 'del']);
  });

  it('should do nothing when the property does not exist:', function() {
    var proto = App.prototype;
    var obj = {};
    cu.inherit(obj, proto, 'foo');
    assert.deepEqual(obj, {});
  });

  it('should throw an error when receiver is not an object:', function() {
    (function() {
      cu.inherit('foo');
    }).should.throw('expected receiving object to be an object.');
  });

  it('should throw an error when provider is not an object:', function() {
    (function() {
      cu.inherit({}, 'foo');
    }).should.throw('expected providing object to be an object.');
  });
});

describe('extend', function() {
  var Parent;
  var Ctor;
  var proto;

  beforeEach(function() {
    Parent = function() {}
    Parent.foo = 'bar';
    Parent.prototype.a = function() {};
    Parent.prototype.b = function() {};
    Parent.prototype.c = function() {};
    Object.defineProperty(Parent.prototype, 'count', {
      get: function() {
        return Object.keys(this).length;
      },
      set: function() {}
    });
    Ctor = function() {
      Parent.call(this);
    };
    proto = App.prototype;
  });

  it('should add static methods to Ctor:', function() {
    var extend = cu.extend(Parent);
    extend(Ctor);
    assert(typeof Ctor.extend === 'function');
    assert(Ctor.foo === 'bar');
  });

  it('should add prototype methods to Ctor:', function() {
    var extend = cu.extend(Parent);
    extend(Ctor);
    assert(typeof Ctor.prototype.a === 'function');
    assert(typeof Ctor.prototype.b === 'function');
    assert(typeof Ctor.prototype.c === 'function');
  });

  it('should add descriptors to Ctor:', function() {
    var extend = cu.extend(Parent);
    extend(Ctor);
  });

  it('should copy prototype properties to Ctor:', function() {
    var extend = cu.extend(Parent);
    extend(Ctor, App.prototype);
    assert(typeof Ctor.prototype.get === 'function');
    assert(typeof Ctor.prototype.set === 'function');
    assert(typeof Ctor.prototype.del === 'function');
  });

  it('should add a mixin method to the prototype of Ctor using `extend` function:', function() {
    var extend = cu.extend(Parent, function(Child) {
      Child.prototype.mixin = function(key, val) {
        Child.prototype[key] = val;
      };
    });
    extend(Ctor, App.prototype);
    assert(typeof Ctor.prototype.mixin === 'function');
    assert(typeof Ctor.prototype.get === 'function');
    assert(typeof Ctor.prototype.set === 'function');
    assert(typeof Ctor.prototype.del === 'function');
  });

  it('should mixin methods to the Ctor.prototype using `extend` function:', function() {
    var extend = cu.extend(Parent, function(Child) {
      Child.prototype.mixin = function(key, val) {
        Child.prototype[key] = val;
      };
    });
    extend(Ctor, App.prototype);
    var app = new Ctor();
    app.mixin('foo', function() {});
    assert.equal(typeof Ctor.prototype.foo, 'function');
  });

  it('should throw an error when Parent is not a function:', function() {
    (function() {
      cu.extend('foo');
    }).should.throw('expected Parent to be a function.');
  });

  it('should throw an error when Ctor is not a function:', function() {
    (function() {
      cu.extend(function Foo() {})('bar')
    }).should.throw('expected Ctor to be a function.');
  });
});
