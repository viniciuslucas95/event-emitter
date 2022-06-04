import { Event } from "./Event";

export class EventEmitterArgsReturn<T, R> {
    private readonly _events: Event<(args: T) => R> = {}

    on(event: string, callback: (args: T) => R) {
        if (this._events[event]) {
            this._events[event].push(callback)
            return
        }

        this._events[event] = [callback]
    }

    trigger(event: string, args: T): R[] {
        if (this._events[event]) {
            return this._events[event].map(callback => callback(args))
        }

        return []
    }
}