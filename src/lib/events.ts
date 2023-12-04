import { EventEmitter } from "events";

export const bus = new EventEmitter();

window.onmessage = (event) => {
  if (Array.isArray(event.data)) {
    const name = event.data.shift();
    bus.emit(name, ...event.data);
  }
};
