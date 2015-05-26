var TabDude = {
  originalTitle: document.title,
  start: function(template, vars, options) {
    this._opts = options || this._opts;
    this._templ = template || this._templ;
    this._regex = {title: new RegExp("{{ *title *}}", "gi")};
    var matcher = /{{ *([A-Za-z0-9_][A-Za-z0-9_-]+) *}}/gi;
    var match;
    while(match = matcher.exec(this._templ))
        this._regex[match[1]] = new RegExp("{{ *" + match[1] + " *}}", "gi");
    this.set(vars);
  },
  restart: function() { this.start() },
  update: function(vars) {
    this._vars = vars || this._vars;
  },
  set: function(vars) {
    this.update(vars);
    if(this._opts.noFocus && this._pageFocused)
      return;
    if(!this._vars)
      document.title = this._templ;
    else {
      var _this = this;
      clearInterval(this._interval);
      this._interval = setInterval(this._intervalFunc, this._opts.intervalSpeed || 1000);
    }
  },
  stop: function() {
    document.title = this.originalTitle;
    clearInterval(this._interval);
  },
  incr: function(amnt) {
    this._vars.val = this._vars.val+(amnt||1);
  },
  decr: function(amnt) {
    this.incr(-1 * (amnt||1));
  },
  _substitute: function(varsIndex) {
    var multipass = Array.isArray(this._vars);
    if(!multipass && varsIndex)
      return this.originalTitle;
    var vars = multipass ? this._vars[varsIndex] : this._vars;
    var result = this._templ.replace(this._regex.title, vars.title || this.originalTitle);
    var keys = Object.keys(this._regex);
    for(var i=0; i<keys.length; i++)
      result = result.replace(this._regex[keys[i]], vars[keys[i]] != null ? vars[keys[i]].toString() : '');
    return result;
  },
  _focus: function() {
    var _this = TabDude;
    _this._pageFocused = true;
    if(_this._opts.noFocus)
      _this.stop();
    _this._originalOnFocus && _this._originalOnFocus();
  },
  _blur: function() {
    var _this = TabDude;
    _this._pageFocused = false;
    _this._originalOnBlur && _this._originalOnBlur();
  },
  _intervalFunc: function() {
    var _this = TabDude;
    document.title = _this._substitute(_this._lastState);
    if(Array.isArray(_this._vars))
      _this._lastState = (_this._lastState + 1) % _this._vars.length;
    else
      _this._lastState = !_this._lastState;
  },
  _opts: {},
  _interval: null,
  _vars: null,
  _lastState: 0,
  _templ: null,
  _regex: null,
  _originalOnFocus: null,
  _originalOnBlur: null,
  _pageFocused: null
}

TabDude._originalOnFocus = window.onfocus;
TabDude._originalOnBlur = window.onblur;
window.onfocus = TabDude._focus;
window.onblur = TabDude._blur;