# psJS - Pub/sub implementation with test

Minimalistic pub/sub stuff. The reason I created this bower package was to make it easier for myself to reuse this piece of code.

## API

### on(name, callback)

Subscribe a `callback` function to the event called `name`. Callback will have the event object as the first argument. The event object has two properties: `name` - name of the triggered event, `data` - optional event data passed to `trigger()`.

*Returns:* `{psJS}`

### once(name, callback)

Like `on()` but replaces any actual callback functions.

*Returns:* `{psJS}`

### trigger(name[, data])

Trigger the event called `name` with optional data passed to the callback functions.

*Returns:* `{psJS}`

### has(name)

Return `true` if the event called `name` already exists or `false` otherwise.

*Returns:* `{Boolean}`

### remove([name])

Unsubscribe listeners from the event called `name`. If `name` is empty then every listener will be unsubscribed.

*Returns:* `{psJS}`

### listeners([newListeners])

Get or set the hash of listeners. In the returned object every property is a name of an event and their value is an array of the subscribed callbacks.

*Returns:* `{Object}`

## Example

    var ß = psJS;  // or require("psjs"); as a node module

    // ... some code ...
    ß.on("mayhem", function(e) {
        console.log(e.name + " had the following data: " + e.data);
    });
    // ... somewhere else in the code ...
    ß.trigger("mayhem", "ARGGHGHGHHHH!!!!");

    // to replace any other listeners for an event you can do:
    ß.once("mayhem", function(e) { /* ... */ })

## Test

Run the test using [mocha](https://mochajs.org):

    mocha test/test_psjs.js

## LICENCE

UNLICENSE
