var TabDude = {
  origTitle: document.title,
  _intervalSpeed: 1000,
  _interval: null,
  _vars: null,
  _lastState: 0,
  _templ: null,
  _regex: null,
  start: function(template, vars, options) {
    if(options) {
      this._intervalSpeed = options.intervalSpeed || this._intervalSpeed
    }
    this._templ = template || this._templ;
    this._regex = {};
    var matcher = /{{ ?([A-Za-z0-9_][A-Za-z0-9_-]+) ?}}/gi;
    var match;
    while(match = matcher.exec(this._templ))
      this._regex[match[1]] = new RegExp("{{ ?" + match[1] + " ?}}", "gi");
    this.set(vars);
  },
  _substitute: function(subsIndex) {
    var multipass = Array.isArray(this._vars);
    if(!multipass && subsIndex)
      return this.origTitle;
    var result = this._templ;
    var subs = multipass ? this._vars[subsIndex] : this._vars;
    var keys = Object.keys(this._regex);
    for(var i=0; i<keys.length; i++)
      result = result.replace(this._regex[keys[i]], subs[keys[i]]);
    return result;
  },
  restart: this.start,
  update: function(vars) {
    console.log(vars)
    this._vars = vars || this._vars;
  },
  set: function(vars) {
    this.update(vars);
    if(!this._vars) {
      document.title = this._templ;
      return;
    }
    var _this = this;
    clearInterval(this._interval);
    this._interval = setInterval(function() {
      document.title = _this._substitute(_this._lastState);
      if(Array.isArray(_this._vars))
        _this._lastState = (_this._lastState + 1) % _this._vars.length;
      else
        _this._lastState = !_this._lastState;
    }, this._intervalSpeed);
  },
  reset: function() {
    document.title = this.origTitle;
    clearInterval(this._interval);
  }
}
