# TabDude #

TabDude is for managing the title "notifications" like flashing & counts.

## Usage ##

Basic usage is done by calling:

```TabDude.start(template, vars, options)```

TabDude has 3 different behaviors depending on the type of `vars`.

#### Static ####

TabDude will be static if `vars` is null. No fancy flashing or templating, it
just sets the title to the string you specify as `template`. (You can, however,
use this with `options.noFocus`.)

Example:
```TabDude.start("(1) Email")```
Results as:
```<title>(1) Email</title>```


#### Flash ####

If you want to "flash" between your title & another message, you can supply a 
mustache-esque template with variables to be replaced. After supplying the
template initially, you can supply different variables later using
`update(vars)`.

Example:
```TabDude.start("{{unread}} unread messages", {unread: 23})```
Results as:
```<title>23 unread messages</title>```


You can also use `{{title}}` which will automatically substitute in the current
title.

Example:
```<title>My Messages</title>```
```TabDude.start("{{unread}} - {{title}}", {unread: 23})```
Results as:
``` Alternating between:
<title>My Messages</title>
<title>23 - My Messages</title>
```


#### Animate ####

Similar to "flash" except you pass an _array_ of variable hashes. It will then
"animate" between these (and __not__ the original title).

Example:
```TabDude.start("{{dancin}}", [{dancin: "(>'-')>"}, {dancin: "<('-'<)"}, {dancin: "^(' - ')^"}, {dancin: "<('-'<)"}])```
Results as:
```Alternating between:
<title>(>'-')><title>
<title><('-'<)<title>
<title>^(' - ')^</title>
<title><('-'<)<title>
```


### After starting ###

After you've called `start` you can then alter the message with other TabDude
functions.

```TabDude.update(vars)``` will update the contents of the variables but _won't_
immediately change until the next timer interval.

```TabDude.set(vars)``` is just like `update` except it will __immediately__
take effect.

```TabDude.stop()``` will change the title back to what it was before TabDude
started. But the state is changed, including template & vars.

```TabDude.restart()``` is equivalent to calling `start` with the same
parameters you did before; it will immediately restart any timer intervals.

```TabDude.start(...)``` can be called again; any parameters that are falsy will
remain the same. For example: `TabDude.start(null, null, {timerInterval: 500})`
will only change `options.timerInterval` without effecting `template` or `vars`.


### Page focus ###

If `options.noFocus` is set to true, TabDude will only start if the
page is not focused and will automatically stop when the page becomes focused.
This is ideal for if you only want to display a notification if the user is on
a different tab.

Example:
```TabDude.start("YO! NEW MSG!", null, {noFocus: true})```
Results as:
```<title>YO! NEW MSG!</title>```
when page is not focused, reverts when page regains focus.


### Incrementing/Decrementing ###

For convenience, TabDude has `incr([amount])` and `decr([amount])` which
increments or decrements the value of the `vars.num` by the specified amount
(default is 1).

### Changing interval speed ###

If the mode is "flash" or "animate", the speed is 1000ms by default but can be
set via `options.intervalSpeed` in milliseconds.