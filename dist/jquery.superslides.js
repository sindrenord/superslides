// Generated by CoffeeScript 1.3.3

/*
  Superslides 0.5-wip
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
*/


(function() {
  var Superslides, name;

  Superslides = function(el, options) {
    var $container, init, next, parse, positions, prev, update,
      _this = this;
    if (options == null) {
      options = {};
    }
    this.options = $.extend({
      delay: 5000,
      play: false,
      slide_speed: 'normal',
      slide_easing: 'linear',
      nav_class: 'slides-navigation',
      container_class: 'slides-container',
      pagination: false,
      hashchange: false,
      scrollable: true
    }, options);
    init = false;
    $container = $("." + this.options.container_class);
    next = function() {
      var index;
      index = _this.current + 1;
      if (index === _this.size()) {
        index = 0;
      }
      return index;
    };
    prev = function() {
      var index;
      index = _this.current - 1;
      if (index === -1) {
        index = _this.size() - 1;
      }
      return index;
    };
    parse = function(direction) {
      switch (true) {
        case /next/.test(direction):
          return next();
        case /prev/.test(direction):
          return prev();
        case /\d/.test(direction):
          return direction;
        default:
          return 0;
      }
    };
    update = function() {
      positions();
      return $container.trigger('slides.changed');
    };
    positions = function() {
      _this.current || (_this.current = 0);
      _this.next = next();
      _this.prev = prev();
      return false;
    };
    this.destroy = function() {
      return $(el).removeData();
    };
    this.size = function() {
      return $container.children().length;
    };
    this.stop = function() {
      clearInterval(_this.play_id);
      return delete _this.play_id;
    };
    this.start = function() {
      _this.animate('next');
      if (options.play) {
        if (_this.play_id) {
          _this.stop();
        }
        _this.play_id = setInterval(function() {
          return false;
        }, options.delay);
      }
      return $(el).trigger('slides.started');
    };
    this.animate = function(direction) {
      parse(direction);
      $container.find('.current').removeClass('current');
      return $container.children().eq(_this.next).addClass('current');
    };
    positions();
    $(el).on('DOMSubtreeModified', function(e) {
      return update();
    });
    if (!init) {
      init = false;
      $container.trigger('slides.init');
      this.start();
    }
    return this;
  };

  name = 'superslides';

  $.fn[name] = function(option, args) {
    var $this, data, method;
    if (typeof option === "string") {
      $this = $(this);
      data = $this.data(name);
      method = data[option];
      if (typeof method === 'function') {
        method = method.call($this, args);
      }
      return method;
    }
    return this.each(function() {
      var options;
      $this = $(this);
      data = $this.data(name);
      options = typeof option === 'object' && option;
      if (!data) {
        return $this.data(name, (data = new Superslides(this, options)));
      }
    });
  };

}).call(this);
