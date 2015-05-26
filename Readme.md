# TabDude #

TabDude is for managing the title "notifications" like flashing & counts.

## Usage ##

There are three "modes" that TabDude can do:

#### Static ####

TabDude will be static if `vars` is null. No fancy flashing, it just sets the title
to the string you specify. (You can, however, use this with `options.focus`.)

Example:
```TabDude.start("(1) Email")```
Results as:
```<title>(1) Email</title>```


#### Flash ####

If you want to "flash" between your title & another message, you can supply a 
mustache-esque template & variables to be replaced. You can then later update
the variables just by calling `update(vars)`.

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
```TabDude.start("{{dancin}}", [{dancin: "(>'-')>"}, {dancin: "<('-'<)"}, {dancin: "^(' - ')^"}, {dancin: <('-'<)"}])```
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

```TabDude.update(vars)``` will update the vars; it won't restart the timer
though, it will just take effect the next interval.

```TabDude.set(vars)``` is just lie `update` except it will __immediately__
take effect.

```TabDude.stop()``` will change the title back to what it was before TabDude
started.

```TabDude.restart()``` is equivalent to calling `start` with the same
parameters you did before.

```TabDude.start(...)``` can be called again; any parameters that are falsy will
remain the same. For example: `TabDude.start(null, null, {timerInterval: 500})`
will only change `options.timerInterval` without effecting `template` or `vars`
or any other `options`.


### Page focus ###

TODO