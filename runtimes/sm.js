var $ = {
  global: Function('return this')(),
  createRealm(options) {
    options = options || {};
    options.globals = options.globals || {};

    var realm = newGlobal();
    realm.eval(this.source);
    realm.$.source = this.source;
    realm.$.destroy = function () {
      if (options.destroy) {
        options.destroy();
      }
    };
    for(var glob in options.globals) {
      realm.$.global[glob] = options.globals[glob];
    }

    return realm.$;
  },
  evalScript(code) {
    try {
      evaluate(code);
      return { completion: 'normal', value: undefined };
    } catch (e) {
      return { completion: 'throw', value: e };
    }
  },
  getGlobal(name) {
    return this.global[name];
  },
  setGlobal(name, value) {
    this.global[name] = value;
  },
  destroy: function() { /* noop */ },
  source: $SOURCE
};

