import { Event } from "./Event";

export class EventEmitterArgs<T> {
    private readonly _events: Event<(args: T) => void> = {}

    on(event: string, callback: (args: T) => void) {
        if (this._events[event]) {
            this._events[event].push(callback)
            return
        }

        this._events[event] = [callback]
    }

    trigger(event: string, args: T) {
        if (this._events[event]) {
            this._events[event].map(callback => callback(args))
        }
    }
}