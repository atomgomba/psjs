# psJS - Pub/sub implementation with test

Minimalistic pub/sub stuff. The reason I created this bower package was to make it easier for myself to reuse this piece of code.

## API

### on(name, callback)

Subscribe a `callback` function to the event called `name`. Callback will have the event object as the first argument. The event object has two properties: `name` - name of the triggered event, `data` - optional event data passed to `emit()`. If an event with the same name has been previously added by calling `once()`, the callback will not be subscribed again.

*Returns:* `{psJS}`

### once(name, callback)

Like `on()` but adds a callback to the same event only once.

### only(name, callback)

Like `on()` but replaces any actual callback functions for the event (except for those subscribed by calling `once()`).

*Returns:* `{psJS}`

### emit(name[, data])

Emit an event called `name` with optional data passed to the callback functions.

*Returns:* `{psJS}`

### has(name)

Return `true` if the event called `name` already exists or `false` otherwise.

*Returns:* `{boolean}`

### hasOnce(name)

Return `true` if the event called `name` already exists and added using `once()` or `false` otherwise.

*Returns:* `{boolean}`

### remove([name])

Unsubscribe listeners from the event called `name`. If `name` is empty then every listener will be unsubscribed.

*Returns:* `{psJS}`

### listeners([newListeners])

Get or set the hash of listeners. In the returned object every property is a name of an event and their value is an array of the subscribed callbacks.

*Returns:* `{object}`

## Example

    var ß = psJS;  // or require("psjs"); as a node module

    // ... some code ...
    ß.on("mayhem", function(e) {
        console.log(e.name + " had the following data: " + e.data);
    });
    // ... somewhere else in the code ...
    ß.emit("mayhem", "ARGGHGHGHHHH!!!!");

    // to replace any other listeners for an event you can do:
    ß.only("mayhem", function(e) { /* ... */ })

    // to protect a listener from being overwritten, use `once()`
    ß.once("upon-a-time", function(e) { /* ... */ })
    ß.on("upon-a-time", function(e) { /* This will never happen */ })

## Test

Run the test using [mocha](https://mochajs.org):

    mocha test/test_psjs.js

## LICENCE

UNLICENSE
