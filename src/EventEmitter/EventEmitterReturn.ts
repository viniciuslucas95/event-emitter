import { Event } from "./Event";

export class EventEmitterReturn<T> {
    private readonly _events: Event<() => T> = {}

    on(event: string, callback: () => T) {
        if (this._events[event]) {
            this._events[event].push(callback)
            return
        }

        this._events[event] = [callback]
    }

    trigger(event: string): T[] {
        if (this._events[event]) {
            return this._events[event].map(callback => callback())
        }

        return []
    }
}