###
psJS - Pub/sub implementation with test

Author: kk- <karcsi@ekezet.com>
License: UNLICENSE
###
class psJS

    listeners = {}

    @on: (name, fun) ->
        if name of listeners
            listeners[name].push fun if not listeners[name].once
        else
            listeners[name] = [fun]
        return @

    @once: (name, fun) ->
        return @ if name of listeners
        listeners[name] = [fun]
        listeners[name].once = yes
        return @

    @only: (name, fun) ->
        return @ if name of listeners and listeners[name].once
        listeners[name] = [fun]
        return @

    @emit: (name, data=null) ->
        return @ if not (name of listeners)
        event =
            name: name
            data: data
        for fun in listeners[name]
            fun(event)
        return @

    @has: (name) ->
        name of listeners

    @hasOnce: (name) ->
        name of listeners and listeners[name].once

    @remove: (name) ->
        if name?
            return @ if not (name of listeners)
            delete listeners[name]
        else
            listeners = {}
        return @

    @listeners: (newListeners) ->
        listeners = newListeners if newListeners?
        return listeners


if module?
    module.exports = psJS
else
    window.psJS = psJS
