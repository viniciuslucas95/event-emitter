import { Event } from "./Event";

export class EventEmitter {
    private readonly _events: Event<() => void> = {}

    on(event: string, callback: () => void) {
        if (this._events[event]) {
            this._events[event].push(callback)
            return
        }

        this._events[event] = [callback]
    }

    trigger(event: string) {
        if (this._events[event]) {
            this._events[event].forEach(callback => {
                callback()
            });
        }
    }
}