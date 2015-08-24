var ß = require("../build/psjs.js"),
    assert = require("assert");

describe("psJS", function() {
    beforeEach(function() {
        ß.remove();
    });
    it("should have `usual` event", function() {
        ß.on("usual", function() { /* some code*/ });
        assert.equal(ß.has("usual"), true);
    });
    it("should trigger two events", function() {
        var triggeredFirst = false,
            triggeredSecond = false;
        ß.on("usual", function() { triggeredFirst = true; });
        ß.on("usual", function() { triggeredSecond = true; });
        ß.trigger("usual");
        assert.equal(triggeredFirst && triggeredSecond, true);
    });
    it("should trigger only one event", function() {
        var triggeredFirst = false,
            triggeredSecond = false;
        ß.on("usual", function() { triggeredFirst = true; });
        ß.once("usual", function() { triggeredSecond = true; });
        ß.trigger("usual");
        assert.equal(triggeredFirst, false);
        assert.equal(triggeredSecond, true);
    });
    it("should only have `unlikely` event", function() {
        ß.on("usual", function() { /* some code*/ });
        ß.on("unlikely", function() { /* some code*/ });
        ß.remove("usual");
        assert.equal(ß.has("usual"), false);
        assert.equal(ß.has("unlikely"), true);
    });
    it("should not have any events", function() {
        ß.on("usual", function() { /* some code*/ });
        ß.on("unlikely", function() { /* some code*/ });
        ß.remove();
        assert.equal(ß.has("usual"), false);
        assert.equal(ß.has("unlikely"), false);
    });
    it("should pass an event object", function() {
        var passedEvent;
        ß.on("danger", function(e) { passedEvent = e });
        ß.trigger("danger", { caller: "Alice", message: "It's an emergency!" });
        assert.equal(passedEvent.name, "danger");
        assert.equal(passedEvent.data.caller, "Alice");
        assert.equal(passedEvent.data.message, "It's an emergency!");
    });
    it("should return listeners", function() {
        ß.on("usual", function() { /* some code*/ });
        var listeners = ß.listeners();
        assert.equal("usual" in listeners, true);
    });
    it("should replaces listeners", function() {
        ß.on("unusual", function() { /* some code*/ });
        var newListeners = ß.listeners({
            "usual": function() { /* some code*/ },
        });
        assert.equal("unusual" in ß.listeners(), false);
        assert.equal("usual" in ß.listeners(), true);
    });
});
