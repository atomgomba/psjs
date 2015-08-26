
/*
psJS - Pub/sub implementation with test

Author: kk- <karcsi@ekezet.com>
License: UNLICENSE
 */

(function() {
  var psJS;

  psJS = (function() {
    var listeners;

    function psJS() {}

    listeners = {};

    psJS.on = function(name, fun) {
      if (name in listeners) {
        if (!listeners[name].once) {
          listeners[name].push(fun);
        }
      } else {
        listeners[name] = [fun];
      }
      return this;
    };

    psJS.once = function(name, fun) {
      if (name in listeners) {
        return this;
      }
      listeners[name] = [fun];
      listeners[name].once = true;
      return this;
    };

    psJS.only = function(name, fun) {
      if (name in listeners && listeners[name].once) {
        return this;
      }
      listeners[name] = [fun];
      return this;
    };

    psJS.emit = function(name, data) {
      var event, fun, i, len, ref;
      if (data == null) {
        data = null;
      }
      if (!(name in listeners)) {
        return this;
      }
      event = {
        name: name,
        data: data
      };
      ref = listeners[name];
      for (i = 0, len = ref.length; i < len; i++) {
        fun = ref[i];
        fun(event);
      }
      return this;
    };

    psJS.has = function(name) {
      return name in listeners;
    };

    psJS.hasOnce = function(name) {
      return name in listeners && listeners[name].once;
    };

    psJS.remove = function(name) {
      if (name != null) {
        if (!(name in listeners)) {
          return this;
        }
        delete listeners[name];
      } else {
        listeners = {};
      }
      return this;
    };

    psJS.listeners = function(newListeners) {
      if (newListeners != null) {
        listeners = newListeners;
      }
      return listeners;
    };

    return psJS;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = psJS;
  } else {
    window.psJS = psJS;
  }

}).call(this);
