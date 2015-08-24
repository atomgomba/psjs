###
psJS - Pub/sub implementation with test

Author: kk- <karcsi@ekezet.com>
License: UNLICENSE
###
class psJS

    listeners = {}

    @on: (name, fun) ->
        if name of listeners
            listeners[name].push fun
        else
            listeners[name] = [fun]
        return @

    @once: (name, fun) ->
        listeners[name] = [fun]
        return @

    @trigger: (name, data=null) ->
        return @ if not (name of listeners)
        event =
            name: name
            data: data
        for fun in listeners[name]
            fun(event)
        return @

    @has: (name) ->
        name of listeners

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
