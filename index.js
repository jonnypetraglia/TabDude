var TabDude = {
  origTitle: document.title,
  _intervalSpeed: 1000,
  _interval: null,
  _subs: null,
  _lastState: 0,
  _templ: null,
  _regex: null,
  start: function(template, subsObject, options) {
    if(options) {
      this._intervalSpeed = options.intervalSpeed || this._intervalSpeed
    }
    this._templ = template || this._templ;
    this._regex = {};
    var matcher = /{{ ?([A-Za-z0-9_][A-Za-z0-9_-]+) ?}}/gi;
    var match;
    while(match = matcher.exec(this._templ))
      this._regex[match[1]] = new RegExp("{{ ?" + match[1] + " ?}}", "gi");
    this.set(subsObject);
  },
  _substitute: function(subsIndex) {
    var multipass = Array.isArray(this._subs);
    if(!multipass && subsIndex)
      return this.origTitle;
    var result = this._templ;
    var subs = multipass ? this._subs[subsIndex] : this._subs;
    var keys = Object.keys(this._regex);
    for(var i=0; i<keys.length; i++)
      result = result.replace(this._regex[keys[i]], subs[keys[i]]);
    return result;
  },
  restart: this.start,
  update: function(subsObject) {
    console.log(subsObject)
    this._subs = subsObject || this._subs;
  },
  set: function(subsObject) {
    this.update(subsObject);
    if(!this._subs)
      document.title = this._templ;
    var _this = this;
    clearInterval(this._interval);
    this._interval = setInterval(function() {
      document.title = _this._substitute(_this._lastState);
      if(Array.isArray(_this._subs))
        _this._lastState = (_this._lastState + 1) % _this._subs.length;
      else
        _this._lastState = !_this._lastState;
    }, this._intervalSpeed);
  },
  reset: function() {
    document.title = this.origTitle;
    clearInterval(this._interval);
  }
}

//TODO: Focus/Blur

  // if subsObject is:
  //    null = static
  //    array = multi-new, no original
  //    etc = flash
  // options:
  //    interval
  //    blur/focus